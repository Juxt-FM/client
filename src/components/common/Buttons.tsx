/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ButtonHTMLAttributes, DetailedHTMLProps, Fragment } from "react";

import { ClipLoader } from "react-spinners";
import { useTheme } from "../../context";

import styles from "../../styles/modules/buttons.module.scss";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  loading?: boolean;
  loadingLabel?: string;
  size?: "lg" | "sm";
  color?: "primary" | "accent" | "black" | "secondary" | "white";
}

export const Button = ({ color = "primary", ...props }: IButton) => {
  const className = styles[`${color}Btn${props.size === "sm" ? "Sm" : ""}`];
  return (
    <button className={className} {...props}>
      {props.loading ? (
        <Fragment>
          {props.loadingLabel} <ClipLoader color="white" size={14} />
        </Fragment>
      ) : (
        props.label
      )}
    </button>
  );
};

export const ButtonOutline = ({ color = "primary", ...props }: IButton) => {
  const { colors } = useTheme();
  const className =
    styles[`${color}BtnOutline${props.size === "sm" ? "Sm" : ""}`];
  return (
    <button className={className} {...props}>
      {props.loading ? (
        <Fragment>
          {props.loadingLabel} <ClipLoader color={colors[color]} size={14} />
        </Fragment>
      ) : (
        props.label
      )}
    </button>
  );
};

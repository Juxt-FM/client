/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Fragment,
  MouseEvent,
} from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../styles/modules/buttons.module.scss";

type Color =
  | "primary"
  | "accent"
  | "orange"
  | "blue"
  | "lightBlue"
  | "darkBlue"
  | "yellow"
  | "red"
  | "green"
  | "darkGreen"
  | "lightGreen"
  | "purple"
  | "lightPurple"
  | "black"
  | "secondary"
  | "white";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  icon?: IconProp;
  loading?: boolean;
  loadingLabel?: string;
  size?: "lg" | "sm";
  color?: Color;
}

export const Button = ({ color = "primary", ...props }: IButton) => {
  const className = styles[`${color}Btn${props.size === "sm" ? "Sm" : ""}`];
  return (
    <button className={className} {...props}>
      {props.loading ? (
        props.loadingLabel
      ) : (
        <Fragment>
          {props.label}
          {props.icon && (
            <FontAwesomeIcon icon={props.icon} className={styles.icon} />
          )}
        </Fragment>
      )}
    </button>
  );
};

export const ButtonOutline = ({ color = "primary", ...props }: IButton) => {
  const className =
    styles[`${color}BtnOutline${props.size === "sm" ? "Sm" : ""}`];
  return (
    <button className={className} {...props}>
      {props.loading ? props.loadingLabel : props.label}
      {props.icon && (
        <FontAwesomeIcon icon={props.icon} className={styles.icon} />
      )}
    </button>
  );
};

interface IIconAction {
  icon: IconProp;
  color?: Color;
  onClick: (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => void;
}

export const IconAction = ({
  color = "primary",
  icon,
  onClick,
}: IIconAction) => {
  return (
    <a className={styles[`${color}IconAction`]} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    </a>
  );
};

export const IconButton = ({
  color = "primary",
  icon,
  onClick,
}: IIconAction) => (
  <a className={styles[`${color}IconBtn`]} onClick={onClick}>
    <FontAwesomeIcon icon={icon} className={styles.icon} />
  </a>
);

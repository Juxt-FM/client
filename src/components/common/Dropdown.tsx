/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { ReactChild, ReactChildren, useRef, useState } from "react";
import { useClickAwayAction } from "../../lib/ui";

import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../styles/common/dropdown.module.scss";

interface IDropdownOption {
  label: string;
  icon?: IconProp;
  path?: string;
  danger?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const DropdownOption = (props: IDropdownOption) => {
  const renderContent = () => {
    const icon = props.icon && (
      <FontAwesomeIcon icon={props.icon} className={styles.icon} />
    );

    const classes = [styles.option, props.danger ? styles.danger : ""].join(
      " "
    );

    if (props.path) {
      return (
        <Link href={props.path}>
          <a className={classes}>
            {icon}
            {props.label}
          </a>
        </Link>
      );
    } else
      return (
        <a className={classes} onClick={props.onClick}>
          {icon}
          {props.label}
        </a>
      );
  };

  return <li>{renderContent()}</li>;
};

interface IDropdownList {
  options: IDropdownOption[];
}

export const DropdownList = ({ options }: IDropdownList) => (
  <ul className={styles.dropdownList}>
    {options.map((opt) => (
      <DropdownOption {...opt} key={opt.label} />
    ))}
  </ul>
);

interface DropdownProps {
  renderAnchor: (openDropdown: () => void, isOpen: boolean) => JSX.Element;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  x?: "right" | "left";
  y?: "top" | "bottom";
  disabled?: boolean;
}

const Dropdown = ({
  x = "right",
  y = "bottom",
  disabled = false,
  renderAnchor,
  children,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAwayAction(ref, { isActive: open, action: () => setOpen(false) });

  const onOpen = () => {
    if (!disabled) setOpen(true);
  };

  return (
    <div className={styles.root}>
      {renderAnchor(onOpen, open)}
      {open && (
        <div
          ref={ref}
          className={[styles.content, styles[x], styles[y]].join(" ")}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

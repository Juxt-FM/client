/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { useEffect, useRef, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../styles/common/dropdown.module.scss";
import Link from "next/link";

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

interface IListOption {
  label: string;
  icon?: IconProp;
  danger?: boolean;
  onClick?: (e: any) => void;
}

interface IDropdownList {
  options: IListOption[];
}

export const DropdownList = ({ options }: IDropdownList) => (
  <ul className={styles.dropdownList}>
    {options.map((opt) => (
      <DropdownOption {...opt} key={opt.label} />
    ))}
  </ul>
);

interface DropdownProps {
  anchor: (openDropdown: () => void, isOpen: boolean) => JSX.Element;
  content: () => JSX.Element;
  x?: "right" | "left";
  y?: "top" | "bottom";
  disabled?: boolean;
}

const Dropdown = ({
  x = "right",
  y = "bottom",
  disabled = false,
  anchor,
  content,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const onClickAway = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  };

  const onHover = (e: PointerEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      return;
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("click", onClickAway);
      window.addEventListener("mouseover", onHover);
    }

    return () => {
      window.removeEventListener("click", onClickAway);
      window.removeEventListener("mouseover", onHover);
    };
  }, [open]);

  const onOpen = () => {
    if (!disabled) setOpen(true);
  };

  return (
    <div className={styles.root}>
      {anchor(onOpen, open)}
      {open && (
        <div
          ref={ref}
          className={[styles.content, styles[x], styles[y]].join(" ")}
        >
          {content()}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

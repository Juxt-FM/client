/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { ReactChild, useEffect, useRef, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../styles/modules/dropdown.module.scss";

interface ILink {
  label: string;
  icon: IconProp;
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const Link = ({ label, icon, onClick }: ILink) => (
  <li>
    <a className={styles.dropdownOption} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {label}
    </a>
  </li>
);

interface IListOption {
  label: string;
  icon?: IconProp;
  danger?: boolean;
  action: (e: any) => void;
}

interface IDropdownList {
  options: IListOption[];
}

export const DropdownList = ({ options }: IDropdownList) => (
  <ul className={styles.dropdownList}>
    {options.map((opt) => (
      <li
        className={[styles.option, opt.danger ? styles.danger : ""].join(" ")}
        onClick={opt.action}
        key={opt.label}
      >
        {opt.icon && (
          <FontAwesomeIcon icon={opt.icon} className={styles.icon} />
        )}
        {opt.label}
      </li>
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

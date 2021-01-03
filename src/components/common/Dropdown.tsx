/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { ReactChild, useEffect, useRef } from "react";

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
  isOpen: boolean;
  onClose: () => void;
  children: ReactChild;
}

const Dropdown = ({ children, isOpen, onClose }: DropdownProps) => {
  const ref = useRef(null);

  const onClickAway = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) onClose();
  };

  useEffect(() => {
    if (isOpen) window.addEventListener("click", onClickAway);

    return () => {
      window.removeEventListener("click", onClickAway);
    };
  }, [isOpen]);

  if (isOpen)
    return (
      <div ref={ref} className={styles.root}>
        {children}
      </div>
    );
  return null;
};

export default Dropdown;

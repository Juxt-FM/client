/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, {
  Fragment,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import { useClickAwayAction } from "../../lib/context";

import styles from "../../styles/common/modal.module.scss";

interface ModalProps {
  children: ReactChild;
  disabled?: boolean;
  renderAnchor: (openDropdown: () => void, isOpen: boolean) => JSX.Element;
}

const Modal = ({ children, disabled, renderAnchor }: ModalProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAwayAction(ref, { isActive: open, action: () => setOpen(false) });

  useEffect(() => {
    const elem = document.getElementById("__next");

    if (open) disableBodyScroll(elem);
    else enableBodyScroll(elem);

    return () => {
      enableBodyScroll(elem);
    };
  }, [open]);

  const onOpen = () => {
    if (!disabled) setOpen(true);
  };

  const renderContent = () => {
    if (open)
      return (
        <div className={styles.root}>
          <div ref={ref} className={styles.content}>
            {children}
          </div>
        </div>
      );
  };

  return (
    <Fragment>
      {renderAnchor(onOpen, open)}
      {renderContent()}
    </Fragment>
  );
};

export default Modal;

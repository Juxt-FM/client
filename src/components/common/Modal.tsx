/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { ReactChild, useEffect, useRef } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import styles from "../../styles/modules/modal.module.scss";
import { useRouter } from "next/router";

interface ModalProps {
  isOpen: boolean;
  children: ReactChild;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const ref = useRef(null);

  const onClickAway = (e: MouseEvent) => {
    if (!ref.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const elem = document.getElementById("__next");

    if (isOpen) {
      window.addEventListener("click", onClickAway);
      disableBodyScroll(elem);
    } else {
      enableBodyScroll(elem);
    }

    return () => {
      window.removeEventListener("click", onClickAway);
      clearAllBodyScrollLocks();
    };
  }, [isOpen]);

  if (isOpen)
    return (
      <div className={styles.modal}>
        <div ref={ref} className={styles.modalContent}>
          {children}
        </div>
      </div>
    );

  return null;
};

export default Modal;

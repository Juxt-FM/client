/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import styles from "../../styles/common/inputs.module.scss";

interface IFormInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  inputSize?: "lg" | "sm";
  label: string;
  error?: string | undefined;
}

export const FormInput = ({
  name,
  label,
  error,
  inputSize = "lg",
  ...props
}: IFormInput) => {
  const inputClass = inputSize === "sm" ? styles.inputSm : styles.input;
  const errorClass = error ? styles.error : "";

  const classes = [inputClass, errorClass].join(" ");

  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={inputClass}>
        {label}
      </label>
      <input
        name={name}
        className={classes}
        placeholder={props.placeholder || label}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

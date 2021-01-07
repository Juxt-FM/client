/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

import styles from "../../styles/common/images.module.scss";

interface IImage
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  size?: "lg" | "sm" | "md" | "xl";
  showLoader?: boolean;
}

export const Thumbnail = ({ src, size = "md", showLoader }: IImage) => {
  const classes = [styles.thumbnail, styles[size]];

  if (showLoader)
    return <div className={[...classes, styles.loading].join(" ")} />;

  return <img className={classes.join(" ")} src={src} />;
};

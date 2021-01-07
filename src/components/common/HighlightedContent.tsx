/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ReactChild, ReactChildren } from "react";

import styles from "../../styles/common/highlighted-content.module.scss";

interface ISection {
  title: string;
  children: JSX.Element;
}

export const HighlightedSection = ({ title, children }: ISection) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
};

interface IHighlightedContent {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

const HighlightedContent = (props: IHighlightedContent) => (
  <div className={styles.root}>{props.children}</div>
);

export default HighlightedContent;

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ReactChild, ReactChildren } from "react";
import styles from "../../styles/common/containers.module.scss";

interface IContainer {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

export const Section = (props: IContainer) => (
  <section className={styles.section}>{props.children}</section>
);

export const Row = (props: IContainer) => (
  <div className={styles.row}>{props.children}</div>
);

export const Column = (props: IContainer) => (
  <div className={styles.column}>{props.children}</div>
);

export const List = (props: IContainer) => (
  <ul className={styles.list}>{props.children}</ul>
);

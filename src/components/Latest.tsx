/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import styles from "../styles/modules/latest.module.scss";
import { LoadingListItem } from "./PostListItem";

interface ISection {
  title: string;
  children: React.ReactChild;
}

const Section = (props: ISection) => (
  <section className={styles.section}>
    <div className={styles.header}>
      <h3>{props.title}</h3>
    </div>
    {props.children}
  </section>
);

const Blog = () => {
  return (
    <Section title="Following">
      <div className={styles.blogHighlights}>
        <ul className={styles.horizontal}>
          <LoadingListItem />
        </ul>
        <div className={styles.divider}></div>
        <ul className={styles.vertical}></ul>
      </div>
    </Section>
  );
};

export default function MainContent() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <Blog />
      </div>
    </div>
  );
}

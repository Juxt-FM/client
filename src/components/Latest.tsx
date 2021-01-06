/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { AltListItem, ListItem, LoadingAltListItem } from "./PostListItem";

import { getMockPost } from "../__mocks__/mockData";
import styles from "../styles/modules/latest.module.scss";

interface ISection {
  title: string;
  children: React.ReactChild;
}

const Section = (props: ISection) => (
  <section className={styles.section}>
    <div className={styles.header}>
      <h1>{props.title}</h1>
    </div>
    {props.children}
  </section>
);

const Posts = () => {
  return (
    <Section title="Recent Posts">
      <div className={styles.blogHighlights}>
        <ul className={styles.vertical}>
          <ListItem post={getMockPost()} />
          <ListItem post={getMockPost()} />
          <ListItem post={getMockPost()} />
        </ul>
        <div className={styles.divider}></div>
        <div className={styles.grid}>
          <div className={styles.row}>
            <div className={styles.column}>
              <AltListItem post={getMockPost()} />
              <AltListItem post={getMockPost()} />
              <AltListItem post={getMockPost()} />
            </div>
            <div className={styles.column}>
              <AltListItem post={getMockPost()} />
              <AltListItem post={getMockPost()} />
              <AltListItem post={getMockPost()} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default function MainContent() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <Posts />
      </div>
    </div>
  );
}

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { AltListItem, ListItem } from "./PostListItem";

import { getMockPost } from "../__mocks__/mockData";
import styles from "../styles/modules/latest.module.scss";

interface ISection {
  children: React.ReactChild;
}

const Section = (props: ISection) => (
  <section className={styles.section}>{props.children}</section>
);

const Posts = () => {
  return (
    <Section>
      <div className={styles.blogHighlights}>
        <ul className={styles.vertical}>
          <ListItem post={getMockPost()} image="right" />
          <ListItem post={getMockPost()} image="right" />
          <ListItem post={getMockPost()} image="right" />
        </ul>
        <div className={styles.divider}></div>
        <div className={styles.grid}>
          <div className={styles.row}>
            <div className={styles.column}>
              <AltListItem post={getMockPost()} />
              <AltListItem post={getMockPost()} />
            </div>
            <div className={styles.column}>
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

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

const SuggestedPosts = () => (
  <div className={styles.topContent}>
    <div className={styles.topHit}>
      <ListItem post={getMockPost()} image="top" size="lg" />
    </div>
    <div className={styles.list}>
      <ListItem post={getMockPost()} size="sm" image="right" />
      <ListItem post={getMockPost()} size="sm" image="right" />
      <ListItem post={getMockPost()} size="sm" image="right" />
    </div>
  </div>
);

const TrendingPosts = () => (
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
);

const FollowingPosts = () => (
  <ul className={styles.list}>
    <ListItem post={getMockPost()} image="right" />
    <ListItem post={getMockPost()} image="right" />
    <ListItem post={getMockPost()} image="right" />
  </ul>
);

const BlogPosts = () => {
  return (
    <Section>
      <div className={styles.blogHighlights}>
        <SuggestedPosts />
        <TrendingPosts />
        <FollowingPosts />
        <div className={styles.divider}></div>
      </div>
    </Section>
  );
};

const Ideas = () => {
  return <ul className={styles.list}></ul>;
};

export default function MainContent() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <BlogPosts />
        <Ideas />
      </div>
    </div>
  );
}

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import _ from "lodash";

import { useAuthStatus } from "../../lib/context";

import { AltListItem, ListItem } from "../posts/PostListItem";
import { Column, List, Row, Section } from "../common/Containers";
import Idea from "../ideas/IdeaListItem";

import { getMockIdea, getMockPost } from "../../__mocks__/mockData";

import styles from "../../styles/pages/home.module.scss";

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
  <Section>
    <Row>
      <Column>
        <AltListItem post={getMockPost()} />
        <AltListItem post={getMockPost()} />
      </Column>
      <Column>
        <AltListItem post={getMockPost()} />
        <AltListItem post={getMockPost()} />
      </Column>
    </Row>
  </Section>
);

const FollowingPosts = () => (
  <Section>
    <h4>Based on who you follow</h4>
    <List>
      <ListItem post={getMockPost()} image="left" />
      <ListItem post={getMockPost()} image="left" />
      <ListItem post={getMockPost()} image="left" />
    </List>
  </Section>
);

export const BlogPosts = () => {
  return (
    <div className={styles.blogHighlights}>
      <SuggestedPosts />
      <TrendingPosts />
      <FollowingPosts />
      <div className={styles.divider}></div>
    </div>
  );
};

export const Ideas = () => {
  return (
    <List>
      {_.range(10).map((i, index) => (
        <Idea idea={getMockIdea()} key={String(index)} />
      ))}
    </List>
  );
};

export const Trending = () => {
  const loggedIn = useAuthStatus();

  return <div className={styles.empty}></div>;
};

export const Suggested = () => {
  return <div className={styles.empty}></div>;
};

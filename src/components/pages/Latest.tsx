/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment } from "react";
import _ from "lodash";

import { useAuthStatus } from "../../lib/auth";

import { AltListItem, ListItem } from "../posts/PostListItem";
import { Column, List, Row, Section } from "../common/Containers";
import Idea from "../ideas/IdeaListItem";
import NewIdea from "../ideas/NewIdea";

import { getMockIdea, getMockPost } from "../../__mocks__/mockData";

import styles from "../../styles/pages/latest.module.scss";

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
    <h4>Based on people you follow</h4>
    <List>
      <ListItem post={getMockPost()} image="right" />
      <ListItem post={getMockPost()} image="right" />
      <ListItem post={getMockPost()} image="right" />
    </List>
  </Section>
);

export const BlogPosts = () => {
  return (
    <Fragment>
      <SuggestedPosts />
      <TrendingPosts />
      <FollowingPosts />
    </Fragment>
  );
};

export const Ideas = () => {
  return (
    <Fragment>
      <Section>
        <NewIdea />
      </Section>
      <List>
        {_.range(10).map((i, index) => (
          <Idea idea={getMockIdea()} key={String(index)} />
        ))}
      </List>
    </Fragment>
  );
};

export const Trending = () => {
  const loggedIn = useAuthStatus();

  return <div className={styles.empty}></div>;
};

export const Suggested = () => {
  return <div className={styles.empty}></div>;
};

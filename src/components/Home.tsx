/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ApolloError } from "@apollo/client";
import _ from "lodash";

import { BlogPost, QUERY_FILTER_POSTS } from "../graphql";

import {
  AltListItem,
  ListItem,
  LoadingAltListItem,
  LoadingListItem,
} from "./BlogPosts";
import { SampleList } from "./SampleList";
import Menu from "./Menu";

import styles from "../styles/modules/home.module.scss";

const Trending = () => {
  const renderPost = (post: BlogPost) => <ListItem post={post} key={post.id} />;
  const renderAltPost = (post: BlogPost) => (
    <AltListItem post={post} key={post.id} />
  );

  const onData = ({
    filterBlogPosts,
  }: {
    filterBlogPosts: BlogPost[];
  }): React.ReactNode => {
    return (
      <div className={styles.trendingContent}>
        <div className={styles.row}>
          <div className={styles.column}>{filterBlogPosts.map(renderPost)}</div>
          <div className={styles.column}>
            {filterBlogPosts.map((item, index) =>
              renderPost(filterBlogPosts[index === 1 ? 0 : 1])
            )}
          </div>
        </div>
        <div className={styles.runnerUps}>
          <h2>More</h2>
          {filterBlogPosts.map(renderAltPost)}
        </div>
      </div>
    );
  };

  const onLoading = (): React.ReactNode | null => {
    return (
      <div className={styles.row}>
        <div className={styles.column}>
          {_.range(3).map((index) => (
            <LoadingListItem key={String(index)} />
          ))}
        </div>
        <div className={styles.column}>
          {_.range(3).map((index) => (
            <LoadingListItem key={String(index)} />
          ))}
        </div>
      </div>
    );
  };

  const onError = (error: ApolloError): React.ReactNode | null => {
    return null;
  };

  return (
    <SampleList
      title="Trending"
      summary="The latest analysis on top stocks and cryptocurrencies."
      query={QUERY_FILTER_POSTS}
      content={{ onLoading, onData: onLoading, onError }}
    />
  );
};

const Latest = () => {
  const renderPost = (post: BlogPost) => (
    <AltListItem post={post} key={post.id} />
  );

  const onData = ({ filterBlogPosts }: any): React.ReactNode => {
    return (
      <div>
        {filterBlogPosts.map((item: any, index: number) =>
          renderPost(filterBlogPosts[index === 1 ? 0 : 1])
        )}
      </div>
    );
  };

  const onLoading = (): React.ReactNode | null => {
    return (
      <div>
        <LoadingAltListItem />
      </div>
    );
  };

  const onError = (error: ApolloError): React.ReactNode | null => {
    return null;
  };

  return (
    <SampleList
      title="Latest"
      summary="Some of the latest posts we think you'll like."
      query={QUERY_FILTER_POSTS}
      content={{ onLoading, onData: onLoading, onError }}
    />
  );
};

export default function Activity() {
  return (
    <div>
      <section className="section">
        <div className={styles.analysis}>
          <div className={styles.content}>
            <Latest />
          </div>
          <Menu />
        </div>
      </section>
      <section className={[styles.trending, "section"].join(" ")}>
        <Trending />
      </section>
    </div>
  );
}

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import _ from "lodash";

import { BlogPost } from "../lib/graphql";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "../styles/modules/post-list.module.scss";

interface IListItem {
  post: BlogPost | undefined;
  loading?: boolean;
}

interface IPostLink {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export const BlogPostLink = ({ id, children, disabled }: IPostLink) =>
  disabled ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Link href={`/blog/posts/${id}`}>{children}</Link>
  );

export const LoadingListItem = () => (
  <SkeletonTheme color="#f2f2f2" highlightColor="#e2e2e2">
    {_.range(5).map((index) => (
      <ListItem post={undefined} loading key={String(index)} />
    ))}
  </SkeletonTheme>
);

export const ListItem = ({ post, loading }: IListItem) => {
  const classes = [styles.listItem, loading ? styles.loading : ""];
  return (
    <BlogPostLink id={post ? post.id : ""} disabled={loading}>
      <a className={classes.join(" ")}>
        {loading ? (
          <Skeleton className={styles.image} />
        ) : (
          <img
            className={styles.image}
            src={post.imageURL}
            alt="blog post image"
          />
        )}

        <div className={styles.content}>
          <h2>{loading ? <Skeleton width={100} /> : post.title}</h2>
          {loading ? (
            <Fragment>
              <Skeleton width="100%" className={styles.summary} />
              <Skeleton width="75%" className={styles.summary} />
              <Skeleton width="65%" className={styles.summary} />
            </Fragment>
          ) : (
            <p className={styles.summary}>{post.subtitle}</p>
          )}
        </div>
      </a>
    </BlogPostLink>
  );
};

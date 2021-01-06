/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import _ from "lodash";

import { BlogPost } from "../lib/graphql";

import Skeleton from "react-loading-skeleton";

import styles from "../styles/modules/post-list.module.scss";
import SkeletonWrapper from "./SkeletonWrapper";

interface IListItem {
  post: BlogPost | undefined;
  loading?: boolean;
}

interface IPostLink {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export const BlogPostLink = ({ id, children, disabled = true }: IPostLink) =>
  disabled ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Link href={`/blog/posts/${id}`}>{children}</Link>
  );

export const LoadingListItem = ({ count = 5 }) => (
  <SkeletonWrapper>
    <Fragment>
      {_.range(count).map((index) => (
        <ListItem post={undefined} loading key={String(index)} />
      ))}
    </Fragment>
  </SkeletonWrapper>
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
          <h3>{loading ? <Skeleton width="30%" /> : post.title}</h3>
          {loading ? (
            <Fragment>
              <Skeleton width="100%" className={styles.summary} />
              <Skeleton width="75%" className={styles.summary} />
            </Fragment>
          ) : (
            <p className={styles.summary}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              ducimus repudiandae mollitia optio consequatur iusto. Deleniti
              quaerat omnis voluptates. Eos laboriosam ipsam, asperiores
              officiis distinctio porro optio aliquam corporis eligendi.
            </p>
          )}
        </div>
      </a>
    </BlogPostLink>
  );
};

export const LoadingAltListItem = ({ count = 5 }) => (
  <Fragment>
    {_.range(count).map((index) => (
      <SkeletonWrapper key={String(index)}>
        <AltListItem post={undefined} loading />
      </SkeletonWrapper>
    ))}
  </Fragment>
);

export const AltListItem = (props: IListItem) => {
  if (props.loading) {
    const height = Math.floor((Math.random() + 1) * 100);
    return <Skeleton height={height} className={styles.altListItem} />;
  }
  return <img src={props.post.imageURL} className={styles.altListItem} />;
};

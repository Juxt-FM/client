/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ReactNode } from "react";
import Link from "next/link";
import { BlogPost } from "../lib/apollo";
import _ from "lodash";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "../styles/modules/post.module.scss";

export const BlogPostLink = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => <Link href={`/blog/posts/${id}`}>{children}</Link>;

export const LoadingListItem = ({ dark = false }: { dark?: boolean }) => {
  return (
    <div
      className={[styles.listItem, styles.loading].join(" ")}
      style={{
        height: 250,
        backgroundColor: dark ? "#111111" : "#e2e2e2",
      }}
    />
  );
};

export const ListItem = ({ post }: { post: BlogPost }) => (
  <BlogPostLink id={post.id}>
    <img
      className={styles.listItem}
      src={post.imageURL}
      alt="blog post image"
    />
  </BlogPostLink>
);

export const LoadingAltListItem = () => (
  <SkeletonTheme color="#f2f2f2" highlightColor="#e2e2e2">
    {_.range(5).map((index) => (
      <div
        className={[styles.altListItem, styles.loading].join(" ")}
        key={String(index)}
      >
        <div className={styles.image} />
        <div className={styles.altContent}>
          <h2>
            <Skeleton width={300} />
          </h2>
          <p>
            <Skeleton count={3} />
          </p>
        </div>
      </div>
    ))}
  </SkeletonTheme>
);

interface IAltListItem {
  post: BlogPost;
  dark?: boolean;
}

export const AltListItem = ({ post, dark }: IAltListItem) => (
  <BlogPostLink id={post.id}>
    <a className={[styles.altListItem, dark ? styles.dark : ""].join(" ")}>
      <img className={styles.image} src={post.imageURL} alt="blog post image" />
      <div className={styles.altContent}>
        <h2 className={dark ? styles.dark : ""}>{post.title}</h2>
        <p className={dark ? styles.dark : ""}>
          Et illo sequi labore a ullam inventore laudantium ipsum esse
          accusantium optio repudiandae, nihil eos quas unde repellat nesciunt
          minima voluptate at?
        </p>
      </div>
    </a>
  </BlogPostLink>
);

export const DetailItem = ({ post }: { post: BlogPost }) => (
  <div className={styles.detailRoot}>
    <div className={styles.header}>
      <img src={post.imageURL} alt="blog post image" />
      <div className={styles.info}>
        <h1>{post.title}</h1>
        <p>{post.subtitle}</p>
      </div>
    </div>
  </div>
);

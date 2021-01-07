/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";

import { BlogPost, UserProfile } from "../lib/graphql";

import Skeleton from "react-loading-skeleton";
import { getMockUser } from "../__mocks__/mockData";

import styles from "../styles/modules/post-list.module.scss";
import SkeletonWrapper from "./SkeletonWrapper";

type Size = "sm" | "md" | "lg";

interface IPostLink {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export const BlogPostLink = ({ id, children, disabled = false }: IPostLink) =>
  disabled ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Link href={`/posts/${id}`}>{children}</Link>
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

const PostDate = ({ timestamp }: { timestamp: string }) => (
  <p className={styles.timestamp}>
    {moment(parseInt(timestamp, 10) * 1000).fromNow()}
  </p>
);

interface IPostImage {
  imageURL: string;
  size?: Size;
  loading?: boolean;
}

export const PostImage = ({
  imageURL,
  size = "md",
  loading = false,
}: IPostImage) => (
  <a className={styles.imageRoot}>
    {loading ? (
      <Skeleton className={[styles.image, styles[size]].join(" ")} />
    ) : (
      <img
        className={[styles.image, styles[size]].join(" ")}
        src={imageURL}
        alt="blog post image"
      />
    )}
  </a>
);

export const PostAuthor = (props: { profile?: UserProfile }) => {
  const profile = getMockUser().profile;

  return (
    <a className={styles.author}>
      <img
        className={styles.authorImg}
        src={profile.imageURL}
        alt="author profile image"
      />
      <p className={styles.name}>{profile.name}</p>
    </a>
  );
};

interface ISummary {
  summary: string;
  size: Size;
}

export const Summary = ({ summary, size = "md" }: ISummary) => (
  <p className={[styles.summary, styles[size]].join(" ")}>{summary}</p>
);

interface IListItem {
  post: BlogPost | undefined;
  image: "top" | "right" | "left" | undefined;
  loading?: boolean;
  size?: Size;
}

export const ListItem = ({
  post,
  image,
  size = "md",
  loading = false,
}: IListItem) => {
  const classes = [
    styles.listItem,
    styles[size],
    loading ? styles.loading : "",
  ];

  return (
    <div className={classes.join(" ")}>
      {image === "left" && <PostImage size={size} imageURL={post.imageURL} />}
      <div className={[styles.content, image ? styles[image] : ""].join(" ")}>
        <BlogPostLink id={post ? post.id : ""} disabled={loading}>
          <div>
            <PostAuthor />
            <a>
              <p className={styles.title}>
                {loading ? <Skeleton width="30%" /> : post.title}
              </p>
              <Summary size={size} summary={post.subtitle} />
            </a>
            <PostDate timestamp={post.createdAt} />
          </div>
        </BlogPostLink>
      </div>
      <div className={[styles.divider, styles[size]].join(" ")}></div>
      {image === "right" && (
        <BlogPostLink id={post ? post.id : ""} disabled={loading}>
          <PostImage size={size} imageURL={post.imageURL} loading={loading} />
        </BlogPostLink>
      )}
    </div>
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

export const AltListItem = ({ post, loading }: IListItem) => {
  if (loading) {
    const height = Math.floor((Math.random() + 1) * 100);
    return <Skeleton height={height} className={styles.altListItem} />;
  }
  return (
    <BlogPostLink id={post ? post.id : ""} disabled={loading}>
      <a className={styles.altListItemWrapper}>
        <img src={post.imageURL} className={styles.altListItem} />
        <div className={styles.overlay}></div>
        <div className={styles.active}>
          <PostAuthor />
          <h4 className={styles.title}>{post.title}</h4>
          <PostDate timestamp={post.createdAt} />
        </div>
      </a>
    </BlogPostLink>
  );
};

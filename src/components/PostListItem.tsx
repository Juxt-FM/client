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
import SkeletonWrapper from "./SkeletonWrapper";

import { getMockUser } from "../__mocks__/mockData";

import styles from "../styles/modules/post-list.module.scss";

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

interface IPostDate {
  timestamp: string;
}

const PostDate = ({ timestamp }: IPostDate) => (
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
  <a className={[styles.imageRoot, styles[size]].join(" ")}>
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

interface IPostAuthor {
  profile?: UserProfile;
  loading?: boolean;
}

export const PostAuthor = ({ loading = false }: IPostAuthor) => {
  const profile = getMockUser().profile;

  return (
    <a className={styles.author}>
      {loading ? (
        <Skeleton className={styles.authorImg} />
      ) : (
        <img
          className={styles.authorImg}
          src={profile.imageURL}
          alt="author profile image"
        />
      )}

      <p className={styles.name}>
        {loading ? <Skeleton width={100} /> : profile.name}
      </p>
    </a>
  );
};

interface ISummary {
  summary: string;
}

export const Summary = ({ summary }: ISummary) => (
  <p className={styles.summary}>{summary}</p>
);

interface IListItem {
  post: BlogPost | undefined;
  image?: "top" | "right" | "left";
  loading?: boolean;
  size?: Size;
}

export const ListItem = ({
  post,
  image,
  size = "md",
  loading = false,
}: IListItem) => {
  const rootClasses = [
    styles.listItem,
    styles[size],
    image === "top" ? styles.topImage : "",
    loading ? styles.loading : "",
  ];

  const renderSummary = () => {
    if (size !== "sm") {
      if (loading)
        return (
          <Fragment>
            <Skeleton width="100%" />
            <Skeleton width="75%" />
          </Fragment>
        );
      else return <p className={styles.summary}>{post.subtitle}</p>;
    }
  };

  return (
    <SkeletonWrapper>
      <div className={rootClasses.join(" ")}>
        {(image === "left" || image == "top") && (
          <PostImage imageURL={post.imageURL} size={size} loading={loading} />
        )}
        <div className={styles.content}>
          <BlogPostLink id={post ? post.id : ""} disabled={loading}>
            <div>
              <PostAuthor loading={loading} />
              <a>
                <p className={[styles.title, styles[size]].join(" ")}>
                  {loading ? <Skeleton width="75%" /> : post.title}
                </p>
              </a>
              {renderSummary()}
            </div>
          </BlogPostLink>
          {loading ? (
            <Skeleton width={100} />
          ) : (
            <PostDate timestamp={post.createdAt} />
          )}
        </div>
        <div className={[styles.divider, styles[size]].join(" ")}></div>
        {image === "right" && (
          <BlogPostLink id={post ? post.id : ""} disabled={loading}>
            <PostImage size={size} imageURL={post.imageURL} loading={loading} />
          </BlogPostLink>
        )}
      </div>
    </SkeletonWrapper>
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
    return <Skeleton height={300} className={styles.altListItem} />;
  }
  return (
    <BlogPostLink id={post ? post.id : ""} disabled={loading}>
      <a className={styles.altListItemWrapper}>
        <img src={post.imageURL} className={styles.altListItem} />
        <div className={styles.overlay}></div>
        <div className={styles.active}>
          <PostAuthor />
          <p className={[styles.title, styles.md].join(" ")}>
            {loading ? <Skeleton width="30%" /> : post.title}
          </p>
          <PostDate timestamp={post.createdAt} />
        </div>
      </a>
    </BlogPostLink>
  );
};

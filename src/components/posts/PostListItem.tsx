/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";

import { BlogPost } from "../../lib/graphql";

import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "../common/SkeletonWrapper";
import { ProfileListItem } from "../users/ProfileListItem";

import styles from "../../styles/posts/list-item.module.scss";

type Size = "sm" | "md" | "lg";

interface IPostComponent {
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
    <Link href={`/app/posts/${id}`}>
      <a>{children}</a>
    </Link>
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

interface IPostDate extends IPostComponent {
  timestamp: string;
}

const PostDate = ({ timestamp, loading = false }: IPostDate) => (
  <p className={styles.timestamp}>
    {loading ? (
      <Skeleton width={100} />
    ) : (
      moment(parseInt(timestamp, 10) * 1000).fromNow()
    )}
  </p>
);

interface IPostImage extends IPostComponent {
  imageURL: string;
  size?: Size;
}

export const PostImage = ({
  imageURL,
  size = "md",
  loading = false,
}: IPostImage) => (
  <div className={[styles.imageRoot, styles[size]].join(" ")}>
    {loading ? (
      <Skeleton className={[styles.image, styles[size]].join(" ")} />
    ) : (
      <img
        className={[styles.image, styles[size]].join(" ")}
        src={imageURL}
        alt="blog post image"
      />
    )}
  </div>
);

interface IPostSummary extends IPostComponent {
  summary: string;
}

export const PostSummary = ({ summary, loading }: IPostSummary) => {
  if (loading)
    return (
      <Fragment>
        <Skeleton width="100%" />
        <Skeleton width="75%" />
      </Fragment>
    );

  return <p className={styles.summary}>{summary}</p>;
};

interface IPostTitle extends IPostComponent {
  title: string;
  size?: Size;
}

export const PostTitle = ({ title, loading, size = "md" }: IPostTitle) => {
  return (
    <p className={[styles.title, styles[size]].join(" ")}>
      {loading ? <Skeleton width="75%" /> : title}
    </p>
  );
};

interface IListItem extends IPostComponent {
  post: BlogPost | undefined;
  image?: "top" | "right" | "left";
  size?: Size;
}

export const ListItem = ({ post, image, loading, size = "md" }: IListItem) => {
  const rootClasses = [
    styles.listItem,
    styles[size],
    image === "top" ? styles.topImage : "",
    loading ? styles.loading : "",
  ];

  const linkProps = { id: post ? post.id : "", disabled: loading };

  return (
    <SkeletonWrapper>
      <div className={rootClasses.join(" ")}>
        {(image === "left" || image == "top") && (
          <BlogPostLink {...linkProps}>
            <PostImage imageURL={post.imageURL} size={size} loading={loading} />
          </BlogPostLink>
        )}
        {image === "left" && (
          <div className={[styles.divider, styles[size]].join(" ")}></div>
        )}
        <div className={styles.content}>
          <div>
            <ProfileListItem loading={loading} />
            <BlogPostLink {...linkProps}>
              <PostTitle title={post.title} size={size} loading={loading} />
            </BlogPostLink>
            {size !== "sm" && (
              <PostSummary summary={post.subtitle} loading={loading} />
            )}
          </div>
          <PostDate timestamp={post.createdAt} loading={loading} />
        </div>
        {image === "right" && (
          <Fragment>
            <div className={[styles.divider, styles[size]].join(" ")}></div>
            <BlogPostLink {...linkProps}>
              <PostImage
                size={size}
                imageURL={post.imageURL}
                loading={loading}
              />
            </BlogPostLink>
          </Fragment>
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
      <div className={styles.altListItemWrapper}>
        <img src={post.imageURL} className={styles.altListItem} />
        <div className={styles.overlay}></div>
        <div className={styles.active}>
          <ProfileListItem loading={loading} touchable={false} />
          <PostTitle title={post.title} size="md" loading={loading} />
          <PostDate timestamp={post.createdAt} />
        </div>
      </div>
    </BlogPostLink>
  );
};

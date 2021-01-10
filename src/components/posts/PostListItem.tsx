/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactChild, ReactChildren } from "react";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";

import { BlogPost } from "../../lib/graphql";

import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "../common/SkeletonWrapper";
import { ProfileListItem } from "../users/ProfileListItem";

import styles from "../../styles/posts/list-item.module.scss";

type Size = "sm" | "md" | "lg";

interface IPostProps {
  post?: BlogPost;
}

interface ILoadable {
  loading?: boolean;
}

interface IPostLink {
  id: string;
  children: ReactChild | ReactChildren;
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
        <PostListItem loading key={String(index)} />
      ))}
    </Fragment>
  </SkeletonWrapper>
);

interface IPostDate extends ILoadable {
  timestamp?: string;
}

export const PostDate = ({ timestamp, loading = false }: IPostDate) => (
  <p className={styles.timestamp}>
    {loading ? (
      <Skeleton width={100} />
    ) : (
      moment(parseInt(timestamp, 10) * 1000).fromNow()
    )}
  </p>
);

/**
 *
 * We need to create a new link in the image component
 * because it fucks with the sizing if we have a parent <a> tag
 * in the main BlogPostLink component.
 *
 */
interface IPostImage extends ILoadable {
  id?: string;
  imageURL?: string;
  size?: Size;
}

export const PostImage = ({
  id,
  imageURL,
  size = "md",
  loading = false,
}: IPostImage) => {
  const rootClasses = [styles.imageRoot, styles[size]].join(" ");
  const imageClasses = [styles.image, styles[size]].join(" ");

  if (loading)
    return (
      <div className={rootClasses}>
        <Skeleton className={imageClasses} />
      </div>
    );

  return (
    <Link href={`/app/posts/${id}`}>
      <a className={rootClasses}>
        <img className={imageClasses} src={imageURL} alt="blog post image" />
      </a>
    </Link>
  );
};

interface IPostSummary extends ILoadable {
  summary?: string;
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

interface IPostTitle extends ILoadable {
  title?: string;
  size?: Size;
}

export const PostTitle = ({ title, loading, size = "md" }: IPostTitle) => {
  return (
    <p className={[styles.title, styles[size]].join(" ")}>
      {loading ? <Skeleton width="75%" /> : title}
    </p>
  );
};

interface IListItem extends ILoadable, IPostProps {
  image?: "top" | "right" | "left";
  size?: Size;
}

export const PostListItem = ({
  post,
  image,
  loading,
  size = "md",
}: IListItem) => {
  const rootClasses = [
    styles.listItem,
    styles[size],
    image === "top" ? styles.topImage : "",
    loading ? styles.loading : "",
  ];

  const linkProps = { id: post ? post.id : "", disabled: loading };

  const getComponentProps = () => {
    if (loading)
      return {
        image: { size, loading: true },
        title: { size, loading: true },
        summary: { loading: true },
        date: { loading: true },
      };
    else
      return {
        image: { size, id: post.id, imageURL: post.imageURL },
        title: { size, title: post.title },
        summary: {
          summary: post.subtitle,
        },
        date: {
          timestamp: post.createdAt,
        },
      };
  };

  const components = getComponentProps();

  return (
    <div className={rootClasses.join(" ")}>
      {(image === "left" || image == "top") && (
        <PostImage {...components.image} />
      )}
      {image === "left" && (
        <div className={[styles.divider, styles[size]].join(" ")}></div>
      )}
      <div className={styles.content}>
        <div>
          <ProfileListItem loading={loading} />
          <BlogPostLink {...linkProps}>
            <PostTitle {...components.title} />
          </BlogPostLink>
          {size !== "sm" && <PostSummary {...components.summary} />}
        </div>
        <PostDate {...components.date} />
      </div>
      {image === "right" && (
        <Fragment>
          <div className={[styles.divider, styles[size]].join(" ")}></div>
          <PostImage {...components.image} />
        </Fragment>
      )}
    </div>
  );
};

export const LoadingAltPostListItem = ({ count = 5 }) =>
  _.range(count).map((index) => (
    <AltPostListItem loading key={String(index)} />
  ));

export const AltPostListItem = ({ post, loading }: IPostProps & ILoadable) => {
  if (loading) return <Skeleton height={300} className={styles.altListItem} />;

  return (
    <BlogPostLink id={post ? post.id : ""} disabled={loading}>
      <div className={styles.altListItemWrapper}>
        <img src={post.imageURL} className={styles.altListItem} />
        <div className={styles.overlay}></div>
        <div className={styles.active}>
          <ProfileListItem touchable={false} />
          <PostTitle title={post.title} size="md" />
          <PostDate timestamp={post.createdAt} />
        </div>
      </div>
    </BlogPostLink>
  );
};

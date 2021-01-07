/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";

import { UserProfile } from "../../lib/graphql";

import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "../common/SkeletonWrapper";

import { getMockUser } from "../../__mocks__/mockData";

import styles from "../../styles/modules/idea-list.module.scss";

interface IIdeaLink {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export const IdeaLink = ({ id, children, disabled = false }: IIdeaLink) =>
  disabled ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Link href={`/app/ideas/${id}`}>{children}</Link>
  );

export const LoadingIdea = ({ count = 5 }) => (
  <SkeletonWrapper>
    <Fragment>
      {_.range(count).map((index) => (
        <Idea idea={undefined} loading key={String(index)} />
      ))}
    </Fragment>
  </SkeletonWrapper>
);

interface IIdeaDate {
  timestamp: string;
}

const IdeaDate = ({ timestamp }: IIdeaDate) => (
  <p className={styles.timestamp}>
    {moment(parseInt(timestamp, 10) * 1000).fromNow()}
  </p>
);

interface IIdeaImage {
  imageURL: string;
  loading?: boolean;
}

export const IdeaImage = ({ imageURL, loading = false }: IIdeaImage) => (
  <a className={styles.imageRoot}>
    {loading ? (
      <Skeleton className={styles.image} />
    ) : (
      <img className={styles.image} src={imageURL} alt="blog post image" />
    )}
  </a>
);

interface IPostAuthor {
  profile?: UserProfile;
  loading?: boolean;
}

export const IdeaAuthor = ({ loading = false }: IPostAuthor) => {
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

interface IIdea {
  idea: any;
  image?: "top" | "right" | "left";
  loading?: boolean;
}

const Idea = ({ idea, loading = false }: IIdea) => {
  const rootClasses = [styles.listItem, loading ? styles.loading : ""];

  const renderContent = () => {
    if (loading)
      return (
        <Fragment>
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="75%" />
        </Fragment>
      );
    else return <p className={styles.summary}>{idea.content}</p>;
  };

  return (
    <SkeletonWrapper>
      <div className={rootClasses.join(" ")}>
        <div className={styles.content}>
          <IdeaLink id={idea ? idea.id : ""} disabled={loading}>
            <div>
              <IdeaAuthor loading={loading} />
              {renderContent()}
            </div>
          </IdeaLink>
          {loading ? (
            <Skeleton width={100} />
          ) : (
            <IdeaDate timestamp={idea.createdAt} />
          )}
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default Idea;

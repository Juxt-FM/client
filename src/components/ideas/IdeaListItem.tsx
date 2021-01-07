/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";

import {
  ProfileImage,
  ProfileLink,
  ProfileName,
} from "../users/ProfileListItem";
import SkeletonWrapper from "../common/SkeletonWrapper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";

import styles from "../../styles/ideas/list-item.module.scss";

interface IIdeaLink {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export const IdeaLink = ({ id, children, disabled = false }: IIdeaLink) =>
  disabled ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Link href={`/app/ideas/${id}`}>
      <div>{children}</div>
    </Link>
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
  loading?: boolean;
}

const IdeaDate = ({ timestamp, loading = false }: IIdeaDate) => (
  <p className={styles.timestamp}>
    {loading ? (
      <Skeleton width={100} />
    ) : (
      moment(parseInt(timestamp, 10) * 1000).fromNow()
    )}
  </p>
);

interface ITags {
  tags?: string[];
  loading?: boolean;
}

const Tags = (props: ITags) => {
  if (props.loading)
    return (
      <ul className={styles.tags}>
        <li>
          <Skeleton width={100} className={styles.tag} />
        </li>
        <li>
          <Skeleton width={100} className={styles.tag} />
        </li>
      </ul>
    );

  return (
    <ul className={styles.tags}>
      <li>
        <a className={styles.tag}>#technology</a>
      </li>
      <li>
        <a className={styles.tag}>#semiconductors</a>
      </li>
    </ul>
  );
};

interface IReactions {
  loading?: boolean;
}

const Reactions = ({ loading }: IReactions) => {
  const classes = [styles.reactions, loading ? styles.loading : ""].join(" ");

  return (
    <div className={classes}>
      <a className={styles.item}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </a>
      <a className={styles.item}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </a>
      <a className={styles.item}>
        <FontAwesomeIcon icon={faHeart} />
      </a>
      <a className={styles.item}>
        <FontAwesomeIcon icon={faShare} />
      </a>
    </div>
  );
};

interface IIdea {
  idea: any;
  loading?: boolean;
}

const Idea = ({ idea, loading = false }: IIdea) => {
  const rootClasses = [styles.root, loading ? styles.loading : ""];

  const renderContent = () => {
    if (loading)
      return (
        <Fragment>
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="75%" />
        </Fragment>
      );
    else return <p className={styles.content}>{idea.content}</p>;
  };

  return (
    <SkeletonWrapper>
      <li>
        <IdeaLink id={idea ? idea.id : ""} disabled={loading}>
          <div className={rootClasses.join(" ")}>
            <div className={styles.userImage}>
              <ProfileLink id="1" disabled={loading}>
                <ProfileImage
                  size="xl"
                  loading={loading}
                  imageURL="https://pererasys.com/_next/static/images/me-0e70979b96b772f832a278693ee0cd0e.jpg"
                />
              </ProfileLink>
            </div>
            <div className={styles.container}>
              <div className={styles.header}>
                <ProfileName name="Andrew Perera" loading={loading} size="lg" />
                <IdeaDate timestamp={idea.createdAt} loading={loading} />
              </div>
              <Tags loading={loading} />
              {renderContent()}
              <div className={styles.footer}>
                <Reactions loading={loading} />
              </div>
            </div>
          </div>
        </IdeaLink>
      </li>
    </SkeletonWrapper>
  );
};

export default Idea;

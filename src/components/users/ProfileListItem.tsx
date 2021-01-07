/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, ReactChild } from "react";
import Link from "next/link";
import _ from "lodash";

import { UserProfile } from "../../lib/graphql";

import { Thumbnail } from "../common/Images";
import Skeleton from "react-loading-skeleton";

import { getMockUser } from "../../__mocks__/mockData";

import styles from "../../styles/users/list-item.module.scss";

interface IProfileComponent {
  loading?: boolean;
}

interface IProfileLink {
  id: string;
  children: ReactChild;
  disabled?: boolean;
}

export const ProfileLink = (props: IProfileLink) =>
  props.disabled ? (
    <div className={styles.root}>{props.children}</div>
  ) : (
    <Link href={`/app/users/${props.id}`}>
      <a className={styles.root}>{props.children}</a>
    </Link>
  );

interface IProfileImage extends IProfileComponent {
  imageURL: string;
  size: "sm" | "md" | "lg" | "xl";
}

export const ProfileImage = ({ size = "sm", ...props }: IProfileImage) => (
  <Thumbnail
    size={size}
    src={props.imageURL}
    alt="user profile image"
    showLoader={props.loading}
  />
);

interface IProfileName extends IProfileComponent {
  name: string;
  size?: "md" | "lg";
}

export const ProfileName = ({ name, loading, size = "md" }: IProfileName) => (
  <p className={[styles.name, styles[size]].join(" ")}>
    {loading ? <Skeleton width={100} /> : name}
  </p>
);

interface IProfile extends IProfileComponent {
  profile?: UserProfile;
  touchable?: boolean;
}

export const ProfileListItem = ({ loading, touchable = true }: IProfile) => {
  const profile = getMockUser().profile;

  const renderContent = () => (
    <Fragment>
      <ProfileImage imageURL={profile.imageURL} size="sm" loading={loading} />
      <ProfileName name={profile.name} loading={loading} />
    </Fragment>
  );

  if (touchable)
    return (
      <ProfileLink id={profile.id} disabled={loading}>
        {renderContent()}
      </ProfileLink>
    );

  return <div className={styles.root}>{renderContent()}</div>;
};

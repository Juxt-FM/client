/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ElementType } from "react";
import { useRouter } from "next/router";
import { useAuthStatus } from "../../lib/auth";
import { UserProfile } from "../../lib/graphql";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { ButtonOutline } from "../common/Buttons";
import TabBar from "../common/TabBar";

import styles from "../../styles/pages/user.module.scss";

interface IUserProfile {
  profile: UserProfile;
}

const CoverImage = () => (
  <img
    src="https://img.freepik.com/free-vector/neon-lights-wallpaper_52683-46462.jpg?size=626&ext=jpg"
    className={styles.profileHeader}
  ></img>
);

interface IInfoSection {
  icon: IconProp;
  content: string;
}

const InfoSection = (props: IInfoSection) => (
  <div className={styles.infoSection}>
    <FontAwesomeIcon icon={props.icon} className={styles.icon} />
    <p className={styles.bodyText}>{props.content}</p>
  </div>
);

export const ProfileInfo = ({ profile }: IUserProfile) => {
  const userID = useAuthStatus();

  const isSelf = userID === profile.id;

  return (
    <div className={styles.profileInfo}>
      <div className={styles.infoHeader}>
        <img
          className={styles.profileImage}
          src="https://www.pererasys.com/_next/static/images/me-0e70979b96b772f832a278693ee0cd0e.jpg"
          alt="logged in user"
        />
        <div className={styles.actions}>
          <ButtonOutline label={isSelf ? "Edit profile" : "Follow"} size="sm" />
        </div>
      </div>
      <div className={styles.info}>
        <h3>{profile.name}</h3>
        <InfoSection icon={faMapMarkerAlt} content="Charleston, SC" />
        <InfoSection icon={faCalendarAlt} content="Joined June 26, 2018" />
      </div>
      <div className={styles.about}>
        <p className={styles.summary}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe
          voluptate voluptatibus nostrum voluptatem harum delectus quisquam?
        </p>
      </div>
    </div>
  );
};

const getTabs = (id: string, path: string) => {
  return [
    { label: "Posts", path: `/app/users/${id}` },
    { label: "Ideas", path: `/app/users/${id}/ideas` },
    { label: "Watchlists", path: `/app/users/${id}/watchlists` },
  ].map((tab) => {
    const active = tab.path.split(id)[1] === path.split("/app/users/[id]")[1];
    return { ...tab, active };
  });
};

interface IProfileRoot extends IUserProfile {
  Component: ElementType;
}

const ProfileRoot = ({ Component, profile }: IProfileRoot) => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <CoverImage />
      <div className={styles.content}>
        <ProfileInfo profile={profile} />
        <TabBar tabs={getTabs(profile.id, router.pathname)} sticky />
        <div className={styles.main}>
          <Component />
        </div>
      </div>
    </div>
  );
};

export default ProfileRoot;

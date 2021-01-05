/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ElementType, Fragment } from "react";
import { useAuthUser } from "../lib/context";
import { useRouter } from "next/router";
import { UserProfile } from "../lib/apollo";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { Button } from "./common/Buttons";

import styles from "../styles/modules/profile-root.module.scss";

interface IUserProfile {
  profile: UserProfile;
}

interface INavLink {
  basePath?: string;
  path: string;
  label: string;
  danger?: boolean;
}

const NavLink = ({ label, path, basePath, danger = false }: INavLink) => {
  const router = useRouter();

  const finalPath = `${basePath}${path}`;

  const active = path === router.pathname.split("/users/[id]")[1];

  const classes = [styles.navLink];
  if (active) classes.push(styles.active);
  if (danger) classes.push(styles.danger);

  return (
    <Link href={finalPath}>
      <a className={classes.join(" ")}>{label}</a>
    </Link>
  );
};

const ProfileHeader = () => (
  <img
    src="https://img.freepik.com/free-vector/neon-lights-wallpaper_52683-46462.jpg?size=626&ext=jpg"
    className={styles.profileHeader}
  ></img>
);

export const ProfileNavigation = ({ id }: { id: string }) => {
  return (
    <div className={styles.profileNavigation}>
      <NavLink label="Posts" basePath={`/users/${id}`} path="" />
      <NavLink label="Ideas" basePath={`/users/${id}`} path="/ideas" />
      <NavLink
        label="Watchlists"
        basePath={`/users/${id}`}
        path="/watchlists"
      />
    </div>
  );
};

interface IProfileInfo extends IUserProfile {
  isSelf: boolean;
}

const ProfileInfo = ({ profile, isSelf = false }: IProfileInfo) => (
  <div className={styles.profileInfo}>
    <img
      src="https://www.artgoa.com/wp-content/uploads/2016/07/DJ1.jpeg"
      alt="profile image"
    />
    <div className={styles.infoContent}>
      <h3>{profile.name}</h3>
      <p className={styles.location}>{profile.location}</p>
      <p>{profile.summary}</p>
    </div>
    <div className={styles.profileActions}>
      <div className={styles.followers}>
        <p>15K Followers</p>
        <Button
          color={isSelf ? "secondary" : "primary"}
          label={isSelf ? "Update" : "Follow"}
        />
      </div>
      <div className={styles.platforms}>
        <a className={styles.iconBtn}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a className={styles.iconBtn}>
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a className={styles.iconBtn}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
  </div>
);

interface IProfileRoot extends IUserProfile {
  Component: ElementType;
}

export default function ProfileRoot({ Component, profile }: IProfileRoot) {
  const { user } = useAuthUser();

  return (
    <Fragment>
      <ProfileHeader />
      <div className={styles.profileRoot}>
        <div>
          <ProfileInfo
            isSelf={user ? profile.id === user.id : false}
            profile={profile}
          />
        </div>
        <div className={styles.profileContent}>
          <ProfileNavigation id={profile.id} />
        </div>
      </div>
    </Fragment>
  );
}

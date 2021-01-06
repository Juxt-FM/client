/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { Fragment, useState } from "react";
import { useAuthStatus, useAuthUser } from "../lib/context";

import {
  faArrowLeft,
  faCog,
  faCommentAlt,
  faEllipsisH,
  faQuestionCircle,
  faSearch,
  faShieldAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Squash as Hamburger } from "hamburger-react";

import styles from "../styles/modules/header.module.scss";
import Dropdown, { DropdownList } from "./common/Dropdown";
import { useRouter } from "next/router";
import { IconAction } from "./common/Buttons";
import Link from "next/link";

interface IPageInfo {
  title: string;
  backButton?: boolean;
}

const PageInfo = ({ backButton = false, title }: IPageInfo) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const renderActionButton = () => {
    if (showMenu && !backButton) {
      return (
        <div className={styles.menuAction}>
          <Hamburger
            size={24}
            color="black"
            toggled={showMenu}
            toggle={setShowMenu}
          />
        </div>
      );
    } else if (backButton) {
      return (
        <div className={styles.backButton}>
          <IconAction icon={faArrowLeft} onClick={() => router.back()} />
        </div>
      );
    }
  };

  return (
    <div className={styles.pageInfo}>
      {renderActionButton()}
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

const AccountDropdown = () => {
  const router = useRouter();
  const { user } = useAuthUser();

  const renderAnchor = (
    openDropdown: (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void
  ) => (
    <a className={styles.navOption} onClick={openDropdown}>
      <img
        className={styles.profileImage}
        src="https://www.pererasys.com/_next/static/images/me-0e70979b96b772f832a278693ee0cd0e.jpg"
        alt="logged in user"
      />
    </a>
  );

  const renderContent = () => {
    const lists = [
      [
        {
          label: "Profile",
          icon: faUser,
          action: () => router.push(`/users/${user.id}`),
        },
      ],
      [
        {
          label: "Settings",
          icon: faCog,
          action: () => router.push(`/settings/account`),
        },
        {
          label: "Privacy",
          icon: faShieldAlt,
          action: () => router.push(`/settings/privacy`),
        },
      ],
      [
        {
          label: "Help Center",
          icon: faQuestionCircle,
          action: () => router.push(`/support/help`),
        },
        {
          label: "Contact Us",
          icon: faCommentAlt,
          action: () => router.push(`/support/contact`),
        },
      ],
      [
        {
          label: "Logout",
          icon: faSignOutAlt,
          action: () => router.push("/auth/logout"),
          danger: true,
        },
      ],
    ];

    return (
      <Fragment>
        {lists.map((options, index) => (
          <Fragment key={String(index)}>
            <DropdownList options={options} />
            {index + 1 !== lists.length && <hr />}
          </Fragment>
        ))}
      </Fragment>
    );
  };

  if (user) {
    return <Dropdown anchor={renderAnchor} content={renderContent} />;
  } else {
    return <div className={styles.loadingNavOption}></div>;
  }
};

const Navigation = () => {
  const loggedIn = useAuthStatus();
  return (
    <ul className={styles.navigation}>
      <li>
        <IconAction icon={faSearch} onClick={() => {}} />
      </li>
      <li>
        <IconAction icon={faEllipsisH} onClick={() => {}} />
      </li>
      {loggedIn && (
        <li>
          <AccountDropdown />
        </li>
      )}
    </ul>
  );
};

interface IHeader extends IPageInfo {}

export const Header = ({ title, backButton }: IHeader) => {
  return (
    <header className={styles.header}>
      <PageInfo title={title} backButton={backButton} />
      <Navigation />
    </header>
  );
};

export default Header;

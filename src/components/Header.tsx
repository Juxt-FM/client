/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { Fragment, useState } from "react";
import { useAuthUser } from "../lib/context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faCommentAlt,
  faEllipsisH,
  faQuestionCircle,
  faSearch,
  faShieldAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Squash as Hamburger } from "hamburger-react";

import styles from "../styles/modules/header.module.scss";
import Dropdown, { DropdownList } from "./common/Dropdown";
import { useRouter } from "next/router";

interface IPageInfo {
  title: string;
}

const PageInfo = ({ title }: IPageInfo) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.pageInfo}>
      <div className={styles.menuAction}>
        <Hamburger
          size={24}
          color="black"
          toggled={showMenu}
          toggle={setShowMenu}
        />
      </div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

const UserInfo = () => {
  const router = useRouter();
  const { user } = useAuthUser();

  const renderAnchor = (
    openDropdown: (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void,
    isOpen: boolean
  ) => (
    <a className={styles.navOption} onClick={openDropdown}>
      <img
        className={styles.profileImage}
        src="https://i.mdel.net/i/db/2018/8/950736/950736-500w.jpg"
        alt="logged in user"
      />
    </a>
  );

  const renderContent = () => {
    const lists = [
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
  return (
    <ul className={styles.navigation}>
      <li>
        <a className={styles.navOption}>
          <FontAwesomeIcon icon={faSearch} />
        </a>
      </li>
      <li>
        <a className={styles.navOption}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </a>
      </li>
      <li>
        <UserInfo />
      </li>
    </ul>
  );
};

interface IHeader extends IPageInfo {}

export const Header = ({ title }: IHeader) => {
  return (
    <header className={styles.header}>
      <PageInfo title={title} />
      <Navigation />
    </header>
  );
};

export default Header;

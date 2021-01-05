/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { Fragment, ReactChild, ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthUser, useAuthStatus } from "../../lib/context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faCommentAlt,
  faEye,
  faFileAlt,
  faLightbulb,
  faPlus,
  faQuestionCircle,
  faShieldAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown, { DropdownList } from "./Dropdown";

import styles from "../../styles/modules/header.module.scss";

interface IMenuOption {
  header: ReactNode;
  children: ReactChild;
}

const MenuOption = (props: IMenuOption) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const closeDropdown = () => {
    setDropdownActive(false);
  };

  const openDropdown = (e: any) => {
    e.preventDefault();
    setDropdownActive(true);
  };

  return (
    <a className={styles.option} onClick={openDropdown}>
      {props.header}
      <Dropdown isOpen={dropdownActive} onClose={closeDropdown}>
        {props.children}
      </Dropdown>
    </a>
  );
};

const AccountMenu = () => {
  const { user } = useAuthUser();
  const router = useRouter();

  const accountRootPath = `/users/${user.id}/`;

  const lists = [
    [
      {
        label: "Posts",
        icon: faFileAlt,
        action: () => router.push(accountRootPath),
      },
      {
        label: "Ideas",
        icon: faLightbulb,
        action: () => router.push(accountRootPath + "ideas"),
      },
      {
        label: "Watchlists",
        icon: faEye,
        action: () => router.push(accountRootPath + "watchlists"),
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
    <MenuOption
      header={
        <img
          src="https://www.artgoa.com/wp-content/uploads/2016/07/DJ1.jpeg"
          alt="profile image"
        />
      }
    >
      <Fragment>
        <Link href={accountRootPath}>
          <a className={styles.profileOption}>
            <img
              src="https://www.artgoa.com/wp-content/uploads/2016/07/DJ1.jpeg"
              alt="profile image"
            />
            <div>
              <p>{user.profile.name}</p>
              {user.email.address}
            </div>
          </a>
        </Link>
        {lists.map((options, index) => (
          <Fragment key={String(index)}>
            <hr />
            <DropdownList options={options} />
          </Fragment>
        ))}
      </Fragment>
    </MenuOption>
  );
};

const NewContentMenu = () => {
  const router = useRouter();

  const newContentActions = [
    {
      label: "Post",
      icon: faFileAlt,
      action: () => router.push("/blog/editor"),
    },
    {
      label: "Idea",
      icon: faLightbulb,
      action: () => {
        // tslint:disable-next-line:no-console
        console.log("new idea");
      },
    },
    {
      label: "Watchlist",
      icon: faEye,
      action: () => {
        // tslint:disable-next-line:no-console
        console.log("new watchlist");
      },
    },
  ];

  return (
    <Fragment>
      <MenuOption header={<FontAwesomeIcon icon={faPlus} />}>
        <DropdownList options={newContentActions} />
      </MenuOption>
    </Fragment>
  );
};

const NotificationsMenu = () => (
  <MenuOption header={<FontAwesomeIcon icon={faBell} />}>
    <div className={styles.notifications}>
      <h4>Notifications</h4>
      <p className={styles.empty}>You're all caught up!</p>
    </div>
  </MenuOption>
);

const AuthBanner = () => {
  const loggedIn = useAuthStatus();
  const { user, loading } = useAuthUser();

  const renderContent = () => {
    if (loggedIn) {
      if (user) {
        return (
          <Fragment>
            <NewContentMenu />
            <NotificationsMenu />
            <AccountMenu />
          </Fragment>
        );
      } else if (loading)
        return (
          <Fragment>
            <div className={styles.loadingOption}></div>
            <div className={styles.loadingOption}></div>
            <div className={styles.loadingOption}></div>
          </Fragment>
        );
    } else {
      return (
        <Fragment>
          <Link href="/auth/login">
            <button className={styles.loginBtn}>Log in</button>
          </Link>
          <Link href="/auth/signup">
            <a>Sign up</a>
          </Link>
        </Fragment>
      );
    }
  };

  return <header className={styles.authBanner}>{renderContent()}</header>;
};

export default AuthBanner;

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStatus, useAuthUser } from "../../lib/auth";

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

import Dropdown, { DropdownList } from "../common/Dropdown";
import { Button, IconAction } from "../common/Buttons";

import styles from "../../styles/navigation/header.module.scss";

interface IPageInfo {
  title: string;
  backButton?: boolean;
}

export const BackButton = () => {
  const router = useRouter();

  const onBack = () => router.back();

  return (
    <div className={styles.backButton}>
      <IconAction icon={faArrowLeft} size="sm" onClick={onBack} />
    </div>
  );
};

export const PageInfo = ({ backButton = false, title }: IPageInfo) => {
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
      return <BackButton />;
    }
  };

  return (
    <div className={styles.pageInfo}>
      {renderActionButton()}
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export const SettingsDropdown = () => {
  const renderAnchor = (
    openDropdown: (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void
  ) => <IconAction icon={faEllipsisH} size="sm" onClick={openDropdown} />;

  const renderContent = () => {
    const lists = [
      [
        {
          label: "Settings",
          icon: faCog,
          path: `/app/settings/account`,
        },
        {
          label: "Privacy",
          icon: faShieldAlt,
          path: `/app/settings/privacy`,
        },
      ],
      [
        {
          label: "Help Center",
          icon: faQuestionCircle,
          path: `/support/help`,
        },
        {
          label: "Contact Us",
          icon: faCommentAlt,
          path: `/support/contact`,
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

  return <Dropdown renderAnchor={renderAnchor}>{renderContent()}</Dropdown>;
};

export const AccountDropdown = () => {
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
          path: `/app/users/${user.id}`,
        },
      ],
      [
        {
          label: "Logout",
          icon: faSignOutAlt,
          path: "/auth/logout",
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
    return <Dropdown renderAnchor={renderAnchor}>{renderContent()}</Dropdown>;
  } else {
    return <div className={styles.loadingNavOption}></div>;
  }
};

export const Navigation = () => {
  const router = useRouter();
  const loggedIn = useAuthStatus();

  return (
    <ul className={styles.navigation}>
      <li className={styles.navItem}>
        <IconAction icon={faSearch} size="sm" onClick={() => {}} />
      </li>
      <li className={styles.navItem}>
        <SettingsDropdown />
      </li>
      <li className={styles.navItem}>
        {loggedIn ? (
          <AccountDropdown />
        ) : (
          <Button
            label="Get started"
            color="lightGreen"
            size="sm"
            onClick={() => router.push("/auth/signup")}
          />
        )}
      </li>
    </ul>
  );
};

const Header = ({ title, backButton }: IPageInfo) => {
  return (
    <header className={styles.header}>
      <PageInfo title={title} backButton={backButton} />
      <Navigation />
    </header>
  );
};

export default Header;

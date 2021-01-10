/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ReactChild, ReactChildren } from "react";
import { useRouter } from "next/router";
import { useAuthStatus } from "../../lib/auth";

import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import {
  faFileAlt,
  faFire,
  faLayerGroup,
  faLightbulb,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconButton } from "../common/Buttons";

import styles from "../../styles/navigation/menu.module.scss";

export const Logo = () => (
  <Link href="/app/latest">
    <a>
      <img
        className={styles.logo}
        src={require("../../images/logo-black-sm.png")}
        alt="brand_logo"
      />
    </a>
  </Link>
);

interface INavItem {
  label: string;
  icon: IconProp;
  path: string;
}

export const NavItem = ({ label, icon, path }: INavItem) => {
  const router = useRouter();

  const isActive = router.pathname === path;

  let classes = [styles.navItem];
  if (isActive) classes.push(styles.active);

  return (
    <li>
      <Link href={path}>
        <a className={classes.join(" ")}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={icon} />
          </div>
          <p className={styles.label}>{label}</p>
        </a>
      </Link>
    </li>
  );
};

export const ContentActions = () => {
  const router = useRouter();

  const onNewPost = () => router.push("/app/posts/editor");

  return (
    <ul className={styles.contentActions}>
      <li>
        <IconButton icon={faFileAlt} color="red" onClick={onNewPost} />
      </li>
      <li>
        <IconButton icon={faLightbulb} color="blue" onClick={onNewPost} />
      </li>
      <li>
        <IconButton icon={faList} color="lightGreen" onClick={onNewPost} />
      </li>
    </ul>
  );
};

interface IBaseMenu {
  routes: INavItem[];
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

export const BaseMenu = ({ routes, children }: IBaseMenu) => {
  return (
    <div className={styles.root}>
      <Logo />
      <ul className={styles.navigation}>
        {routes.map((route) => (
          <NavItem {...route} key={route.label} />
        ))}
      </ul>
      {children}
    </div>
  );
};

const ROUTES = [
  { icon: faFire, label: "Latest", path: "/app/latest" },
  { icon: faFileAlt, label: "Posts", path: "/app/posts" },
  { icon: faLayerGroup, label: "Stocks", path: "/app/stocks" },
  { icon: faBitcoin, label: "Cryptocurrencies", path: "/app/crypto" },
];

const Menu = () => {
  const loggedIn = useAuthStatus();

  return <BaseMenu routes={ROUTES}>{loggedIn && <ContentActions />}</BaseMenu>;
};

export default Menu;

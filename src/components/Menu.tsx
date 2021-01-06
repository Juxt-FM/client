/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Link from "next/link";
import { useRouter } from "next/router";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import {
  faFileAlt,
  faHistory,
  faLayerGroup,
  faLightbulb,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, IconButton } from "./common/Buttons";

import styles from "../styles/modules/menu.module.scss";
import { useAuthStatus } from "../lib/context";

const Logo = () => (
  <div className={styles.logoWrapper}>
    <Link href="/">
      <a>
        <img
          className={styles.logo}
          src={require("../images/logo-primary-sm.png")}
          alt="brand_logo"
        />
      </a>
    </Link>
  </div>
);

interface INavItem {
  label: string;
  icon: IconProp;
  path: string;
}

const NavItem = ({ label, icon, path }: INavItem) => {
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

const Menu = () => {
  const router = useRouter();
  const loggedIn = useAuthStatus();

  const onNewPost = () => router.push("/blog/editor");

  const renderActions = () => {
    if (loggedIn)
      return (
        <ul className={styles.contentActions}>
          <li>
            <IconButton icon={faFileAlt} color="blue" onClick={onNewPost} />
          </li>
          <li>
            <IconButton icon={faLightbulb} color="red" onClick={onNewPost} />
          </li>
          <li>
            <IconButton icon={faList} color="lightPurple" onClick={onNewPost} />
          </li>
        </ul>
      );
    else
      return (
        <Button
          label="Get started"
          color="lightGreen"
          onClick={() => router.push("/auth/signup")}
        />
      );
  };

  return (
    <div className={styles.root}>
      <Logo />
      <ul className={styles.navigation}>
        <NavItem icon={faHistory} label="Latest" path="/" />
        <NavItem icon={faLayerGroup} label="Stocks" path="/stocks" />
        <NavItem icon={faBitcoin} label="Cryptocurrencies" path="/crypto" />
      </ul>
      {renderActions()}
    </div>
  );
};

export default Menu;

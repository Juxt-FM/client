/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStatus } from "../../lib/context";

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

const Logo = () => (
  <Link href="/app">
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

  const onNewPost = () => router.push("/posts/editor");

  const renderActions = () => {
    if (loggedIn)
      return (
        <ul className={styles.contentActions}>
          <li>
            <IconButton icon={faFileAlt} color="black" onClick={onNewPost} />
          </li>
          <li>
            <IconButton icon={faLightbulb} color="black" onClick={onNewPost} />
          </li>
          <li>
            <IconButton icon={faList} color="black" onClick={onNewPost} />
          </li>
        </ul>
      );
  };

  return (
    <div className={styles.root}>
      <Logo />
      <ul className={styles.navigation}>
        <NavItem icon={faFire} label="Latest" path="/app/latest" />
        <NavItem icon={faFileAlt} label="Posts" path="/app/posts" />
        <NavItem icon={faLayerGroup} label="Stocks" path="/app/stocks" />
        <NavItem icon={faBitcoin} label="Cryptocurrencies" path="/app/crypto" />
      </ul>
      {renderActions()}
    </div>
  );
};

export default Menu;

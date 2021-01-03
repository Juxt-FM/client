/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React from "react";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCurrentBreakpoint } from "../../context";
import { Squash as Hamburger } from "hamburger-react";
import Searchbar from "./Searchbar";

import styles from "../../styles/modules/header.module.scss";

const Logo = () => {
  const router = useRouter();

  const onClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <a href="/" onClick={onClick}>
      <img
        className={styles.headerLogo}
        src={require("../../images/logo-black-sm.png")}
        alt="brand_logo"
      />
    </a>
  );
};

interface INavLink {
  label: string;
  path: string;
  className?: string;
}

const NavLink = ({ label, path, className }: INavLink) => (
  <Link href={path}>
    <a className={className}>{label}</a>
  </Link>
);

export const ContentHeader = ({ searchEnabled = true }) => {
  const currentBreakpoint = useCurrentBreakpoint();
  const [showMenu, setShowMenu] = useState(false);

  const renderMenuAction = () => {
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
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Logo />
        {searchEnabled && (
          <Searchbar placeholder="Search blog posts, stocks, and more..." />
        )}
      </div>
      {["xs", "sm", "md"].includes(currentBreakpoint) && renderMenuAction()}
      <ul className={styles.headerLinks}>
        <li className={styles.headerLink}>
          <NavLink label="Home" path="/" />
        </li>
        <li className={styles.headerLink}>
          <NavLink label="Stocks" path="/stocks" />
        </li>
        <li className={styles.headerLink}>
          <NavLink label="Cryptocurrencies" path="/crypto" />
        </li>
      </ul>
    </header>
  );
};

interface IRootProps {
  children: JSX.Element;
}

const HeaderRoot = ({ children }: IRootProps) => {
  return <div className={styles.root}>{children}</div>;
};

export default HeaderRoot;

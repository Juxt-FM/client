/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/modules/settings.module.scss";

interface INavLink {
  basePath?: string;
  path: string;
  label: string;
  danger?: boolean;
}

const NavLink = ({
  label,
  path,
  basePath = "/settings",
  danger = false,
}: INavLink) => {
  const router = useRouter();

  path = `${basePath}${path}`;

  const active = path === router.pathname;

  const classes = [styles.navLink];
  if (active) classes.push(styles.active);
  if (danger) classes.push(styles.danger);

  return (
    <Link href={path}>
      <a className={classes.join(" ")}>{label}</a>
    </Link>
  );
};

export const TabNavigator = () => {
  return (
    <div className={styles.navigation}>
      <NavLink label="Account" path="/account" />
      <NavLink label="Privacy" path="/privacy" />
    </div>
  );
};

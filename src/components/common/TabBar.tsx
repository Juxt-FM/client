/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Link from "next/link";

import styles from "../../styles/common/tabbar.module.scss";

interface ITab {
  path: string;
  label: string;
  active: boolean;
}

const Tab = ({ label, path, active }: ITab) => {
  const classes = [styles.tab];
  if (active) classes.push(styles.active);

  return (
    <Link href={path}>
      <a className={classes.join(" ")}>{label}</a>
    </Link>
  );
};

interface ITabBar {
  tabs: ITab[];
}

const TabBar = ({ tabs }: ITabBar) => (
  <div className={styles.root}>
    {tabs.map((tab, index) => (
      <Tab {...tab} key={String(index)} />
    ))}
  </div>
);

export default TabBar;

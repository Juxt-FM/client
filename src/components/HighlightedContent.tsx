/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useAuthStatus } from "../lib/context";

import Watchlists from "./Watchlists";

import styles from "../styles/modules/highlighted-content.module.scss";

interface ISection {
  title: string;
  children: JSX.Element;
}

const Section = ({ title, children }: ISection) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
};

const Trending = () => {
  const loggedIn = useAuthStatus();

  const renderLists = () => {
    return <div className={styles.empty}></div>;
  };

  return <Section title="Trending">{renderLists()}</Section>;
};

const Suggested = () => {
  const renderLists = () => {
    return <div className={styles.empty}></div>;
  };

  return <Section title="Suggested">{renderLists()}</Section>;
};

const HighlightedContent = () => {
  return (
    <div className={styles.root}>
      <Suggested />
      <Trending />
    </div>
  );
};

export default HighlightedContent;

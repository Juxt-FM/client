/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import styles from "../styles/modules/latest.module.scss";

const Trending = () => {
  return <div className={styles.trending}></div>;
};

const Latest = () => {
  return <div className={styles.latest}></div>;
};

export default function MainContent() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <Latest />
      </div>
      <Trending />
    </div>
  );
}

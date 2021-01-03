/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useRouter } from "next/router";
import { useAuthStatus } from "../context";

import Watchlists from "./Watchlists";
import { Button } from "./common/Buttons";

import styles from "../styles/modules/menu.module.scss";

const Menu = () => {
  const router = useRouter();
  const loggedIn = useAuthStatus();

  const renderWatchlists = () => {
    if (!loggedIn)
      return (
        <div className={styles.noUser}>
          <h5>You are not logged in.</h5>
          <p>Start receiving updates about assets in your portfolios.</p>
          <Button
            size="sm"
            label="Get started"
            onClick={() => router.push("/auth/signup")}
          />
        </div>
      );
    else return <Watchlists />;
  };

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h5>Following</h5>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.header}>
          <h5>Watchlists</h5>
        </div>
      </div>
      {renderWatchlists()}
    </div>
  );
};

export default Menu;

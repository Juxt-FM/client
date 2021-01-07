/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React from "react";

import MetaTags from "./MetaTags";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";

import styles from "../../styles/navigation/page.module.scss";

interface IPage {
  title: string;
  description: string;
  children: React.ReactNode;
  headerTitle?: string;
  extraContent?: React.ReactNode;
  backButton?: boolean;
}

const Page = (props: IPage) => {
  return (
    <React.Fragment>
      <MetaTags {...props} />
      <div className={styles.root}>
        <Menu />
        <div className={styles.page}>
          <Header
            title={props.headerTitle || props.title}
            backButton={props.backButton}
          />
          <div className={styles.main}>{props.children}</div>
          <Footer />
        </div>
        <div className={styles.extraContent}>{props.extraContent}</div>
      </div>
    </React.Fragment>
  );
};

export default Page;

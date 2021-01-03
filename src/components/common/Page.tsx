/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, { Fragment } from "react";

import MetaTags from "./MetaTags";
import Header, { ContentHeader } from "./Header";
import AuthBanner from "./AuthBanner";
import Footer from "./Footer";

import styles from "../../styles/modules/page.module.scss";

interface IPage {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Page = ({ children, ...props }: IPage) => {
  return (
    <React.Fragment>
      <MetaTags {...props} />
      <Header>
        <Fragment>
          <AuthBanner />
          <ContentHeader />
        </Fragment>
      </Header>
      <div className={styles.content}>{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default Page;

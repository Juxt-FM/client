/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

interface IMeta {
  title: string;
  description: string;
  image?: string;
}

const MetaTags = ({ title, description, image }: IMeta) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>{`${title} | JUXT`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="title" content={`${title} | JUXT`} key="title" />
        <meta name="description" content={description} key="desc" />

        <meta property="og:type" content="website" key="ogtype" />
        <meta
          property="og:url"
          content={process.env.META_CONTENT_HOST + router.pathname}
          key="ogtype"
        />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta
          property="og:image"
          content={`${process.env.META_CONTENT_HOST}/img/${
            image || "logo.png"
          }`}
          key="ogimg"
        />
        <meta
          property="og:image:secure"
          content={`${process.env.META_CONTENT_HOST}/img/${
            image || "logo.png"
          }`}
          key="ogimgsecure"
        />
        <meta
          property="twitter:url"
          content={process.env.META_CONTENT_HOST + router.pathname}
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:card"
          content={`${process.env.META_CONTENT_HOST}/img/${
            image || "logo.png"
          }`}
          ref="twitter-card"
        />
        <meta
          property="twitter:image"
          content={`${process.env.META_CONTENT_HOST}/img/${
            image || "logo.png"
          }`}
          ref="twitter-image"
        />
      </Head>
    </React.Fragment>
  );
};

export default MetaTags;

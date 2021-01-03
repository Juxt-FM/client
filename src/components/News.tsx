/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { StockNews } from "../graphql";
import _ from "lodash";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "../styles/modules/news.module.scss";

export const LoadingAltListItem = () => (
  <SkeletonTheme color="#f2f2f2" highlightColor="#e2e2e2">
    {_.range(5).map((index) => (
      <div
        className={[styles.altListItem, styles.loading].join(" ")}
        key={String(index)}
      >
        <div className={styles.image} />
        <div className={styles.altContent}>
          <h2>
            <Skeleton width={300} />
          </h2>
          <p>
            <Skeleton count={3} />
          </p>
        </div>
      </div>
    ))}
  </SkeletonTheme>
);

export const NewsArticle = ({ title, text, image, url }: StockNews) => (
  <a
    className={styles.root}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img className={styles.image} src={image} alt="blog post image" />
    <div className={styles.content}>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  </a>
);

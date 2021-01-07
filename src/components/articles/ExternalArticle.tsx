/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { StockNews } from "../../lib/graphql";

import styles from "../../styles/modules/post.module.scss";

export const ListItem = ({ post }: { post: StockNews }) => (
  <li>
    <a
      className={styles.listRoot}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/602543/gettygamer.jpeg&w=2000&op=resize"
        alt="image"
      />
      <h3>{post.title}</h3>
    </a>
  </li>
);

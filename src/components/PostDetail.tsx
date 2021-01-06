import { BlogPost } from "../lib/graphql";
import _ from "lodash";

import styles from "../styles/modules/post-detail.module.scss";

const DetailItem = ({ post }: { post: BlogPost }) => (
  <div className={styles.detailRoot}>
    <div className={styles.header}>
      <img src={post.imageURL} alt="blog post image" />
      <div className={styles.info}>
        <h1>{post.title}</h1>
        <p>{post.subtitle}</p>
      </div>
    </div>
  </div>
);

export default DetailItem;

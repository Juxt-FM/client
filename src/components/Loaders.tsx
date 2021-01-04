/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ClipLoader } from "react-spinners";

import styles from "../styles/modules/loaders.module.scss";

const Loader = () => {};

export const FullLoader = () => (
  <div className={styles.full}>
    <ClipLoader />
  </div>
);

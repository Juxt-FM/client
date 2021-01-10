/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/common/searchbar.module.scss";

interface ISearchbar {
  placeholder: string;
  dark?: boolean;
  navbar?: boolean;
}

const Searchbar = ({
  placeholder,
  dark = false,
  navbar = true,
}: ISearchbar) => {
  const router = useRouter();
  const [active, setActive] = React.useState(false);

  const onFocus = () => {
    setActive(true);
  };

  const onBlur = () => {
    setActive(false);
  };

  return (
    <React.Fragment>
      <div
        className={[
          styles.searchbar,
          dark ? styles.dark : "",
          active ? styles.active : "",
          navbar ? styles.navbar : "",
        ].join(" ")}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </React.Fragment>
  );
};

export default Searchbar;

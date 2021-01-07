/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Link from "next/link";

import styles from "../styles/modules/auth.module.scss";

interface IHeader {
  title: string;
  description?: string;
  color: "black" | "accent";
}

export const Header = ({ title, description, color }: IHeader) => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a>
          <img
            src={require(`../images/logo-${color}-lg.png`)}
            alt="brand logo"
            className={styles.logo}
          />
        </a>
      </Link>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

interface IContentSection {
  title: string;
  content: string;
}

export const ContentSection = ({ title, content }: IContentSection) => (
  <section className={styles.content}>
    <h2>{title}</h2>
    <p>{content}</p>
  </section>
);

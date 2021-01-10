/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useAuthUser } from "../../lib/auth";

import { ProfileImage, ProfileName } from "../users/Profile";
import { Button } from "../common/Buttons";

import styles from "../../styles/ideas/new-idea.module.scss";

interface INewIdea {
  replyTo?: string;
}

const IdeaInput = ({ replyTo }: INewIdea) => (
  <form className={styles.form}>
    <textarea
      className={styles.content}
      name="content"
      id="content"
      placeholder="Say something!"
    />
    <div className={styles.actions}>
      <Button label={replyTo ? "Reply" : "Post"} size="sm" />
    </div>
  </form>
);

const NewIdea = ({ replyTo }: INewIdea) => {
  const { user } = useAuthUser();

  return (
    <div className={styles.root}>
      <div className={styles.userImage}>
        <ProfileImage
          imageURL="https://www.pererasys.com/_next/static/images/logo-primary-6159c5340e68d805f65665a10107a1ed.png"
          size="xl"
        />
      </div>
      <div className={styles.container}>
        <ProfileName name="Andrew Perera" size="md" />
        <IdeaInput replyTo={replyTo} />
      </div>
    </div>
  );
};

export default NewIdea;

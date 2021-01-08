/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import marked from "marked";
import _ from "lodash";

import { BlogPost } from "../../lib/graphql";

import { faShare } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import { List } from "../common/Containers";
import NewIdea from "../ideas/NewIdea";
import Idea from "../ideas/IdeaListItem";

import {
  ProfileImage,
  ProfileLink,
  ProfileName,
} from "../users/ProfileListItem";
import { Button, IconAction } from "../common/Buttons";

import styles from "../../styles/posts/post-detail.module.scss";

import { getMockIdea } from "../../__mocks__/mockData";

/**
 * Converts markdown into HTML content
 *
 * @param markdown
 */
const generateHTML = (markdown: string) =>
  new Promise((resolve, reject) => {
    try {
      resolve(marked(markdown));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });

const Ideas = () => {
  return (
    <List>
      {_.range(3).map((i, index) => (
        <Idea idea={getMockIdea()} key={String(index)} />
      ))}
    </List>
  );
};

interface IPostDate {
  timestamp: string;
}

const PostDate = ({ timestamp }: IPostDate) => (
  <p className={styles.timestamp}>
    {moment(parseInt(timestamp, 10) * 1000).format("MMMM DD, YYYY")}
  </p>
);

interface IImage {
  imageURL: string;
}

const PostImage = ({ imageURL }: IImage) => (
  <img className={styles.image} src={imageURL} alt="blog post image" />
);

interface IContent {
  content?: string;
}

const PostContent = (props: IContent) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/pererasys/juxt/main/README.md")
      .then((res) => res.text())
      .then((content) => {
        generateHTML(content)
          .then((html: string) => {
            console.log(typeof html, html);
            setContent(html);
          })
          .catch((e) => console.log(e));
      });
  }, []);

  return <div className={styles.content}>{parse(content)}</div>;
};

export const Reactions = (props: any) => (
  <div className={styles.reactions}>
    <IconAction icon={faThumbsUp} color="green" onClick={() => {}} />
    <IconAction icon={faThumbsDown} color="orange" onClick={() => {}} />
    <IconAction icon={faHeart} color="red" onClick={() => {}} />
    <IconAction icon={faShare} color="blue" onClick={() => {}} />
  </div>
);

const PostDetail = ({ post }: { post: BlogPost }) => (
  <div className={styles.root}>
    <div className={styles.info}>
      <div className={styles.author}>
        <ProfileLink id="1">
          <ProfileImage
            size="lg"
            imageURL="https://www.pererasys.com/_next/static/images/logo-primary-6159c5340e68d805f65665a10107a1ed.png"
          />
        </ProfileLink>
        <div className={styles.authorInfo}>
          <ProfileLink id="1">
            <ProfileName name="Andrew Perera" size="lg" />
          </ProfileLink>
          <PostDate timestamp={post.createdAt} />
        </div>
        <div className={styles.actions}>
          <Button label="Follow" size="sm" color="purple" />
        </div>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.summary}>{post.subtitle}</p>
    </div>
    <PostImage imageURL={post.imageURL} />
    <PostContent />
    <Reactions />
    <h4>Share your thoughts</h4>
    <div className={styles.ideas}>
      <NewIdea replyTo={post.id} />
      <Ideas />
    </div>
  </div>
);

export default PostDetail;

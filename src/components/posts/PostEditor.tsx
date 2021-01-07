/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React, {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from "react";
import { useRouter } from "next/router";
import { ApolloError, useMutation } from "@apollo/client";
import { MUTATION_UPDATE_POST, BlogPost } from "../../lib/graphql";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../common/Buttons";

import styles from "../../styles/posts/post-editor.module.scss";

const Header = () => {
  const router = useRouter();
  const { state, lastSaved, saving, publishing, onSave, onPublish } = usePost();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <a className={styles.back} onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </a>
        <div>
          <p className={styles.title}>{state.title}</p>
          <p className={styles.updatedStatus}>
            Last saved {moment(parseInt(lastSaved, 10)).fromNow()}
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          size="sm"
          color="purple"
          label="Save"
          loadingLabel="Saving..."
          loading={saving}
          onClick={onSave}
        />
        <Button
          color="darkBlue"
          label="Publish"
          loadingLabel="Publishing..."
          loading={publishing}
          size="sm"
          onClick={onPublish}
        />
      </div>
    </header>
  );
};

const TitleSection = () => {
  const { state, dispatch } = usePost();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: TITLE_CHANGED, payload: e.target.value });
  };

  return (
    <div className={styles.sidebarSection}>
      <label htmlFor="title">
        <h5>Title</h5>
      </label>
      <input
        id="title"
        name="title"
        type="text"
        className={styles.input}
        value={state.title}
        onChange={onTitleChange}
      />
    </div>
  );
};

const SubtitleSection = () => {
  const { state, dispatch } = usePost();

  const onSubtitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: SUBTITLE_CHANGED, payload: e.target.value });
  };

  return (
    <div className={styles.sidebarSection}>
      <label htmlFor="subtitle">
        <h5>Subtitle</h5>
      </label>
      <textarea
        id="subtitle"
        name="subtitle"
        placeholder="Have more to say? Subtitles are a great way to engage users before even they read your post."
        className={styles.subtitle}
        value={state.subtitle}
        onChange={onSubtitleChange}
      />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <TitleSection />
          <hr />
          <SubtitleSection />
        </div>
      </div>
    </div>
  );
};

const Editor = () => {
  const { state, dispatch } = usePost();

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: CONTENT_CHANGED, payload: e.target.value });
  };

  return (
    <div className={styles.editorRoot}>
      <textarea
        name="content"
        id="content"
        placeholder="Share your wisdom with the community!"
        value={state.content}
        className={styles.editor}
        onChange={onContentChange}
      />
    </div>
  );
};

interface IPostContext {
  dispatch: Dispatch<IAction>;
  state: IPostState;
  lastSaved: string;
  saving: boolean;
  publishing: boolean;
  error: ApolloError;
  onSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPublish: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PostContext = createContext<IPostContext | undefined>(undefined);

function usePost() {
  const state = useContext(PostContext);

  return state;
}

const TITLE_CHANGED = "title_changed";

const SUBTITLE_CHANGED = "summary_changed";

const CONTENT_CHANGED = "content_changed";

interface IPostState {
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  symbols: string[];
}

interface IAction {
  type: string;
  payload: string;
}

function formReducer(state: IPostState, action: IAction) {
  switch (action.type) {
    case TITLE_CHANGED:
      return { ...state, title: action.payload };
    case SUBTITLE_CHANGED:
      return { ...state, subtitle: action.payload };
    case CONTENT_CHANGED:
      return { ...state, content: action.payload };
    default:
      return state;
  }
}

interface IPostEditor {
  post: BlogPost;
}

const InAppEditor = ({ post }: IPostEditor) => {
  const getInitialState = () => {
    return {
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      symbols: post.symbols,
      tags: post.tags,
    };
  };

  const [state, dispatch] = useReducer(formReducer, getInitialState());
  const [error, setError] = useState<ApolloError | undefined>(undefined);

  const [savePost, { loading: saving }] = useMutation<{
    updateBlogPost: BlogPost;
  }>(MUTATION_UPDATE_POST, {
    onError: (err) => {
      setError(err);
    },
  });

  const [publishPost, { loading: publishing }] = useMutation<{
    updateBlogPost: BlogPost;
  }>(MUTATION_UPDATE_POST, {
    onError: (err) => {
      setError(err);
    },
  });

  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    savePost({
      variables: {
        id: post.id,
        data: {
          ...state,
          publicationStatus: "draft",
        },
      },
    });
  };

  const onPublish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    publishPost({
      variables: {
        id: post.id,
        data: {
          ...state,
          publicationStatus: "public",
        },
      },
    });
  };

  const context = {
    state,
    dispatch,
    lastSaved: post.updatedAt,
    saving,
    publishing,
    onSave,
    onPublish,
    error,
  };

  return (
    <PostContext.Provider value={context}>
      <div className={styles.root}>
        <Header />
        <div className={styles.content}>
          <Editor />
          <Sidebar />
        </div>
      </div>
    </PostContext.Provider>
  );
};

export default InAppEditor;

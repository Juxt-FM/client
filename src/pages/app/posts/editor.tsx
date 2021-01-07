/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  MUTATION_CREATE_POST,
  BlogPost,
  QUERY_BLOG_POST,
} from "../../../lib/graphql";

import MetaTags from "../../../components/navigation/MetaTags";
import { FullLoader } from "../../../components/common/Loaders";

import PostEditor from "../../../components/posts/PostEditor";

interface INewPost {
  title: string;
  subtitle: string;
  content: string;
  symbols: string[];
  tags: string[];
}

const DEFAULT_POST: INewPost = {
  title: "Untitled",
  subtitle: "",
  content: "",
  symbols: [],
  tags: [],
};

export default function InAppEditor() {
  const router = useRouter();

  const { post } = router.query;

  const redirect = () => {
    router.push("/");
  };

  const [createPost, { data: created, loading: creating }] = useMutation<{
    createBlogPost: BlogPost;
  }>(MUTATION_CREATE_POST, {
    onCompleted: ({ createBlogPost }) => {
      router.replace({
        pathname: "/posts/editor",
        query: { post: createBlogPost.id },
      });
    },
    onError: redirect,
  });

  const [fetchPost, { data: fetched, loading: fetching }] = useLazyQuery<{
    singleBlogPost: BlogPost;
  }>(QUERY_BLOG_POST, {
    onError: redirect,
  });

  useEffect(() => {
    if (post) fetchPost({ variables: { id: post } });
    else createPost({ variables: { data: DEFAULT_POST } });
  }, []);

  const renderEditor = () => {
    if (fetched) return <PostEditor post={fetched.singleBlogPost} />;
    else if (created) return <PostEditor post={created.createBlogPost} />;
    else if (fetching || creating) return <FullLoader />;
    else return null;
  };

  let title = "Post Editor";

  if (fetched) title = fetched.singleBlogPost.title;
  else if (created) title = created.createBlogPost.title;

  return (
    <div>
      <MetaTags
        title={title}
        description="Create and edit blog posts with our in-app editor!"
      />
      {renderEditor()}
    </div>
  );
}

export function getServerSideProps({ req }: any) {
  const getAuthStatus = () => {
    let { cookie } = req.headers;

    if (!cookie) return false;
    else {
      cookie = cookie
        .split(";")
        .find((c: string) => c.trim().startsWith("logged_in="));

      if (!cookie) return false;
      return true;
    }
  };

  const loggedIn = getAuthStatus();

  if (loggedIn)
    return {
      props: {},
    };
  else
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
}

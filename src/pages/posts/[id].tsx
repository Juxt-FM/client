/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { BlogPost, QUERY_BLOG_POST } from "../../lib/graphql";

import Page from "../../components/navigation/Page";
import PostDetail from "../../components/posts/PostDetail";

import { getMockPost } from "../../__mocks__/mockData";

export default function SinglePost() {
  const router = useRouter();
  const { id } = router.query;
  /*
  const { data, loading } = useQuery<{ singleBlogPost: BlogPost }>(
    QUERY_BLOG_POST,
    {
      variables: { id },
    }
  );
  */
  const data = getMockPost();

  if (data) {
    //const { singleBlogPost: post } = data;
    return (
      <Page title="Post" description="Check out this blog post!" backButton>
        <PostDetail post={data} />
      </Page>
    );
  }
  return null;
}

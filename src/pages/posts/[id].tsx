/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { BlogPost, QUERY_BLOG_POST } from "../../graphql";

import Page from "../../components/common/Page";
import { DetailItem } from "../../components/BlogPosts";

export default function SinglePost() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery<{ singleBlogPost: BlogPost }>(
    QUERY_BLOG_POST,
    {
      variables: { id },
    }
  );

  if (data) {
    const { singleBlogPost: post } = data;
    return (
      <Page title="Blog post" description="Check out this blog post!">
        <DetailItem post={post} />
      </Page>
    );
  }
  return null;
}

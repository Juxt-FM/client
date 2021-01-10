/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Page from "../../components/navigation/Page";

import {
  BlogPosts,
  Ideas,
  Suggested,
  Trending,
} from "../../components/pages/Latest";

import HighlightedContent, {
  HighlightedSection,
} from "../../components/common/HighlightedContent";

const RightContent = () => (
  <HighlightedContent>
    <HighlightedSection title="Trending">
      <Trending />
    </HighlightedSection>
    <HighlightedSection title="Suggested">
      <Suggested />
    </HighlightedSection>
  </HighlightedContent>
);

export default function LatestContentPage() {
  return (
    <Page
      title="Latest"
      description="The latest posts, ideas, and market updates."
      ExtraContentComponent={RightContent}
    >
      <BlogPosts />
      <hr />
      <Ideas />
    </Page>
  );
}

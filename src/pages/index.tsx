/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Page from "../components/Page";
import Latest from "../components/Latest";
import HighlightedContent from "../components/HighlightedContent";

export default function LatestContentPage() {
  return (
    <Page
      title="Latest"
      description="The latest posts, ideas, and market updates."
      extraContent={<HighlightedContent />}
    >
      <Latest />
    </Page>
  );
}

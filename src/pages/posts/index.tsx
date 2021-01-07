/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Page from "../../components/Page";
import HighlightedContent from "../../components/HighlightedContent";

export default function LatestContentPage() {
  return (
    <Page
      title="Posts"
      description="Check out the lastest blog posts on JUXT."
      extraContent={<HighlightedContent />}
    >
      <div></div>
    </Page>
  );
}

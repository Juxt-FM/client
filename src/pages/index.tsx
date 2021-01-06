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
      description="Welcome to Hedger!"
      extraContent={<HighlightedContent />}
    >
      <Latest />
    </Page>
  );
}

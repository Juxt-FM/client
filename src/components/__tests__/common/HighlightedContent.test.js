/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import HighlightedContent, {
  HighlightedSection,
} from "../../common/HighlightedContent";

describe("<HighlightedContent />", () => {
  it("should render children", () => {
    const component = create(
      <HighlightedContent>
        <div id="content">hello</div>
      </HighlightedContent>
    );

    const content = component.root.findByProps({ id: "content" });

    expect(content.children).toContain("hello");
  });
});

describe("<HighlightedSection />", () => {
  it("should render content appropriately", () => {
    const component = create(
      <HighlightedSection title="Test Title">
        <div id="content">hello</div>
      </HighlightedSection>
    );

    const tree = component.toJSON();

    const content = component.root.findByProps({ id: "content" });

    expect(content.children).toContain("hello");

    expect(tree).toMatchSnapshot();
  });
});

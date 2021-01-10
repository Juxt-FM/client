/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import { Column, List, Row, Section } from "../../common/Containers";

describe("<Section />", () => {
  it("should show children", () => {
    const component = create(<Section>hello</Section>);

    const tree = component.toJSON();

    expect(tree.children).toContain("hello");
  });
});

describe("<Column />", () => {
  it("should show children", () => {
    const component = create(<Column>hello</Column>);

    const tree = component.toJSON();

    expect(tree.children).toContain("hello");
  });
});

describe("<Row />", () => {
  it("should show children", () => {
    const component = create(<Row>hello</Row>);

    const tree = component.toJSON();

    expect(tree.children).toContain("hello");
  });
});

describe("<List />", () => {
  it("should show children", () => {
    const component = create(<List>hello</List>);

    const tree = component.toJSON();

    expect(tree.children).toContain("hello");
  });
});

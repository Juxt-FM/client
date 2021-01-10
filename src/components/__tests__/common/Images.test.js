/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import { Thumbnail } from "../../common/Images";

describe("<Thumbnail />", () => {
  const testSource = "test_source";
  const setup = (props) => {
    const component = create(<Thumbnail src={testSource} {...props} />);

    return { component };
  };

  it("should render image", () => {
    const { component } = setup({ size: "md" });

    const loader = component.root.findAllByType("div");
    const images = component.root.findAllByType("img");

    expect(loader.length).toEqual(0);
    expect(images.length).toEqual(1);
  });

  it("should render loader", () => {
    const { component } = setup({ size: "md", showLoader: true });

    const loader = component.root.findAllByType("div");
    const images = component.root.findAllByType("img");

    expect(loader.length).toEqual(1);
    expect(images.length).toEqual(0);
  });
});

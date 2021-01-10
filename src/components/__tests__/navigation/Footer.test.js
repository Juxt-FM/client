/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import Footer from "../../navigation/Footer";

describe("<Footer />", () => {
  const setup = () => {
    const component = create(<Footer />);

    const footer = component.root.findByType("footer");

    return { footer, component };
  };

  it("should have correct path", () => {
    const { footer } = setup();

    expect(footer.children).toContain("footer");
  });
});

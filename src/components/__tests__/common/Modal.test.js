/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";

import Modal from "../../common/Modal";

import { useClickAwayAction } from "../../../lib/ui";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

jest.mock("body-scroll-lock");
jest.mock("../../../lib/ui");

describe("<Modal />", () => {
  const setup = (props) => {
    const renderAnchor = (onOpen, isOpen) => (
      <a onClick={onOpen}>{isOpen ? "Clicked" : "Click Me"}</a>
    );

    const component = create(
      <Modal renderAnchor={renderAnchor} {...props}>
        <div id="content">modal content</div>
      </Modal>
    );

    const anchor = component.root.findByType("a");

    return {
      anchor,
      component,
    };
  };

  it("should initialize a click away action", () => {
    setup();

    expect(useClickAwayAction).toBeCalled();
  });

  it("should lock and unlock scrolling", () => {
    const { anchor, component } = setup();

    expect(useClickAwayAction).toBeCalled();

    act(anchor.props.onClick);

    expect(disableBodyScroll).toBeCalled();

    component.unmount();

    expect(enableBodyScroll).toBeCalled();
  });

  it("should be disabled", () => {
    const { anchor } = setup({ disabled: true });

    expect(anchor.children).toContain("Click Me");

    act(anchor.props.onClick);

    expect(anchor.children).toContain("Click Me");
  });

  it("should show content", () => {
    const { anchor, component } = setup();

    act(anchor.props.onClick);

    const content = component.root.findByProps({ id: "content" });

    expect(anchor.children).toContain("Clicked");
    expect(content.children).toContain("modal content");
  });
});

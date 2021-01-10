/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Dropdown, { DropdownList, DropdownOption } from "../../common/Dropdown";

jest.mock("../../../lib/ui");

describe("<Dropdown />", () => {
  const setup = (props) => {
    const renderAnchor = (onOpen, isOpen) => (
      <a onClick={onOpen}>{isOpen ? "Clicked" : "Click Me"}</a>
    );

    const component = create(
      <Dropdown renderAnchor={renderAnchor} {...props}>
        <div id="content">dropdown content</div>
      </Dropdown>
    );

    const anchor = component.root.findByType("a");

    return {
      anchor,
      component,
    };
  };

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
    expect(content.children).toContain("dropdown content");
  });
});

describe("<DropdownList />", () => {
  const setup = ({ children }) => {
    const renderAnchor = (onOpen) => <a onClick={onOpen}>open</a>;

    const component = create(
      <Dropdown renderAnchor={renderAnchor}>{children}</Dropdown>
    );

    const anchor = component.root.findByType("a");

    return {
      anchor,
      component,
    };
  };

  it("should show option with icon", () => {
    const onClick = jest.fn();

    const children = (
      <DropdownList options={[{ label: "test", icon: faPlus, onClick }]} />
    );

    const { anchor, component } = setup({ children });

    act(anchor.props.onClick);

    const list = component.root.findByType(DropdownList);

    expect(list.children.length).toEqual(1);

    const icons = component.root.findAllByType(FontAwesomeIcon);

    const option = component.root.findByType(DropdownOption);

    expect(icons.length).toEqual(1);
    expect(option.props.label).toEqual("test");

    act(option.props.onClick);

    expect(onClick).toBeCalled();
  });

  it("should show option without icon", () => {
    const onClick = jest.fn();

    const children = <DropdownList options={[{ label: "test", onClick }]} />;

    const { anchor, component } = setup({ children });

    act(anchor.props.onClick);

    const list = component.root.findByType(DropdownList);
    const icons = component.root.findAllByType(FontAwesomeIcon);

    expect(icons.length).toEqual(0);
    expect(list.children.length).toEqual(1);
  });

  it("should show option with router link", () => {
    const option = { label: "test", path: "/" };

    const children = <DropdownList options={[option]} />;

    const { anchor, component } = setup({ children });

    act(anchor.props.onClick);

    const link = component.root.findByType(Link);

    expect(link.props.href).toEqual(option.path);
  });
});

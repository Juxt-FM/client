/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  ButtonOutline,
  IconAction,
  IconButton,
} from "../common/Buttons";
import { Column, List, Row, Section } from "../common/Containers";
import Dropdown, { DropdownList, DropdownOption } from "../common/Dropdown";
import HighlightedContent, {
  HighlightedSection,
} from "../common/HighlightedContent";
import { Thumbnail } from "../common/Images";
import { FormInput } from "../common/Inputs";
import Modal from "../common/Modal";

import { useClickAwayAction } from "../../lib/context";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import TabBar from "../common/TabBar";

jest.mock("body-scroll-lock");
jest.mock("../../lib/context");

describe("<Button />", () => {
  const setup = (props) => {
    const component = create(<Button {...props} />);

    const button = component.root.findByType("button");

    return {
      button,
      component,
    };
  };

  it("should show default state", () => {
    const props = { label: "Test", loadingLabel: "Loading", loading: false };
    const { button, component } = setup(props);

    const tree = component.toJSON();
    expect(tree.children).toContain(props.label);
    expect(button.props.disabled).toEqual(false);
  });

  it("should show loading state", () => {
    const props = { label: "Test", loadingLabel: "Loading", loading: true };
    const { button, component } = setup(props);

    const tree = component.toJSON();
    expect(tree.children).toContain(props.loadingLabel);
    expect(button.props.disabled).toEqual(true);
  });

  it("should increment counter", () => {
    let counter = 0;

    const onClick = () => {
      counter += 1;
    };

    const props = { label: "Test", loadingLabel: "Loading", onClick };

    const { button } = setup(props);

    button.props.onClick();

    expect(counter).toEqual(1);
  });
});

describe("<ButtonOutline />", () => {
  const setup = (props) => {
    const component = create(<ButtonOutline {...props} />);

    const button = component.root.findByType("button");

    return {
      button,
      component,
    };
  };

  it("should show default state", () => {
    const props = { label: "Test", loadingLabel: "Loading", loading: false };
    const { button, component } = setup(props);

    const tree = component.toJSON();
    expect(tree.children).toContain(props.label);
    expect(button.props.disabled).toEqual(false);
  });

  it("should show loading state", () => {
    const props = { label: "Test", loadingLabel: "Loading", loading: true };
    const { button, component } = setup(props);

    const tree = component.toJSON();
    expect(tree.children).toContain(props.loadingLabel);
    expect(button.props.disabled).toEqual(true);
  });

  it("should increment counter", () => {
    let counter = 0;

    const onClick = () => {
      counter += 1;
    };

    const props = { label: "Test", loadingLabel: "Loading", onClick };

    const { button } = setup(props);

    button.props.onClick();

    expect(counter).toEqual(1);
  });
});

describe("<IconAction />", () => {
  const setup = (props) => {
    const component = create(<IconAction icon={faPlus} {...props} />);

    const button = component.root.findByType("a");

    return {
      button,
      component,
    };
  };

  it("should increment counter", () => {
    let counter = 0;

    const onClick = () => {
      counter += 1;
    };

    const props = { onClick };

    const { button } = setup(props);

    button.props.onClick();

    expect(counter).toEqual(1);
  });
});

describe("<IconButton />", () => {
  const setup = (props) => {
    const component = create(<IconButton icon={faPlus} {...props} />);

    const button = component.root.findByType("a");

    return {
      button,
      component,
    };
  };

  it("should increment counter", () => {
    let counter = 0;

    const onClick = () => {
      counter += 1;
    };

    const props = { onClick };

    const { button } = setup(props);

    button.props.onClick();

    expect(counter).toEqual(1);
  });
});

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

describe("<FormInput />", () => {
  const rootProps = {
    name: "name",
    label: "Name",
  };

  const setup = (props) => {
    const component = create(<FormInput {...rootProps} {...props} />);

    const label = component.root.findByType("label");
    const input = component.root.findByType("input");

    return { input, label, component };
  };

  it("should show label", () => {
    const { input, label } = setup();

    expect(input.props.placeholder).toEqual(rootProps.label);
    expect(label.children).toContain(rootProps.label);
  });

  it("should update text", () => {
    let text = "";
    const newString = "Hello!";

    const onChange = (e) => {
      text = e.target.value;
    };

    const { input } = setup({ onChange });

    act(() => {
      input.props.onChange({ target: { value: newString } });
    });

    expect(text).toEqual(newString);
  });

  it("should show error", () => {
    const errorMsg = "test error";

    const { component } = setup({ error: errorMsg });

    const error = component.root.findByType("p");

    expect(error.children).toContain(errorMsg);
  });
});

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

describe("<TabBar />", () => {
  const setup = (tabs) => {
    const component = create(<TabBar tabs={tabs} />);

    const tabbar = component.root.findByType("div");

    return {
      tabbar,
      component,
    };
  };

  it("should display tabs", () => {
    const home = { path: "/home", label: "Home", active: true };
    const account = { path: "/account", label: "Account", active: false };
    const tabs = [home, account];

    const { component } = setup(tabs);

    const homeTab = component.root.findByProps({ label: "Home" });
    const homeLink = component.root.findByProps({ href: home.path });

    const accountTab = component.root.findByProps({ label: "Account" });
    const accountLink = component.root.findByProps({ href: account.path });

    expect(homeTab.props.path).toEqual(home.path);
    expect(homeTab.props.label).toEqual(home.label);
    expect(homeTab.props.active).toEqual(home.active);

    expect(accountTab.props.path).toEqual(account.path);
    expect(accountTab.props.label).toEqual(account.label);
    expect(accountTab.props.active).toEqual(account.active);

    expect(accountLink.type).toEqual(Link);
    expect(homeLink.type).toEqual(Link);
  });
});

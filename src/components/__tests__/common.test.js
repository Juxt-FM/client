/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

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
import Link from "next/link";
import HighlightedContent, {
  HighlightedSection,
} from "../common/HighlightedContent";
import { Thumbnail } from "../common/Images";
import { FormInput } from "../common/Inputs";

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
  const setup = () => {
    const renderAnchor = (onOpen, isOpen) => (
      <a onClick={onOpen}>{isOpen ? "Clicked" : "Click Me"}</a>
    );
    const renderContent = () => <div id="content">dropdown content</div>;

    const component = create(
      <Dropdown anchor={renderAnchor} content={renderContent} />
    );

    const anchor = component.root.findByType("a");

    return {
      anchor,
      component,
    };
  };

  it("should behave to clicks", () => {
    const { anchor, component } = setup();

    expect(anchor.children).toContain("Click Me");

    act(anchor.props.onClick);

    const content = component.root.findByProps({ id: "content" });

    expect(anchor.children).toContain("Clicked");
    expect(content.children).toContain("dropdown content");
  });
});

describe("<DropdownList />", () => {
  const setup = (renderContent) => {
    const renderAnchor = (onOpen) => <a onClick={onOpen}>open</a>;

    const component = create(
      <Dropdown anchor={renderAnchor} content={renderContent} />
    );

    const anchor = component.root.findByType("a");

    return {
      anchor,
      component,
    };
  };

  it("should show option with icon", () => {
    const onClick = jest.fn();

    const renderContent = () => (
      <DropdownList options={[{ label: "test", icon: faPlus, onClick }]} />
    );

    const { anchor, component } = setup(renderContent);

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

    const renderContent = () => (
      <DropdownList options={[{ label: "test", onClick }]} />
    );

    const { anchor, component } = setup(renderContent);

    act(anchor.props.onClick);

    const list = component.root.findByType(DropdownList);
    const icons = component.root.findAllByType(FontAwesomeIcon);

    expect(icons.length).toEqual(0);
    expect(list.children.length).toEqual(1);
  });

  it("should show option with router link", () => {
    const option = { label: "test", path: "/" };

    const renderContent = () => <DropdownList options={[option]} />;

    const { anchor, component } = setup(renderContent);

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

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  ButtonOutline,
  IconAction,
  IconButton,
} from "../../common/Buttons";

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

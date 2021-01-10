/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";

import { FormInput } from "../../common/Inputs";

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

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import { useAuthStatus } from "../../../lib/auth";
import { useRouter } from "next/router";
import Menu, { ContentActions } from "../../navigation/Menu";

jest.mock("../../../lib/auth");
jest.mock("next/router");

const push = jest.fn();
const pathname = "/";

useRouter.mockImplementation(() => ({ push, pathname }));

describe("<Menu />", () => {
  const setup = () => {
    const component = create(<Menu />);

    return { component };
  };

  it("should render for logged in user without crashing", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const { component } = setup();

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render for unauthenticated user without crashing", () => {
    useAuthStatus.mockImplementationOnce(() => undefined);

    const { component } = setup();

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render content actions for logged in user", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const { component } = setup();

    const actions = component.root.findAllByType(ContentActions);

    expect(actions.length).toEqual(1);
  });

  it("should not render content actions for unauthenticated user", () => {
    useAuthStatus.mockImplementationOnce(() => undefined);

    const { component } = setup();

    const actions = component.root.findAllByType(ContentActions);

    expect(actions.length).toEqual(0);
  });
});

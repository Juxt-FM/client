/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import Header, {
  AccountDropdown,
  BackButton,
  SettingsDropdown,
} from "../../navigation/Header";

import { useAuthStatus, useAuthUser } from "../../../lib/auth";
import { getMockUser } from "../../../__mocks__/mockData";
import { useRouter } from "next/router";

jest.mock("../../../lib/auth");
jest.mock("next/router");

useAuthUser.mockImplementation(() => ({
  user: getMockUser(),
  loading: false,
  error: undefined,
}));

const push = jest.fn();
const pathname = "/";

useRouter.mockImplementation(() => ({ push, pathname }));

describe("<Header />", () => {
  const setup = (props) => {
    const component = create(<Header {...props} />);

    return { component };
  };

  it("should render for logged in user without crashing", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const props = {
      backButton: false,
      title: "Test Title",
    };

    const { component } = setup(props);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render for unauthenticated user without crashing", () => {
    useAuthStatus.mockImplementationOnce(() => undefined);

    const props = {
      backButton: false,
      title: "Test Title",
    };

    const { component } = setup(props);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render page info correctly", () => {
    const props = {
      backButton: true,
      title: "Test Title",
    };

    const { component } = setup(props);

    const backBtn = component.root.findAllByType(BackButton);
    const title = component.root.findByType("h3");

    expect(title.children).toContain(props.title);
    expect(backBtn.length).toEqual(1);
  });

  it("should render navigation for logged in user", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const props = {
      backButton: false,
      title: "Test Title",
    };

    const { component } = setup(props);

    const settings = component.root.findAllByType(SettingsDropdown);
    const account = component.root.findAllByType(AccountDropdown);

    expect(settings.length).toEqual(1);
    expect(account.length).toEqual(1);
  });

  it("should render navigation for unauthenticated user", () => {
    useAuthStatus.mockImplementationOnce(() => undefined);

    const props = {
      backButton: false,
      title: "Test Title",
    };

    const { component } = setup(props);

    const account = component.root.findAllByType(AccountDropdown);

    expect(account.length).toEqual(0);
  });
});

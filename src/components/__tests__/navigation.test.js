/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import Header, {
  AccountDropdown,
  BackButton,
  SettingsDropdown,
} from "../navigation/Header";
import Footer from "../navigation/Footer";

import { useAuthStatus, useAuthUser } from "../../lib/auth";
import { getMockUser } from "../../__mocks__/mockData";
import { useRouter } from "next/router";
import Menu, { ContentActions } from "../navigation/Menu";
import Page from "../navigation/Page";

jest.mock("../../lib/auth");
jest.mock("next/router");

useAuthUser.mockImplementation(() => ({
  user: getMockUser(),
  loading: false,
  error: undefined,
}));

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
    const push = jest.fn();

    useAuthStatus.mockImplementationOnce(() => undefined);
    useRouter.mockImplementationOnce(() => ({ push }));

    const props = {
      backButton: false,
      title: "Test Title",
    };

    const { component } = setup(props);

    const account = component.root.findAllByType(AccountDropdown);
    const signupBtn = component.root.findByProps({ label: "Get started" });

    expect(account.length).toEqual(0);

    signupBtn.props.onClick();

    expect(push).toBeCalledWith("/auth/signup");
  });
});

describe("<Menu />", () => {
  const push = jest.fn();
  const pathname = "/";

  useRouter.mockImplementation(() => ({ push, pathname }));

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

describe("<Page />", () => {
  const setup = (props) => {
    const component = create(
      <Page {...props}>
        <div id="content">Page content</div>
      </Page>
    );

    return { component };
  };

  it("should render without crashing", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const { component } = setup({
      title: "Page Title",
      description: "This page is a test.",
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});

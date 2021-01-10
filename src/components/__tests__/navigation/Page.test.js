/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import { useRouter } from "next/router";
import { useAuthStatus, useAuthUser } from "../../../lib/auth";
import { getMockUser } from "../../../__mocks__/mockData";
import Page from "../../navigation/Page";

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

describe("<Page />", () => {
  const setup = (props) => {
    const component = create(
      <Page {...props}>
        <div id="content">Page content</div>
      </Page>
    );

    return { component };
  };

  const Extras = () => <div id="extra-content">content body</div>;
  const AltMenu = () => <div id="alt-menu">menu body</div>;

  it("should render without crashing", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const { component } = setup({
      title: "Page Title",
      description: "This page is a test.",
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render ExtraContentComponent", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const { component } = setup({
      title: "Page Title",
      description: "This page is a test.",
      ExtraContentComponent: Extras,
    });

    const extras = component.root.findByProps({ id: "extra-content" });

    expect(extras.children).toContain("content body");
  });

  it("should render alternative menu component", () => {
    useAuthStatus.mockImplementationOnce(() => "1");

    const { component } = setup({
      title: "Page Title",
      description: "This page is a test.",
      MenuComponent: AltMenu,
    });

    const menu = component.root.findByProps({ id: "alt-menu" });

    expect(menu.children).toContain("menu body");
  });
});

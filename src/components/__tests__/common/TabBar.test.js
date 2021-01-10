/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import Link from "next/link";
import TabBar from "../../common/TabBar";

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

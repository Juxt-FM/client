/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Page from "../../components/Page";
import { TabNavigator } from "../../components/Settings";

export default function PrivacySettings() {
  return (
    <Page title="Privacy" description="Update your account's privacy settings.">
      <TabNavigator />
    </Page>
  );
}

export function getServerSideProps({ req }: any) {
  const getAuthStatus = () => {
    let { cookie } = req.headers;

    if (!cookie) return false;
    else {
      cookie = cookie
        .split(";")
        .find((c: string) => c.trim().startsWith("logged_in="));

      if (!cookie) return false;

      return cookie.split("=")[1] === "true";
    }
  };

  const loggedIn = getAuthStatus();
  if (loggedIn)
    return {
      props: {},
    };
  else
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
}

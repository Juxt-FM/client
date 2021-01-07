/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Page from "../../../components/navigation/Page";
import TabBar from "../../../components/common/TabBar";

const tabs = [
  { label: "Account", path: `/settings/account`, active: false },
  { label: "Privacy", path: `/settings/privacy`, active: true },
];

export default function PrivacySettings() {
  return (
    <Page
      title="Privacy Settings"
      description="Update your account's privacy settings."
    >
      <TabBar tabs={tabs} />
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
      return true;
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

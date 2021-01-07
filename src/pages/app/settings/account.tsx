/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Page from "../../../components/navigation/Page";
import TabBar from "../../../components/common/TabBar";

const tabs = [
  { label: "Account", path: `/settings/account`, active: true },
  { label: "Privacy", path: `/settings/privacy`, active: false },
];

export default function AccountSettings() {
  return (
    <Page
      title="Account Settings"
      description="Update account's information and more."
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

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Page from "../../../components/navigation/Page";
import TabBar from "../../../components/common/TabBar";

const tabs = [
  { label: "Account", path: `/app/settings/account`, active: false },
  { label: "Privacy", path: `/app/settings/privacy`, active: true },
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

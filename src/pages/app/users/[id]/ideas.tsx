/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  initializeApollo,
  addApolloState,
  UserProfile,
  QUERY_USER_PROFILE,
} from "../../../../lib/graphql";

import Page from "../../../../components/navigation/Page";
import ProfileRoot from "../../../../components/pages/User";
import Ideas from "../../../../components/users/Ideas";

import HighlightedContent, {
  HighlightedSection,
} from "../../../../components/common/HighlightedContent";

import { Button } from "../../../../components/common/Buttons";

const RightContent = () => (
  <HighlightedContent>
    <HighlightedSection title="Suggested">
      <div></div>
    </HighlightedSection>
    <HighlightedSection title="Trending">
      <div></div>
    </HighlightedSection>
    <Button label="Follow" />
  </HighlightedContent>
);

interface IUserProfileQuery {
  userProfile: UserProfile;
}

const UserProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery<IUserProfileQuery>(QUERY_USER_PROFILE, {
    variables: { id },
  });

  return (
    <Page
      title={`${data.userProfile.name || "Users"}`}
      description={
        data
          ? `Check out ${data.userProfile.name} on Hedger.`
          : "User profiles."
      }
      ExtraContentComponent={RightContent}
      backButton
    >
      <ProfileRoot Component={Ideas} profile={data.userProfile} />
    </Page>
  );
};

export async function getServerSideProps({ params }: any) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY_USER_PROFILE,
    variables: params,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default UserProfilePage;

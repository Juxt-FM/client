/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_LOGOUT } from "../../lib/apollo";
import { useAuthActions } from "../../lib/context";

import MetaTags from "../../components/common/MetaTags";
import { FullLoader } from "../../components/Loaders";

export default function Logout() {
  const { onLogout } = useAuthActions();

  const [logout] = useMutation(MUTATION_LOGOUT, {
    onCompleted: onLogout,
  });

  useEffect(() => {
    logout();
  }, []);

  return (
    <Fragment>
      <MetaTags title="Logout" description="Log out of your account." />
      <FullLoader />
    </Fragment>
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

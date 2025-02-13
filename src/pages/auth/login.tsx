/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import MetaTags from "../../components/navigation/MetaTags";

import Login from "../../components/auth/Login";

function LoginPage() {
  return (
    <div>
      <MetaTags title="Login" description="Log into your account." />
      <Login />
    </div>
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

  if (!loggedIn)
    return {
      props: {},
    };
  else
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
}

export default LoginPage;

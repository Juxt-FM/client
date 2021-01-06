/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Signup from "../../components/Signup";
import MetaTags from "../../components/MetaTags";

export default function SignupPage() {
  return (
    <div>
      <MetaTags
        title="Sign up"
        description="Gain access to real-time analysis and unlimited blog activity."
      />
      <Signup />
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
        destination: "/",
        permanent: false,
      },
    };
}

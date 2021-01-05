/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { connect } from "react-redux";

import {
  ITokenState,
  refreshToken,
  selectTokenInfo,
  fetchUserFail,
  fetchUserSuccess,
  fetchUser,
} from "../../redux";

import { User, QUERY_AUTH_USER } from "../../apollo";

import { useAuthStatus } from "./hooks";

interface IProvider {
  children: JSX.Element;
}

interface IAuthProvider extends IProvider {
  token: ITokenState;
  refreshToken: typeof refreshToken;
}

/**
 * Responsible for refreshing a user token when first
 * entering the site, and continuously refreshing every
 * 14:45 minutes (tokens expire in 15min)
 *
 * @param children A JSX Element
 * @returns {JSX.Element}
 */
export const AuthenticationProvider = ({
  children,
  token,
  refreshToken,
}: IAuthProvider) => {
  const loggedIn = useAuthStatus();

  useEffect(() => {
    if (loggedIn) refreshToken();
  }, []);

  /**
   * Refresh the user's token every 14:45 minutes.
   * need to make sure the token info is actually new
   */
  useEffect(() => {
    if (token) {
      const timeout = token.expires.getTime() - token.issued.getTime() - 15000;

      // eslint-disable-next-line no-console
      console.log(`Refreshing token in ${timeout / 1000 / 60} minutes`);

      setTimeout(refreshToken, timeout);
    }
  }, [token]);

  return children;
};

export const AuthProvider = connect(selectTokenInfo, { refreshToken })(
  AuthenticationProvider
);

interface IUserProvider extends IProvider {
  fetchUser: typeof fetchUser;
  fetchUserSuccess: typeof fetchUserSuccess;
  fetchUserFail: typeof fetchUserFail;
}

/**
 * Ensures that only one request for the authenticated
 * user from the backend goes through at once.
 *
 * @param children A JSX Element
 * @returns {JSX.Element}
 */
export const AuthenticatedUserProvider = ({
  children,
  fetchUser,
  fetchUserFail,
  fetchUserSuccess,
}: IUserProvider) => {
  const loggedIn = useAuthStatus();

  const [queryUser, { data, called }] = useLazyQuery<{
    me: User;
  }>(QUERY_AUTH_USER, {
    onError: (err) => {
      fetchUserFail(err);
    },
  });

  useEffect(() => {
    if (loggedIn) queryUser();
  }, [loggedIn]);

  useEffect(() => {
    if (called) fetchUser();
  }, [called]);

  useEffect(() => {
    if (data) fetchUserSuccess(data.me);
  }, [data]);

  return children;
};

export const UserProvider = connect(null, {
  fetchUser,
  fetchUserSuccess,
  fetchUserFail,
})(AuthenticatedUserProvider);

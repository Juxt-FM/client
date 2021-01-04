/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useEffect } from "react";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

import {
  FETCH_USER,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_TOKEN,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_SUCCESS,
  RootState,
} from "../store";

import {
  QUERY_AUTH_USER,
  MUTATION_REFRESH_TOKEN,
  User,
  setAccessToken,
  lockApollo,
  unlockApollo,
  createApolloClient,
  AuthCredentials,
} from "../graphql";
import { usePreviousValue } from "./utils";
import { useRouter } from "next/router";

const cookies = new Cookies();

const buildTokenInfo = (token: string) => {
  const decoded: any = jwt_decode(token);
  return {
    expires: decoded.exp,
    issued: decoded.iat,
  };
};

const refreshToken = () => {
  const client = createApolloClient({ standalone: true });

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await client.mutate({
        mutation: MUTATION_REFRESH_TOKEN,
      });
      if (data) {
        resolve(data.refreshToken);
      } else {
        reject(new Error());
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Returns whether or not the user is logged in
export const useAuthStatus = () => cookies.get("logged_in") === "true";

interface IProvider {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: IProvider): JSX.Element => {
  const loggedIn = useAuthStatus();
  const { onLogout } = useAuthActions();

  const { token } = useSelector((state: RootState) => state.auth);

  const prevToken = usePreviousValue(token);

  const dispatch = useDispatch();

  const onRefreshTokenSuccess = ({ accessToken }: AuthCredentials) => {
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: buildTokenInfo(accessToken),
    });

    setAccessToken(accessToken);
    unlockApollo();
  };

  const onRefreshTokenFailed = () => {
    dispatch({ type: REFRESH_TOKEN_FAIL });

    unlockApollo();

    onLogout(false);
  };

  const refresh = () => {
    lockApollo();
    dispatch({ type: REFRESH_TOKEN });
    refreshToken().then(onRefreshTokenSuccess).catch(onRefreshTokenFailed);
  };

  useEffect(() => {
    if (loggedIn) refresh();
  }, []);

  /**
   * Refresh the user's token every 14:45 minutes.
   * need to make sure the token info is actually new
   */
  useEffect(() => {
    if (token && token !== prevToken) {
      const timeout = token.expires * 1000 - token.issued * 1000 - 15000;

      // tslint:disable-next-line:no-console
      console.log(`Refreshing token in ${timeout / 1000 / 60} minutes`);

      setTimeout(refresh, timeout);
    }
  }, [token]);

  return children;
};

export function useAuthActions() {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const router = useRouter();

  const onLogin = (accessToken: string) => {
    dispatch({ type: LOGIN_USER, payload: buildTokenInfo(accessToken) });

    cookies.set("logged_in", "true", { path: "/" });
    setAccessToken(accessToken);

    client.clearStore().then(() => router.push("/"));
  };

  const onLogout = (redirectToLogin = true) => {
    dispatch({ type: LOGOUT_USER });

    setAccessToken(undefined);
    cookies.set("logged_in", undefined, { path: "/", expires: new Date() });

    client.clearStore().then(() => {
      if (redirectToLogin) router.push("/auth/login");
    });
  };

  return {
    onLogin,
    onLogout,
  };
}

export const UserProvider = ({ children }: IProvider) => {
  const loggedIn = useAuthStatus();

  const dispatch = useDispatch();

  const [fetchUser, { data, called }] = useLazyQuery<{
    me: User;
  }>(QUERY_AUTH_USER, {
    onError: (err) => {
      dispatch({ type: FETCH_USER_FAIL, payload: err });
    },
  });

  useEffect(() => {
    if (loggedIn) fetchUser();
  }, [loggedIn]);

  useEffect(() => {
    if (called) dispatch({ type: FETCH_USER });
  }, [called]);

  useEffect(() => {
    if (data) {
      dispatch({ type: FETCH_USER_SUCCESS, payload: data.me });
    }
  }, [data]);

  return children;
};

export const useAuthUser = () =>
  useSelector((state: RootState) => state.auth.user);

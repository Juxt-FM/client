/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { loginUser, logoutUser, selectAuthUser } from "../../store";

import { getLoggedInCookie } from "../../cookies";

/**
 * Returns the auth user ID
 *
 * @returns {string} The logged in user's ID
 */
export function useAuthStatus() {
  return getLoggedInCookie();
}

/**
 * Returns the auth user info from redux
 *
 * @returns {{user, loading, error}}
 */
export function useAuthUser() {
  return useSelector(selectAuthUser);
}

/**
 * Returns an object containing onLogin and onLogout
 * event actions.
 *
 * @returns {{onLogin, onLogout}}
 *
 * onLogin: Store token info in redux, set apollo access token,
 * and sets auth status cookie.
 *
 * onLogout: Clear redux store, removes apollo access token,
 * clears graphql cache, and removes the auth status cookie.
 */
export function useAuthActions() {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const router = useRouter();

  const onLogin = (accessToken: string) => {
    dispatch(loginUser(accessToken));

    client.clearStore().then(() => router.push("/"));
  };

  const onLogout = (redirectToLogin = true) => {
    dispatch(logoutUser());

    client.clearStore().then(() => {
      if (redirectToLogin) router.push("/auth/login");
    });
  };

  return {
    onLogin,
    onLogout,
  };
}

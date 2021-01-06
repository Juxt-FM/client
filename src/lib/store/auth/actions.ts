/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ApolloError } from "@apollo/client";
import { setLoggedInCookie } from "../../cookies";

import {
  lockApollo,
  unlockApollo,
  createApolloClient,
  MUTATION_REFRESH_TOKEN,
  setAccessToken,
  User,
} from "../../graphql";

import {
  FETCH_USER,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_TOKEN,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_SUCCESS,
} from "./constants";
import { buildTokenInfo } from "./helpers";

/**
 * Log in action creator
 *
 * @param token
 * @returns {{type, payload}}
 */
export const loginUser = (accessToken: string) => {
  const decoded = buildTokenInfo(accessToken);

  setLoggedInCookie(decoded.userID);
  setAccessToken(accessToken);

  return {
    type: LOGIN_USER,
    payload: decoded,
  };
};

/**
 * Log out action creator
 *
 * @returns {{type}}
 */
export const logoutUser = () => {
  setLoggedInCookie(undefined, new Date());
  setAccessToken(undefined);

  return {
    type: LOGOUT_USER,
  };
};

/**
 * Fetch user action creator
 *
 * @returns {{type}}
 */
export const fetchUser = () => ({
  type: FETCH_USER,
});

/**
 * Fetch user success action creator
 *
 * @param user
 * @returns {{type, payload}}
 */
export const fetchUserSuccess = (user: User) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

/**
 * Fetch user fail action creator
 *
 * @param err
 * @returns {{type, payload}}
 */
export const fetchUserFail = (err: ApolloError) => ({
  type: FETCH_USER_FAIL,
  payload: err,
});

/**
 * Refresh token thunk action creator
 */
export const refreshToken = () => {
  const client = createApolloClient({ standalone: true });

  const fetch = () =>
    client.mutate({
      mutation: MUTATION_REFRESH_TOKEN,
    });

  return (dispatch: any) => {
    lockApollo();
    dispatch({ type: REFRESH_TOKEN });

    return fetch()
      .then(({ data: { refreshToken } }) => {
        const { accessToken } = refreshToken;

        dispatch(refreshTokenSuccess(accessToken));

        setAccessToken(accessToken);
        unlockApollo();
      })
      .catch((err: ApolloError) => {
        if (err.graphQLErrors && err.graphQLErrors.length > 0) {
          dispatch(refreshTokenFail());

          setLoggedInCookie(undefined, new Date());
          setAccessToken(undefined);
        } else dispatch(refreshTokenFail({ reset: false }));

        unlockApollo();
      });
  };
};

/**
 * Refresh token success action creator
 *
 * @param dispatch
 * @param accessToken
 */
const refreshTokenSuccess = (accessToken: string) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: buildTokenInfo(accessToken),
});

/**
 * Refresh token fail action creator
 *
 * @param dispatch
 */
const refreshTokenFail = (payload = { reset: true }) => ({
  type: REFRESH_TOKEN_FAIL,
  payload,
});

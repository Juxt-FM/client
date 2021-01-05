/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ApolloError } from "@apollo/client";

import {
  lockApollo,
  unlockApollo,
  createApolloClient,
  MUTATION_REFRESH_TOKEN,
  setAccessToken,
  User,
  AuthCredentials,
} from "../../apollo";

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
export const loginUser = (token: string) => ({
  type: LOGIN_USER,
  payload: buildTokenInfo(token),
});

/**
 * Log out action creator
 *
 * @returns {{type}}
 */
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

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
      .then(({ data: { refreshToken } }) =>
        refreshTokenSuccess(dispatch, refreshToken.accessToken)
      )
      .catch(() => refreshTokenFail(dispatch));
  };
};

/**
 * Refresh token success action creator
 *
 * @param dispatch
 * @param accessToken
 */
const refreshTokenSuccess = (dispatch: any, accessToken: string) => {
  dispatch({
    type: REFRESH_TOKEN_SUCCESS,
    payload: buildTokenInfo(accessToken),
  });

  setAccessToken(accessToken);
  unlockApollo();
};

/**
 * Refresh token fail action creator
 *
 * @param dispatch
 */
const refreshTokenFail = (dispatch: any) => {
  dispatch({
    type: REFRESH_TOKEN_FAIL,
  });
};

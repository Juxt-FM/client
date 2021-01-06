/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { getMockUser } from "../../../../__mocks__/mockData";

const MockUser = getMockUser();

import * as constants from "../constants";
import reducer from "../index";

test("should handle LOGIN_USER", () => {
  expect(
    reducer(constants.InitialAuthState, {
      type: constants.LOGIN_USER,
      payload: mockTokenInfo,
    })
  ).toEqual({
    ...constants.InitialAuthState,
    token: mockTokenInfo,
  });
});

test("should handle LOGOUT_USER", () => {
  expect(
    reducer(
      { ...constants.InitialAuthState, token: mockTokenInfo },
      {
        type: constants.LOGOUT_USER,
      }
    )
  ).toEqual(constants.InitialAuthState);
});

test("should handle FETCH_USER", () => {
  expect(
    reducer(constants.InitialAuthState, {
      type: constants.FETCH_USER,
    })
  ).toEqual({
    ...constants.InitialAuthState,
    user: { ...constants.InitialAuthState.user, loading: true },
  });
});

test("should handle FETCH_USER_SUCCESS", () => {
  expect(
    reducer(
      {
        ...constants.InitialAuthState,
        user: { ...constants.InitialAuthState.user, loading: true },
      },
      {
        type: constants.FETCH_USER_SUCCESS,
        payload: MockUser,
      }
    )
  ).toEqual({
    ...constants.InitialAuthState,
    user: { ...constants.InitialAuthState.user, user: MockUser },
  });
});

test("should handle FETCH_USER_FAIL", () => {
  const err = new Error();
  expect(
    reducer(
      {
        ...constants.InitialAuthState,
        user: { ...constants.InitialAuthState.user, loading: true },
      },
      {
        type: constants.FETCH_USER_FAIL,
        payload: err,
      }
    )
  ).toEqual({
    ...constants.InitialAuthState,
    user: { ...constants.InitialAuthState.user, error: err },
  });
});

test("should handle REFRESH_TOKEN", () => {
  expect(
    reducer(constants.InitialAuthState, {
      type: constants.REFRESH_TOKEN,
    })
  ).toEqual({
    ...constants.InitialAuthState,
    loading: true,
  });
});

test("should handle REFRESH_TOKEN_SUCCESS", () => {
  expect(
    reducer(constants.InitialAuthState, {
      type: constants.REFRESH_TOKEN_SUCCESS,
      payload: mockTokenInfo,
    })
  ).toEqual({
    ...constants.InitialAuthState,
    token: mockTokenInfo,
  });
});

test("should handle REFRESH_TOKEN_FAIL", () => {
  expect(
    reducer(
      { ...constants.InitialAuthState, loading: true },
      {
        type: constants.REFRESH_TOKEN_FAIL,
        payload: mockTokenInfo,
      }
    )
  ).toEqual(constants.InitialAuthState);
});

const mockTokenInfo = {
  userID: "",
  issued: new Date(),
  expiration: new Date(Date.now() + 2000),
};

module.exports = {
  MockTokenInfo: mockTokenInfo,
};

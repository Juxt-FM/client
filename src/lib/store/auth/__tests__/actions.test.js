/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import configureMockStore from "redux-mock-store";
import { ApolloError } from "@apollo/client";
import thunk from "redux-thunk";

import {
  createApolloClient,
  setAccessToken,
  lockApollo,
  unlockApollo,
  MUTATION_REFRESH_TOKEN,
} from "../../../graphql";

import * as actions from "../actions";
import * as constants from "../constants";
import * as helpers from "../helpers";

import { getMockUser } from "../../../../__mocks__/mockData";
import { MockTokenInfo } from "./reducer.test";

const MockUser = getMockUser();

jest.mock("../../../graphql");
jest.mock("../helpers");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test("Log in user", () => {
  helpers.buildTokenInfo.mockReturnValueOnce(MockTokenInfo);

  const token = "access_token";

  const expectedActions = [
    { type: constants.LOGIN_USER, payload: MockTokenInfo },
  ];

  const store = mockStore({ auth: constants.InitialAuthState });

  store.dispatch(actions.loginUser(token));

  expect(store.getActions()).toEqual(expectedActions);
});

test("Log out user", () => {
  const expectedActions = [{ type: constants.LOGOUT_USER }];

  const store = mockStore({
    auth: { ...constants.InitialAuthState, token: MockTokenInfo },
  });

  store.dispatch(actions.logoutUser());

  expect(store.getActions()).toEqual(expectedActions);
});

test("Fetch auth user", () => {
  createApolloClient;
  const expectedActions = [{ type: constants.FETCH_USER }];

  const store = mockStore({
    auth: constants.InitialAuthState,
  });

  store.dispatch(actions.fetchUser());

  expect(store.getActions()).toEqual(expectedActions);
});

test("Fetch auth user success", () => {
  const expectedActions = [
    { type: constants.FETCH_USER_SUCCESS, payload: MockUser },
  ];

  const store = mockStore({
    auth: constants.InitialAuthState,
  });

  store.dispatch(actions.fetchUserSuccess(MockUser));

  expect(store.getActions()).toEqual(expectedActions);
});

test("Fetch auth user fail", () => {
  const error = new ApolloError("An error occurred");

  const expectedActions = [
    {
      type: constants.FETCH_USER_FAIL,
      payload: error,
    },
  ];

  const store = mockStore({
    auth: constants.InitialAuthState,
  });

  store.dispatch(actions.fetchUserFail(error));

  expect(store.getActions()).toEqual(expectedActions);
});

describe("Refresh access token", () => {
  let mockClient;

  beforeEach(() => {
    mockClient = {
      mutate: jest.fn(),
    };
  });

  it("should successfully refresh token", () => {
    helpers.buildTokenInfo.mockReturnValueOnce(MockTokenInfo);

    const accessToken = "access_token";

    const mockResponse = Promise.resolve({
      data: { refreshToken: { accessToken } },
    });

    createApolloClient.mockReturnValueOnce(mockClient);
    mockClient.mutate.mockImplementationOnce(() => mockResponse);

    const store = mockStore({
      auth: constants.InitialAuthState,
    });

    const expectedActions = [
      {
        type: constants.REFRESH_TOKEN,
      },
      {
        type: constants.REFRESH_TOKEN_SUCCESS,
        payload: MockTokenInfo,
      },
    ];

    store.dispatch(actions.refreshToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);

      expect(mockClient.mutate).toBeCalled();
      expect(mockClient.mutate).toBeCalledWith({
        mutation: MUTATION_REFRESH_TOKEN,
      });

      expect(setAccessToken).toBeCalled();
      expect(setAccessToken).toBeCalledWith(accessToken);

      expect(lockApollo).toBeCalled();
      expect(unlockApollo).toBeCalled();
    });
  });

  it("should fail refresh token NO RESET", () => {
    helpers.buildTokenInfo.mockReturnValueOnce(MockTokenInfo);

    const mockResponse = Promise.reject(new Error());

    createApolloClient.mockReturnValueOnce(mockClient);
    mockClient.mutate.mockImplementationOnce(() => mockResponse);

    const store = mockStore({
      auth: constants.InitialAuthState,
    });

    const expectedActions = [
      {
        type: constants.REFRESH_TOKEN,
      },
      {
        type: constants.REFRESH_TOKEN_FAIL,
        payload: {
          reset: false,
        },
      },
    ];

    store.dispatch(actions.refreshToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);

      expect(mockClient.mutate).toBeCalled();
      expect(mockClient.mutate).toBeCalledWith({
        mutation: MUTATION_REFRESH_TOKEN,
      });

      expect(unlockApollo).toBeCalled();
    });
  });

  it("should fail refresh token WITH RESET", () => {
    helpers.buildTokenInfo.mockReturnValueOnce(MockTokenInfo);

    const mockResponse = Promise.reject(
      new ApolloError({ graphQLErrors: [new Error()] })
    );

    createApolloClient.mockReturnValueOnce(mockClient);
    mockClient.mutate.mockImplementationOnce(() => mockResponse);

    const store = mockStore({
      auth: constants.InitialAuthState,
    });

    const expectedActions = [
      {
        type: constants.REFRESH_TOKEN,
      },
      {
        type: constants.REFRESH_TOKEN_FAIL,
        payload: {
          reset: true,
        },
      },
    ];

    store.dispatch(actions.refreshToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);

      expect(mockClient.mutate).toBeCalled();
      expect(mockClient.mutate).toBeCalledWith({
        mutation: MUTATION_REFRESH_TOKEN,
      });

      expect(setAccessToken).toBeCalled();
      expect(setAccessToken).toBeCalledWith(undefined);

      expect(lockApollo).toBeCalled();
      expect(unlockApollo).toBeCalled();
    });
  });
});

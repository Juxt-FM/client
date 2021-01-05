/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../actions";
import * as constants from "../constants";
import * as helpers from "../helpers";

jest.mock("../helpers");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test("Log in user", () => {
  helpers.buildTokenInfo.mockReturnValueOnce(mockTokenInfo);

  const token = "access_token";

  const expectedActions = [
    { type: constants.LOGIN_USER, payload: mockTokenInfo },
  ];

  const store = mockStore({ auth: constants.InitialAuthState });

  store.dispatch(actions.loginUser(token));

  expect(store.getActions()).toEqual(expectedActions);
});

test("Log out user", () => {
  const expectedActions = [{ type: constants.LOGOUT_USER }];

  const store = mockStore({
    auth: { ...constants.InitialAuthState, token: mockTokenInfo },
  });

  store.dispatch(actions.logoutUser());

  expect(store.getActions()).toEqual(expectedActions);
});

const mockTokenInfo = {
  issued: new Date(),
  expiration: new Date(Date.now() + 2000),
};

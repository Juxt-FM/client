/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useDispatch } from "react-redux";

import { getLoggedInCookie } from "../../../cookies";
import { useAuthActions, useAuthStatus } from "../hooks";
import { setAccessToken } from "../../../apollo";
import { loginUser, logoutUser } from "../../../redux";

jest.mock("next/router");
jest.mock("react-redux");
jest.mock("@apollo/client");

jest.mock("../../../redux");
jest.mock("../../../apollo");
jest.mock("../../../cookies");

describe("Get auth status", () => {
  it("should return true", async () => {
    getLoggedInCookie.mockReturnValueOnce("true");

    expect(useAuthStatus()).toBe(true);
  });

  it("should return false", async () => {
    getLoggedInCookie.mockReturnValueOnce(undefined);

    expect(useAuthStatus()).toBe(false);
  });
});

describe("Get auth actions", () => {
  it("should log in user", () => {
    const dispatch = jest.fn();

    const client = {
      clearStore: jest.fn(),
    };

    const router = {
      push: jest.fn(),
    };

    useDispatch.mockReturnValueOnce(dispatch);
    useApolloClient.mockReturnValueOnce(client);
    useRouter.mockReturnValueOnce(router);

    const { onLogin } = useAuthActions();

    dispatch.mockImplementation();
    loginUser.mockImplementation();
    client.clearStore.mockReturnValueOnce({ then: jest.fn() });

    onLogin("access_token");

    expect(dispatch).toBeCalledTimes(1);
    expect(setAccessToken).toBeCalledTimes(1);
    expect(setAccessToken).toHaveBeenLastCalledWith("access_token");
    expect(loginUser).toBeCalledTimes(1);
    expect(client.clearStore).toBeCalledTimes(1);
  });

  it("should log out user", () => {
    const dispatch = jest.fn();

    const client = {
      clearStore: jest.fn(),
    };

    const router = {
      push: jest.fn(),
    };

    useDispatch.mockReturnValueOnce(dispatch);
    useApolloClient.mockReturnValueOnce(client);
    useRouter.mockReturnValueOnce(router);

    const { onLogout } = useAuthActions();

    dispatch.mockImplementation();
    logoutUser.mockImplementation();
    client.clearStore.mockReturnValueOnce({ then: jest.fn() });

    onLogout();

    expect(dispatch).toBeCalledTimes(1);
    expect(setAccessToken).toHaveBeenLastCalledWith(undefined);
    expect(logoutUser).toBeCalledTimes(1);
    expect(client.clearStore).toBeCalledTimes(1);
  });
});

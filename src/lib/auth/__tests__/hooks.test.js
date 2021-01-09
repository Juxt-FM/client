/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useDispatch } from "react-redux";

import { useAuthActions } from "../hooks";
import { loginUser, logoutUser } from "../../store";

jest.mock("next/router");
jest.mock("react-redux");
jest.mock("@apollo/client");

jest.mock("../../store");
jest.mock("../../graphql");
jest.mock("../../cookies");

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
    expect(logoutUser).toBeCalledTimes(1);
    expect(client.clearStore).toBeCalledTimes(1);
  });
});

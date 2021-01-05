/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { act, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import {
  AuthenticationProvider,
  AuthenticatedUserProvider,
} from "../providers";

import { useAuthStatus } from "../hooks";
import { QUERY_AUTH_USER } from "../../../apollo";
import { MockUser } from "../../../../__mocks__/mockData";

jest.mock("../hooks");

const userMocks = [
  {
    request: {
      operationName: "authUser",
      query: QUERY_AUTH_USER,
    },
    result: {
      data: { me: MockUser },
    },
  },
];

function AuthComponent(props) {
  return (
    <AuthenticationProvider {...props}>
      <div>Test Component</div>
    </AuthenticationProvider>
  );
}

function UserComponent(props) {
  return (
    <MockedProvider mocks={userMocks} addTypename={false}>
      <AuthenticatedUserProvider {...props}>
        <div>Test Component</div>
      </AuthenticatedUserProvider>
    </MockedProvider>
  );
}

describe("Authentication Provider", () => {
  it("should fetch a new access token", async () => {
    const props = {
      refreshToken: jest.fn(),
    };

    useAuthStatus.mockReturnValueOnce(true);

    act(() => {
      render(<AuthComponent {...props} />);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 100)));

    expect(props.refreshToken).toBeCalledTimes(1);
  });

  it("should not fetch a new access token", async () => {
    const props = {
      refreshToken: jest.fn(),
    };

    useAuthStatus.mockReturnValueOnce(false);

    act(() => {
      render(<AuthComponent {...props} />);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 100)));

    expect(props.refreshToken).toBeCalledTimes(0);
  });
});

describe("User Provider", () => {
  it("should fetch the authenticated user", async () => {
    const props = {
      fetchUser: jest.fn(),
      fetchUserSuccess: jest.fn(),
      fetchUserFail: jest.fn(),
    };

    useAuthStatus.mockReturnValueOnce(true);

    act(() => {
      render(<UserComponent {...props} />);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 100)));

    expect(props.fetchUser).toBeCalledTimes(1);
    expect(props.fetchUserSuccess).toBeCalledTimes(1);
    expect(props.fetchUserFail).toBeCalledTimes(0);
  });

  it("should not fetch the authenticated user", async () => {
    const props = {
      fetchUser: jest.fn(),
      fetchUserSuccess: jest.fn(),
      fetchUserFail: jest.fn(),
    };

    useAuthStatus.mockReturnValueOnce(false);

    act(() => {
      render(<UserComponent {...props} />);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 100)));

    expect(props.fetchUser).toBeCalledTimes(0);
    expect(props.fetchUserSuccess).toBeCalledTimes(0);
    expect(props.fetchUserFail).toBeCalledTimes(0);
  });
});

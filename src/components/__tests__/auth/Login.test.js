/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";

import { useAuthActions } from "../../../lib/auth";
import { MUTATION_LOGIN } from "../../../lib/graphql";
import Login, { Error as LoginError } from "../../auth/Login";

jest.mock("../../../lib/auth");

jest.mock("next/link", () => ({ children }) => children);

const onLogin = jest.fn();

useAuthActions.mockReturnValue({ onLogin });

describe("<Login />", () => {
  const mockEmail = "user@email.com";
  const mockPassword = "ab12cd34";
  const mockToken = "access_token";
  const mockAuthError = "auth error";
  const mockNetworkError = "network error";

  const mocks = [
    {
      request: {
        query: MUTATION_LOGIN,
        variables: { data: { identifier: mockEmail, password: mockPassword } },
      },
      result: { data: { loginUser: { accessToken: mockToken } } },
    },
  ];

  const authErrorMocks = [
    {
      request: {
        query: MUTATION_LOGIN,
        variables: { data: { identifier: "", password: "" } },
      },
      result: {
        errors: [new GraphQLError(mockAuthError)],
      },
    },
  ];

  const networkErrorMocks = [
    {
      request: {
        query: MUTATION_LOGIN,
        variables: { data: { identifier: "", password: "" } },
      },
      error: new Error(mockNetworkError),
    },
  ];

  const setup = (mockData) => {
    const component = create(
      <MockedProvider mocks={mockData}>
        <Login />
      </MockedProvider>
    );

    const form = component.root.findByProps({ id: "loginForm" });
    const identifier = component.root.findByProps({ id: "identifier" });
    const password = component.root.findByProps({ id: "password" });
    const button = component.root.findByProps({ id: "login" });

    return {
      form,
      identifier,
      password,
      button,
      component,
    };
  };

  it("renders without crashing", () => {
    const { component } = setup(mocks);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should enable login", async () => {
    const { identifier, password, button } = setup();

    act(() => {
      identifier.props.onChange({ target: { value: "user@email.com" } });
      password.props.onChange({ target: { value: "ab12cd34" } });
    });

    expect(button.props.disabled).toEqual(false);
  });

  it("should disable login", async () => {
    const { identifier, button } = setup(mocks);

    act(() => {
      identifier.props.onChange({ target: { value: "user@email.com" } });
    });

    expect(button.props.disabled).toEqual(true);
  });

  it("should log in user", async () => {
    const { identifier, password, form, button } = setup(mocks);

    act(() => {
      identifier.props.onChange({ target: { value: mockEmail } });
      password.props.onChange({ target: { value: mockPassword } });
    });

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() });
    });

    expect(button.props.loading).toEqual(true);

    await act(async () => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(button.props.loading).toEqual(false);
    expect(onLogin).toHaveBeenLastCalledWith(mockToken);
  });

  it("should show auth error", async () => {
    const { form, component } = setup(authErrorMocks);

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() });
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 0)));

    const error = component.root.findByType(LoginError);

    expect(error.props.message).toEqual(mockAuthError);
  });

  it("should show network error", async () => {
    const { form, component } = setup(networkErrorMocks);

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() });
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 0)));

    const error = component.root.findByType(LoginError);

    expect(error.props.message).toEqual(mockNetworkError);
  });
});

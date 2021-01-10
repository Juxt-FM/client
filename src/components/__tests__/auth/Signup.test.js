/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";

import { useAuthActions } from "../../../lib/auth";
import { MUTATION_SIGNUP } from "../../../lib/graphql";
import Signup from "../../auth/Signup";

jest.mock("../../../lib/auth");

jest.mock("next/link", () => ({ children }) => children);

const onLogin = jest.fn();

useAuthActions.mockReturnValue({ onLogin });

describe("<Signup />", () => {
  const mockToken = "signup_access_token";

  const mockInput = {
    email: "user@email.com",
    name: "Test User",
    password: "ab12cd34",
    confirmPassword: "ab12cd34",
  };

  const mocks = [
    {
      request: {
        query: MUTATION_SIGNUP,
        variables: { data: mockInput },
      },
      result: { data: { createUser: { accessToken: mockToken } } },
    },
  ];

  const setup = (mockData) => {
    const component = create(
      <MockedProvider mocks={mockData}>
        <Signup />
      </MockedProvider>
    );

    const form = component.root.findByProps({ id: "signupForm" });
    const email = component.root.findByProps({ id: "email" });
    const name = component.root.findByProps({ id: "name" });
    const password = component.root.findByProps({ id: "password" });
    const confirmPassword = component.root.findByProps({
      id: "confirmPassword",
    });

    const button = component.root.findByProps({ id: "signup" });

    return {
      form,
      email,
      name,
      confirmPassword,
      password,
      button,
      component,
    };
  };

  it("renders without crashing", () => {
    const { component } = setup(mocks);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should signup user", async () => {
    const { form, email, name, password, confirmPassword, button } = setup(
      mocks
    );

    act(() => {
      email.props.onChange({ target: { value: mockInput.email } });
      name.props.onChange({ target: { value: mockInput.name } });
      password.props.onChange({ target: { value: mockInput.password } });
      confirmPassword.props.onChange({
        target: { value: mockInput.confirmPassword },
      });
    });

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() });
    });

    expect(button.props.loading).toEqual(true);

    await act(async () => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(button.props.loading).toEqual(false);
    expect(onLogin).toHaveBeenLastCalledWith(mockToken);
  });
});

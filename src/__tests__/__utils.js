/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import * as nextRouter from "next/router";
import { MockedProvider } from "@apollo/client/testing";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "../store";

import { AuthProvider, UserProvider } from "../context";

const PageProvider = ({ children, initialReduxState, pathname, mocks }) => {
  const store = useStore(initialReduxState);

  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    pathname,
    push: jest.fn(),
  }));

  return (
    <ReduxProvider store={store}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </MockedProvider>
    </ReduxProvider>
  );
};

module.exports = { PageProvider };

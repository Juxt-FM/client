/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { AppProps } from "next/app";
import Router from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider, UserProvider } from "../lib/auth";
import { useStore } from "../lib/store";
import { useApollo } from "../lib/graphql";

import NProgress from "nprogress";

import "../styles/nprogress.scss";
import "../styles/app.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);

  const store = useStore(pageProps.initialReduxState);

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </AuthProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default App;

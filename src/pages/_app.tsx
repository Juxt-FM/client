/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useEffect } from "react";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { useStore } from "../store";
import { useApollo } from "../graphql";
import NProgress from "nprogress";

import { AuthProvider, ThemeContext, UserProvider } from "../context";

import "../styles/nprogress.scss";
import "../styles/app.scss";

const theme = {
  colors: {
    primary: "#5971ff",
    accent: "#006b9c",
    secondary: "#d3d3d3",
    background: "white",
    altBackground: "#f9f9f9",
    headerText: "black",
    text: "#999999",
    border: "#eaeaea",
    blue: "#006eff",
    orange: "#ff5e00",
    pink: "#f85ffd",
    green: "#18cf00",
    black: "black",
    white: "white",
  },
  breakpoints: {
    xs: 0,
    sm: 550,
    md: 800,
    lg: 1024,
    xl: 1920,
  },
};

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface INavigationProvider {
  children: JSX.Element;
}

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);

  const store = useStore(pageProps.initialReduxState);

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <ThemeContext.Provider value={theme}>
          <AuthProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </AuthProvider>
        </ThemeContext.Provider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default App;

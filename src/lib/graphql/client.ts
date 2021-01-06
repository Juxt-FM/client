/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import fetch from "cross-fetch";
import { useMemo } from "react";
import {
  ApolloClient,
  concat,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import merge from "deepmerge";

import cache from "./cache";

import { authLink } from "./auth";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  fetch,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        default:
          // eslint-disable-next-line no-console
          console.log(err);
      }
    }
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.log(networkError);
  }
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface IClientConfig {
  standalone: boolean;
}

/**
 * Create a new Apollo Client instance
 *
 * @param {{standalone: boolean}}
 * @returns {ApolloClient}
 */
export const createApolloClient = ({ standalone }: IClientConfig) => {
  if (standalone)
    return new ApolloClient<NormalizedCacheObject>({
      link: httpLink,
      cache: new InMemoryCache(),
    });

  const ssrMode = typeof window === "undefined";

  // @ts-ignore
  let link = concat(errorLink, concat(authLink, httpLink));

  // @ts-ignore
  if (ssrMode) link = concat(errorLink, httpLink);

  return new ApolloClient({
    ssrMode,
    link,
    cache,
  });
};

/**
 * Initializes the application's Apollo Client instance.
 *
 * @param initialState
 * @returns {ApolloClient}
 */
export function initializeApollo(initialState: any = null) {
  const _apolloClient =
    apolloClient ?? createApolloClient({ standalone: false });

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps

    const data = merge(initialState, existingCache, {
      // We are overwrtiting arrays on merge, by default they concatenate
      arrayMerge: (dest, source) => source,
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/**
 * Merges the existing client cache with the new instance.
 *
 * @param client
 * @param pageProps
 */
export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

/**
 * Hook used to retrieve the Apollo Client instance
 * and merges existing cache.
 *
 * @param pageProps
 */
export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

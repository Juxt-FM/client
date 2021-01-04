/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { setContext } from "@apollo/client/link/context";

// A user's access token, expires every 15 minutes
let accessToken: string | undefined;

let locked = false;

/**
 * Updates the access token in memory
 * @param newToken
 */
export const setAccessToken = (newToken: string | undefined) => {
  if (newToken !== accessToken) {
    // tslint:disable-next-line:no-console
    console.log("updating token");

    accessToken = newToken;
  }
};

/**
 * Lock the apollo client to make
 * all requests wait until it is unlocked
 */
export const lockApollo = () => {
  // tslint:disable-next-line:no-console
  console.log("locking");

  locked = true;
};

/**
 * Unlock apollo client, will initiate
 * all waiting requests
 */
export const unlockApollo = () => {
  // tslint:disable-next-line:no-console
  console.log("unlocking");

  locked = false;
};

/**
 * This injects the user's access token into the request headers,
 * this happens for every request
 *
 * We check to see if the client is unlocked before resolving the new headers.
 * If locked, use setTimeout to try again in 100ms. Else, resolve the headers
 */
export const authLink = setContext((_: any, { headers }: any) => {
  const retries = 0;
  const promise = () =>
    new Promise<any>((resolve) => {
      const buildContext = () => {
        if (!locked) {
          // tslint:disable-next-line:no-console
          console.log("apollo unlocked, fetching");

          if (accessToken) {
            resolve({
              headers: {
                ...headers,
                Authorization: `Bearer ${accessToken}`,
              },
            });
          } else {
            resolve(headers);
          }

          return;
        } else if (retries > 15) {
          return headers;
        } else {
          // tslint:disable-next-line:no-console
          console.log("apollo locked, waiting");

          setTimeout(buildContext, 100);
        }
      };

      buildContext();
    });

  return promise().then((authenticatedHeaders) => authenticatedHeaders);
});

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
    console.log("updating token");
    accessToken = newToken;
  }
};

/**
 * Lock the apollo client to make
 * all requests wait until it is unlocked
 */
export const lockApollo = () => {
  console.log("locking");
  locked = true;
};

/**
 * Unlock apollo client, will initiate
 * all waiting requests
 */
export const unlockApollo = () => {
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
    new Promise<any>((resolve, reject) => {
      const setContext = () => {
        if (!locked) {
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
          console.log("apollo locked, waiting");
          setTimeout(setContext, 100);
        }
      };

      setContext();
    });

  return promise().then((headers) => headers);
});

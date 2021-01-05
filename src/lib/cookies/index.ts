/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import Cookies from "universal-cookie";

import { LOGGED_IN } from "./constants";

const cookies = new Cookies();

/**
 * Returns the user's logged in status
 *
 * @returns {string | undefined}
 */
export const getLoggedInCookie = () => cookies.get(LOGGED_IN);

export const setLoggedInCookie = (value: string, expires?: Date) =>
  cookies.set(LOGGED_IN, value, { path: "/", expires });

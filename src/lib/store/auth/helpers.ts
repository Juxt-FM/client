/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import decodeToken from "jwt-decode";
import moment from "moment";

/**
 * Turns a timestamp in seconds into a date
 *
 * @param timestamp
 * @returns {Date}
 */
const getDate = (timestamp: string) =>
  moment(parseInt(timestamp, 10) * 1000).toDate();

/**
 * Extracts the expiration and issuedAt dates
 * from a JWT
 *
 * @param token
 * @returns {{expires, issued}}
 */
export const buildTokenInfo = (token: string) => {
  const decoded: any = decodeToken(token);

  return {
    issued: getDate(decoded.iat),
    expires: getDate(decoded.exp),
  };
};

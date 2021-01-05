/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

export * from "./actions";
export * from "./constants";

import {
  IAuthActionTypes,
  InitialAuthState,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "./constants";

const reducer = (state = InitialAuthState, action: IAuthActionTypes) => {
  switch (action.type) {
    case REFRESH_TOKEN:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return { ...state, loading: true };
    case REFRESH_TOKEN_SUCCESS:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case REFRESH_TOKEN_FAIL:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return { ...state, token: action.payload };
    case LOGOUT_USER:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return InitialAuthState;
    case FETCH_USER:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return { ...state, user: { ...state.user, loading: true } };
    case FETCH_USER_SUCCESS:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return {
        ...state,
        user: { ...state.user, loading: false, user: action.payload },
      };
    case FETCH_USER_FAIL:
      // eslint-disable-next-line no-console
      console.log("Auth reducer received: ", action.type);
      return {
        ...state,
        user: { ...state.user, loading: false, error: action.payload },
      };
    default:
      return state;
  }
};

export default reducer;

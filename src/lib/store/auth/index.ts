/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

export * from "./actions";
export * from "./constants";

import { RootState } from "..";
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

export const selectTokenInfo = (state: RootState) => ({
  token: state.auth.token,
});

export const selectAuthUser = (state: RootState) => state.auth.user;

const reducer = (state = InitialAuthState, action: IAuthActionTypes) => {
  switch (action.type) {
    case REFRESH_TOKEN:
      return { ...state, loading: true };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case REFRESH_TOKEN_FAIL:
      if (action.payload.reset) return InitialAuthState;
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER:
      return { ...state, token: action.payload };
    case LOGOUT_USER:
      return InitialAuthState;
    case FETCH_USER:
      return { ...state, user: { ...state.user, loading: true } };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, loading: false, user: action.payload },
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        user: { ...state.user, loading: false, error: action.payload },
      };
    default:
      return state;
  }
};

export default reducer;

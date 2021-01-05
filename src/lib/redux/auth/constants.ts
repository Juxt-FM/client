/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ApolloError } from "@apollo/client";

import { User } from "../../apollo";

export interface ITokenState {
  issued: Date;
  expires: Date;
}

export interface IUserState {
  user: User | undefined;
  loading: boolean;
  error: ApolloError;
}

interface IRefreshTokenAction {
  type: typeof REFRESH_TOKEN;
}

interface IRefreshTokenSuccessAction {
  type: typeof REFRESH_TOKEN_SUCCESS;
  payload: ITokenState;
}

interface IRefreshTokenFailAction {
  type: typeof REFRESH_TOKEN_FAIL;
}

interface IFetchUserAction {
  type: typeof FETCH_USER;
}

interface IFetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: User;
}

interface IFetchUserFailAction {
  type: typeof FETCH_USER_FAIL;
  payload: ApolloError;
}

interface ILoginAction {
  type: typeof LOGIN_USER;
  payload: ITokenState;
}

interface ILogoutAction {
  type: typeof LOGOUT_USER;
}

export interface IAuthState {
  loading: boolean;
  token: ITokenState | undefined;
  user: IUserState;
}

export type IAuthActionTypes =
  | IRefreshTokenAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailAction
  | IFetchUserAction
  | IFetchUserSuccessAction
  | IFetchUserFailAction
  | ILoginAction
  | ILogoutAction;

export const REFRESH_TOKEN = "refresh_token";
export const REFRESH_TOKEN_SUCCESS = "refresh_token_success";
export const REFRESH_TOKEN_FAIL = "refresh_token_fail";

export const LOGIN_USER = "login_user";
export const LOGOUT_USER = "logout_user";

export const FETCH_USER = "fetch_user";
export const FETCH_USER_FAIL = "fetch_user_fail";
export const FETCH_USER_SUCCESS = "fetch_user_success";

export const InitialAuthState: IAuthState = {
  loading: false,
  token: undefined,
  user: {
    loading: false,
    user: undefined,
    error: undefined,
  },
};

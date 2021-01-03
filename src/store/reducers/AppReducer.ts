/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import {
  NEW_ROUTE,
  SHOW_NEW_LIST_MODAL,
  HIDE_NEW_LIST_MODAL,
  SHOW_UPDATE_LIST_MODAL,
  HIDE_UPDATE_LIST_MODAL,
} from "../types";

import { Watchlist } from "../../graphql";

interface IState {
  route: string;
  home: {
    showNewList: boolean;
    showUpdateList: boolean;
    listToUpdate: Watchlist | undefined;
  };
  account: {
    showEmailVerification: boolean;
  };
}

const INITIAL_STATE: IState = {
  route: "",
  home: {
    showNewList: false,
    showUpdateList: false,
    listToUpdate: undefined,
  },
  account: {
    showEmailVerification: false,
  },
};

interface IHomeAction {
  type: string;
  payload?: any;
}

const reducer = (state = INITIAL_STATE, action: IHomeAction) => {
  switch (action.type) {
    case NEW_ROUTE:
      console.log("App reducer received: ", action.type);
      return { ...state, route: action.payload };
    case SHOW_NEW_LIST_MODAL:
      console.log("App reducer received: ", action.type);
      return { ...state, home: { showNewList: true } };
    case HIDE_NEW_LIST_MODAL:
      console.log("App reducer received: ", action.type);
      return { ...state, home: { showNewList: false } };
    case SHOW_UPDATE_LIST_MODAL:
      console.log("App reducer received: ", action.type);
      return {
        ...state,
        home: { showUpdateList: true, listToUpdate: action.payload },
      };
    case HIDE_UPDATE_LIST_MODAL:
      console.log("App reducer received: ", action.type);
      return {
        ...state,
        home: { showUpdateList: false, listToUpdate: undefined },
      };
    default:
      return state;
  }
};

export default reducer;

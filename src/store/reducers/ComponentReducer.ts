/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { HEADER_THEME_CHANGED, NEW_ROUTE } from "../types";

const INITIAL_STATE = {
  header: {
    theme: { dark: false },
  },
};

interface IHomeAction {
  type: string;
  payload?: any;
}

const reducer = (state = INITIAL_STATE, action: IHomeAction) => {
  switch (action.type) {
    case HEADER_THEME_CHANGED:
      console.log("Component reducer received: ", action.type);
      return {
        ...state,
        header: { ...state.header, theme: action.payload },
      };
    case NEW_ROUTE:
      console.log("Component reducer received: ", action.type);
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;

/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useMemo } from "react";
import { createStore, combineReducers, Store } from "redux";
import reducers from "./reducers";

export * from "./types";

let store: Store;

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

function initStore(preloadedState: any = {}) {
  return createStore(rootReducer, preloadedState);
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

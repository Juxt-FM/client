/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { MutableRefObject, useEffect } from "react";

interface IClickAwayAction {
  isActive: boolean;
  action: () => void;
}

export const useClickAwayAction = (
  ref: MutableRefObject<any>,
  options: IClickAwayAction
) => {
  const onClickAway = (e: MouseEvent) => {
    if (!ref.current.contains(e.target)) {
      options.action();
    }
  };

  useEffect(() => {
    if (options.isActive) {
      window.addEventListener("click", onClickAway);
    }

    return () => {
      window.removeEventListener("click", onClickAway);
    };
  }, [options.isActive]);
};

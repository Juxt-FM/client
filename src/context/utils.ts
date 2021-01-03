/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useEffect, useRef } from "react";

/**
 * Returns the previous value of the
 * provided state
 * @param val
 */
export function usePreviousValue(val: any) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
}

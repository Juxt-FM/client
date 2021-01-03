/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import React from "react";

interface IThemeContext {
  colors: any;
  breakpoints: any;
}

export const ThemeContext = React.createContext<IThemeContext | undefined>(
  undefined
);

export function useTheme() {
  const theme = React.useContext(ThemeContext);
  return theme;
}

export function useCurrentBreakpoint() {
  const theme = useTheme();
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState("lg");

  React.useEffect(() => {
    maybeChangeLayout();

    window.addEventListener("resize", maybeChangeLayout);
    return () => {
      window.removeEventListener("resize", maybeChangeLayout);
    };
  });

  const maybeChangeLayout = () => {
    const { breakpoints } = theme;
    if (window.innerWidth < breakpoints.sm) setCurrentBreakpoint("xs");
    else if (window.innerWidth < breakpoints.md) setCurrentBreakpoint("sm");
    else if (window.innerWidth < breakpoints.lg) setCurrentBreakpoint("md");
    else if (window.innerWidth < breakpoints.xl) setCurrentBreakpoint("lg");
    else setCurrentBreakpoint("xl");
  };

  return currentBreakpoint;
}

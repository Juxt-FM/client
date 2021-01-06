/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { SkeletonTheme } from "react-loading-skeleton";

interface ISkeletonWrapper {
  children: React.ReactChild;
}

const SkeletonWrapper = (props: ISkeletonWrapper) => (
  <SkeletonTheme color="#14192c" highlightColor="#151c31">
    {props.children}
  </SkeletonTheme>
);

export default SkeletonWrapper;

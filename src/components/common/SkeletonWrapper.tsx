/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { SkeletonTheme } from "react-loading-skeleton";

interface ISkeletonWrapper {
  children: React.ReactChild;
}

const SkeletonWrapper = (props: ISkeletonWrapper) => (
  <SkeletonTheme color="#f2f2f2" highlightColor="#eeeeee">
    {props.children}
  </SkeletonTheme>
);

export default SkeletonWrapper;

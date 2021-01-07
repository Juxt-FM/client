/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import _ from "lodash";

import { List } from "../common/Containers";
import Idea from "../ideas/IdeaListItem";

import { getMockIdea } from "../../__mocks__/mockData";

const Ideas = () => {
  return (
    <List>
      {_.range(10).map((i, index) => (
        <Idea idea={getMockIdea()} key={String(index)} />
      ))}
    </List>
  );
};

export default Ideas;

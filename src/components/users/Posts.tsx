/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import _ from "lodash";

import { ListItem } from "../posts/PostListItem";
import { List } from "../common/Containers";

import { getMockPost } from "../../__mocks__/mockData";

const Posts = () => (
  <List>
    {_.range(15).map((_, index) => (
      <ListItem post={getMockPost()} image="left" key={String(index)} />
    ))}
  </List>
);

export default Posts;

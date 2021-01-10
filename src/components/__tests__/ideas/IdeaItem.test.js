/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import Link from "next/link";
import Idea, {
  IdeaLink,
  LoadingIdea,
  IdeaDate,
} from "../../ideas/IdeaListItem";
import Skeleton from "react-loading-skeleton";

describe("<IdeaLink />", () => {
  const setup = (props) => {
    const component = create(
      <IdeaLink {...props}>
        <p>Click me</p>
      </IdeaLink>
    );

    return component;
  };

  it("should have correct path", () => {
    const props = { id: "1", disabled: false };

    const component = setup(props);

    const link = component.root.findByType(Link);

    expect(link.props.href).toEqual("/app/ideas/1");
  });

  it("should be disabled", () => {
    const props = { id: "1", disabled: true };

    const component = setup(props);

    const links = component.root.findAllByType(Link);
    const loader = component.root.findByType("p");

    expect(links.length).toEqual(0);
    expect(loader.children).toContain("Click me");
  });
});

describe("<LoadingIdea />", () => {
  const setup = (count) => {
    const component = create(<LoadingIdea count={count} />);

    const ideas = component.root.findAllByType(Idea);

    return { ideas, component };
  };

  it("should show correct count", () => {
    const { ideas } = setup(3);

    expect(ideas.length).toEqual(3);

    ideas.forEach((idea) => {
      expect(idea.props.loading).toEqual(true);
    });
  });
});

describe("<IdeaDate />", () => {
  const setup = (props) => {
    const component = create(<IdeaDate {...props} />);

    const date = component.root.findByType("p");

    return { date, component };
  };

  it("should show date", () => {
    const { date } = setup({ timestamp: "1610234830" });

    expect(typeof date.children[0]).toEqual("string");
  });

  it("should show loader", () => {
    const { date } = setup({ timestamp: "1610234830", loading: true });

    expect(date.children[0].type).toEqual(Skeleton);
  });
});

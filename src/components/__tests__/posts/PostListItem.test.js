/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create } from "react-test-renderer";

import Link from "next/link";
import {
  BlogPostLink,
  PostListItem,
  LoadingListItem,
  PostDate,
  PostImage,
  PostSummary,
  PostTitle,
  LoadingAltPostListItem,
  AltPostListItem,
} from "../../posts/PostListItem";
import Skeleton from "react-loading-skeleton";

import { getMockPost } from "../../../__mocks__/mockData";

jest.mock("../../../lib/auth");
jest.mock("next/router");

describe("<PostLink />", () => {
  const setup = (props) => {
    const component = create(
      <BlogPostLink id="1" {...props}>
        Click me
      </BlogPostLink>
    );

    return component;
  };

  it("should render link with the correct path", () => {
    const component = setup();

    const link = component.root.findByType(Link);

    expect(link.props.href).toEqual("/app/posts/1");
  });

  it("should render disabled state", () => {
    const component = setup({ disabled: true });

    const links = component.root.findAllByType(Link);

    expect(links.length).toEqual(0);
  });
});

describe("<LoadingListItem />", () => {
  const setup = () => {
    const component = create(<LoadingListItem count={3} />);

    return component;
  };

  it("should render correct count", () => {
    const component = setup();

    const posts = component.root.findAllByType(PostListItem);

    expect(posts.length).toEqual(3);

    posts.forEach((post) => {
      expect(post.props.loading).toEqual(true);
    });
  });
});

describe("<PostDate />", () => {
  const setup = (props) => {
    const component = create(<PostDate {...props} />);

    const date = component.root.findByType("p");

    return { date, component };
  };

  it("should render timestamp", () => {
    const { date } = setup({ timestamp: "1610299359" });

    expect(typeof date.children[0]).toEqual("string");
  });

  it("should render loader", () => {
    const { date } = setup({ loading: true });

    expect(date.children[0].type).toEqual(Skeleton);
  });
});

describe("<PostImage />", () => {
  const setup = (props) => {
    const component = create(<PostImage {...props} />);

    return component;
  };

  it("should render image", () => {
    const props = {
      id: "1",
      imageURL:
        "https://www.pererasys.com/_next/static/images/me-0e70979b96b772f832a278693ee0cd0e.jpg",
    };

    const component = setup(props);

    const link = component.root.findByType(Link);
    const image = component.root.findByType("img");

    expect(link.props.href).toEqual("/app/posts/1");
    expect(image.props.src).toEqual(props.imageURL);
  });

  it("should render loader", () => {
    const props = { loading: true };

    const component = setup(props);

    const links = component.root.findAllByType(Link);
    const loaders = component.root.findAllByType(Skeleton);
    const images = component.root.findAllByType("img");

    expect(links.length).toEqual(0);
    expect(images.length).toEqual(0);
    expect(loaders.length).toEqual(1);
  });
});

describe("<PostSummary />", () => {
  const setup = (props) => {
    const component = create(<PostSummary {...props} />);

    return component;
  };

  it("should render summary", () => {
    const props = {
      summary: "This is a test summary!",
    };

    const component = setup(props);

    const summary = component.root.findByType("p");

    expect(summary.children).toContain(props.summary);
  });

  it("should render loaders", () => {
    const props = {
      loading: true,
    };

    const component = setup(props);

    const loaders = component.root.findAllByType(Skeleton);
    const summary = component.root.findAllByType("p");

    expect(summary.length).toEqual(0);
    expect(loaders.length).toEqual(2);
  });
});

describe("<PostTitle />", () => {
  const setup = (props) => {
    const component = create(<PostTitle {...props} />);

    return component;
  };

  it("should render title", () => {
    const props = {
      title: "This is a test title!",
    };

    const component = setup(props);

    const title = component.root.findByType("p");

    expect(title.children).toContain(props.title);
  });

  it("should render loader", () => {
    const props = {
      loading: true,
    };

    const component = setup(props);

    const title = component.root.findByType("p");
    const loaders = component.root.findAllByType(Skeleton);

    expect(loaders.length).toEqual(1);
    expect(title.children.length).toEqual(1);
  });
});

describe("<PostListItem />", () => {
  const post = getMockPost();

  const setup = (props) => {
    const component = create(<PostListItem post={post} {...props} />);

    return component;
  };

  it("should render post components with correct props", () => {
    const props = { size: "md", image: "right" };
    const component = setup(props);

    const title = component.root.findByType(PostTitle);
    const image = component.root.findByType(PostImage);
    const date = component.root.findByType(PostDate);
    const summary = component.root.findByType(PostSummary);

    expect(title.props).toEqual({
      title: post.title,
      size: props.size,
    });

    expect(image.props).toEqual({
      id: post.id,
      imageURL: post.imageURL,
      size: props.size,
    });

    expect(date.props).toEqual({
      timestamp: post.createdAt,
    });

    expect(summary.props).toEqual({
      summary: post.subtitle,
    });
  });

  it("should render loading state", () => {
    const props = { size: "md", image: "right", loading: true };
    const component = setup(props);

    const title = component.root.findByType(PostTitle);
    const image = component.root.findByType(PostImage);
    const date = component.root.findByType(PostDate);
    const summary = component.root.findByType(PostSummary);

    expect(title.props).toEqual({
      size: props.size,
      loading: true,
    });

    expect(image.props).toEqual({
      size: props.size,
      loading: true,
    });

    expect(date.props).toEqual({
      loading: true,
    });

    expect(summary.props).toEqual({
      loading: true,
    });
  });
});

describe("<LoadingAltPostListItem />", () => {
  const setup = () => {
    const component = create(<LoadingAltPostListItem count={3} />);

    return component;
  };

  it("should render correct count", () => {
    const component = setup();

    const posts = component.root.findAllByType(AltPostListItem);

    expect(posts.length).toEqual(3);

    posts.forEach((post) => {
      expect(post.props.loading).toEqual(true);
    });
  });
});

describe("<AltPostListItem />", () => {
  const post = getMockPost();

  const setup = (props) => {
    const component = create(<AltPostListItem post={post} {...props} />);

    return component;
  };

  it("should render post components with correct props", () => {
    const component = setup();

    const title = component.root.findByType(PostTitle);
    const date = component.root.findByType(PostDate);

    expect(title.props).toEqual({
      title: post.title,
      size: "md",
    });

    expect(date.props).toEqual({
      timestamp: post.createdAt,
    });
  });

  it("should render loading state", () => {
    const props = { loading: true };

    const component = setup(props);

    const loaders = component.root.findAllByType(Skeleton);

    expect(component.root.children.length).toEqual(1);
    expect(loaders.length).toEqual(1);
  });
});

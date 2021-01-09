/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { create, act } from "react-test-renderer";

import { useRef } from "react";
import { useClickAwayAction } from "../hooks";

const TestComponent = ({ options }) => {
  const ref = useRef(null);

  useClickAwayAction(ref, options);

  return <div ref={ref}>content</div>;
};

describe("useClickAwayAction", () => {
  const setup = (options) => {
    const component = create(<TestComponent options={options} />);

    return component;
  };

  it("should set and remove event handlers", async () => {
    let addEvents = {};
    let removeEvents = {};

    const mockListeners = {
      addEventListener: jest.fn((event, callback) => {
        addEvents[event] = callback;
      }),
      removeEventListener: jest.fn((event, callback) => {
        removeEvents[event] = callback;
      }),
    };

    const windowSpy = jest.spyOn(global, "window", "get");

    const action = jest.fn();

    windowSpy.mockImplementation(() => mockListeners);

    const options = { isActive: true, action };

    const component = setup(options);

    act(() => {});

    expect(Object.keys(addEvents)).toContain("click");
    expect(addEvents.click).toBeDefined();

    component.unmount();

    act(() => {});

    expect(Object.keys(removeEvents)).toContain("click");
    expect(removeEvents.click).toBeDefined();
  });

  it("should not set event handlers", async () => {
    let addEvents = {};
    let removeEvents = {};

    const mockListeners = {
      addEventListener: jest.fn((event, callback) => {
        addEvents[event] = callback;
      }),
      removeEventListener: jest.fn((event, callback) => {
        removeEvents[event] = callback;
      }),
    };

    const windowSpy = jest.spyOn(global, "window", "get");

    const action = jest.fn();

    windowSpy.mockImplementation(() => mockListeners);

    const options = { isActive: false, action };

    setup(options);

    act(() => {});

    expect(addEvents["click"]).toBe(undefined);
  });
});

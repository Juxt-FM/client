/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { PageProvider } from "../__utils";

import Home from "../../pages/index";

test("Renders page appropriately", () => {
  const { getByText } = render(
    <PageProvider pathname="" mocks={[]}>
      <Home />
    </PageProvider>
  );

  expect(getByText("Latest")).toBeInTheDocument();
});

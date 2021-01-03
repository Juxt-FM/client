import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/index";

const mocks = [];

it("should render page", () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  );

  expect(getByText("Latest")).toBeInTheDocument();
});

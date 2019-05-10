import React from "react";
import { cleanup, render } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "../App";

afterEach(cleanup);

test("Header is rendered", () => {
  const { getByText } = render(<App />);
  getByText(/BROCCOLI & CO./);
});

test("Main is rendered", () => {
  const { getByText } = render(<App />);
  getByText(/A better way to enjoy every day./);
  getByText(/Be the first to know when we launch./);
  getByText(/Request an invite/);
});

test("Footer is rendered", () => {
  const { getByText } = render(<App />);
  getByText(/All rights reserved./);
});

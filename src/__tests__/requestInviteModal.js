import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  waitForElement
} from "react-testing-library";
import axiosMock from "axios";
import "jest-dom/extend-expect";
import App from "../App";

function setInputValue(input, value) {
  fireEvent.change(input, {
    target: { value: value }
  });
}

afterEach(() => {
  cleanup();
  axiosMock.post.mockClear();
});

test("Request invite modal is opened when button is clicked", () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  fireEvent.click(getByText("Request an invite"));

  getByPlaceholderText("Full name");
  getByPlaceholderText("Email");
  getByPlaceholderText("Confirm email");
  getByText("Send");
});

test("Input error messages are displayed", () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  fireEvent.click(getByText("Request an invite"));

  setInputValue(getByPlaceholderText("Full name"), "mi");
  setInputValue(getByPlaceholderText("Email"), "a@b");
  setInputValue(getByPlaceholderText("Confirm email"), "a@b.com");

  fireEvent.click(getByText("Send"));

  getByText("Must be at least 3 characters long");
  getByText("Must be a valid email format");
  getByText("Must match the email above");
});

test("Validation passes, request is successful", async () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  fireEvent.click(getByText("Request an invite"));

  setInputValue(getByPlaceholderText("Full name"), "Misha Moroshko");
  setInputValue(getByPlaceholderText("Email"), "michael.moroshko@gmail.com");
  setInputValue(
    getByPlaceholderText("Confirm email"),
    "michael.moroshko@gmail.com"
  );

  axiosMock.post.mockResolvedValueOnce({ status: 200 });

  const sendButton = getByText("Send");

  fireEvent.click(sendButton);

  getByText("Sending, please wait...");
  expect(sendButton).toBeDisabled();

  await waitForElement(() => getByText("All done!"));

  expect(axiosMock.post).toHaveBeenCalledTimes(1);

  const okButton = getByText("OK");

  fireEvent.click(okButton);

  expect(() => getByText("All done!")).toThrow();
});

test("Validation passes, request errors", async () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<App />);

  fireEvent.click(getByText("Request an invite"));

  setInputValue(getByPlaceholderText("Full name"), "Misha Moroshko");
  setInputValue(getByPlaceholderText("Email"), "usedemail@airwallex.com");
  setInputValue(
    getByPlaceholderText("Confirm email"),
    "usedemail@airwallex.com"
  );

  axiosMock.post.mockResolvedValueOnce({
    status: 400,
    data: {
      errorMessage: "Something bad happened"
    }
  });

  const sendButton = getByText("Send");

  fireEvent.click(sendButton);

  await waitForElement(() => getByText("Send"));

  expect(axiosMock.post).toHaveBeenCalledTimes(1);
  expect(queryByText("All done!")).not.toBeInTheDocument();

  getByText("Something bad happened");
});

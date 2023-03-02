import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import App from "./App";
import FormCheckBox from "./App";
import React, { useState } from "react";

describe("App", () => {
  it("renders App component", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/i)).toBeNull();

    fireEvent.change(screen.getByTestId("search"), {
      target: { value: "react" },
    });
    expect(screen.getByText(/Searches for React/i)).toBeInTheDocument();

    // expect(screen.queryByText(/Logged in as/i)).toBeNull();
    // expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/search/i)).toBeRequired();
    // expect(screen.getByLabelText(/search/i)).toBeEmpty();
    // expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");

    //  expect(screen.queryByText(/Searches for React/i)).toBeNull();
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
    // expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    // expect(screen.getByAltText(/search images/i)).toBeInTheDocument();
    // expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });

  it("input focus", () => {
    render(<App />);
    const input = screen.getByTestId("m-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});

describe("Form", () => {
  it("events", () => {
    render(<App />);
    const Wrap = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <FormCheckBox
          isChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      );
    };
    const { container } = render(<Wrap />);
    const checkbox = container.querySelectorAll("input[type='checkbox']")[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

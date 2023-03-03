import React, { useState } from "react";
import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.js";
import FormCheckBox from "./App.js";

jest.mock("axios");

const hits = [
  { objID: "1", title: "React" },
  { objID: "2", title: "Vue" },
];

describe("App", () => {
  test("fetches news from API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "http://hn.algolia.com/api/v1/search?query=React"
    );
  });

  // ex 2
  // it("fetches news from an API (alternative)", async () => {
  //   const promise = Promise.resolve({ data: { hits } });
  //   axios.get.mockImplementationOnce(() => promise);
  //   render(<App />);
  //   userEvent.click(screen.getByRole("button"));
  //   await act(() => promise);
  //   expect(screen.getAllByRole("listitem")).toHaveLength(2);
  // });

  test("fetches news from API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    const message = await screen.findByText(/Something went wrong/i);
    expect(message).toBeInTheDocument();
  });

  it("renders App component", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/i)).toBeNull();

    // Ex 1
    // fireEvent.change(screen.getByTestId("search"), {
    //   target: { value: "react" },
    // });

    // Ex 2
    userEvent.type(screen.getByTestId("search"), "React");

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
    // Ex 1
    // fireEvent.click(checkbox);

    // Ex 2
    // userEvent.click(checkbox);

    // Ex 3
    userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    expect(checkbox).toBeChecked();
  });

  it("double click", () => {
    render(<App />);
    const onChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={onChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test("focus", () => {
    render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = screen.getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  test("select options", () => {
    render(
      <select>
        <option value="1">Q</option>
        <option value="2">W</option>
        <option value="3">E</option>
      </select>
    );
    userEvent.selectOptions(screen.getByRole("combobox"), "1");
    expect(screen.getByText("Q").selected).toBe(true);

    userEvent.selectOptions(screen.getByRole("combobox"), "2");
    expect(screen.getByText("W").selected).toBe(true);
    expect(screen.getByText("Q").selected).toBe(false);
  });
});

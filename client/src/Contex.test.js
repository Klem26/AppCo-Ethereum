import React, { useState, useContext, createContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, toggleLoginStatus] = useState(false);

  const toggleLogin = () => {
    toggleLoginStatus(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ toggleLogin, isLoggedIn }}>
      <div>Message: {children}</div>
    </AuthContext.Provider>
  );
};

const ConsumerComponent = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  return (
    <>
      <input type="button" value="Login" onClick={toggleLogin} />
      {isLoggedIn ? "Welcome!" : "Please, log in"}
    </>
  );
};

describe("Context", () => {
  it("ConsumerComponent shows default value", () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(screen.getByText(/^Message:/)).toHaveTextContent(
      "Message: Please, log in"
    );
  });

  test("ConsumerComponent  toggle value", () => {
    // const onClick = jest.fn();
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    expect(screen.getByText(/^Message:/)).toHaveTextContent(
      "Message: Please, log in"
    );

    userEvent.click(screen.getByRole("button"));
    // expect(screen.getByText(/^Message:/)).toHaveTextContent(
    //   "Message: Welcome!"
    // );
    userEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/^Message:/)).toHaveTextContent(
      "Message: Please, log in"
    );
  });
});

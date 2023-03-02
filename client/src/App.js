import React, { useState, useEffect } from "react";
import "./App.css";

const getUser = () => Promise.resolve({ id: 1, name: "Tanya" });

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input
      data-testid="search"
      id="search"
      placeholder="search..."
      type="text"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export function FormCheckBox({ onChange, isChecked }) {
  const handleChangeCheckbox = (event) => {
    onChange(event.currentTarget.checked);
  };

  return (
    <input
      checked={isChecked}
      type="checkbox"
      onChange={handleChangeCheckbox}
    />
  );
}

const App = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      <input type="text" data-testid="m-input" />
      <FormCheckBox
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      {user && <p>Logged in as {user.name}</p>}
      <img src="#" alt="search images" />
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
};

export default App;

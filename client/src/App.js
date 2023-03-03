import React, { useState, useEffect } from "react";
import axios from "axios";

const getUser = () => Promise.resolve({ id: 1, name: "Tanya" });
const URL = "http://hn.algolia.com/api/v1/search";

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
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

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

  const handleFetch = async () => {
    try {
      const result = await axios.get(`${URL}?query=React`);
      setNews(result.data.hits);
    } catch (error) {
      setError(error);
    }
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

      <div>
        <button type="button" onClick={handleFetch}>
          Fetch News
        </button>

        {error && <span>Something went wrong ...</span>}

        <ul>
          {news.map(({ objectID, url, title }) => (
            <li key={objectID}>
              <a href={url}>{title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import "./SearchBar.scss";

function SearchBar({ searchTermHandler }) {
  const context = useContext(AuthContext);
  return (
    <div className="search-bar">
      <input
        value={context.searchTerm}
        onChange={e => searchTermHandler(e.target.value)}
        type="search"
        id="search_bar"
        placeholder="search"
        role="search"
      />
      <span>
        <i className="fas fa-search fa-lg" />
      </span>
    </div>
  );
}

export default SearchBar;

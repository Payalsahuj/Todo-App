import type React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  function handleSearch() {}

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="flex w-full">
        <input
          type="text"
          placeholder="Search todos..."
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

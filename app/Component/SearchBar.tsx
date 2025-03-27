import type React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { todoContext } from "./HomePage";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const { setTodoList } = useContext(todoContext);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchInput.trim());
    }, 700);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  async function handleSearch(searchQuery: string) {
    try {
      const endpoint = `/api/todos?search=${searchQuery}`;
      const response = await axios.get(endpoint);
      setTodoList(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  return (
    <div className="search-container">
      <form onSubmit={(e) => e.preventDefault()} className="flex w-full">
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

import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ className, onSearchSubmit }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/blog?search=${query}`);
    if (onSearchSubmit) onSearchSubmit();
    setQuery(""); // Optional: clear after search
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`${className} flex items-center gap-2`}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="px-3 py-2 w-full rounded-lg border border-gray-400 
                   dark:border-neutral-700 dark:bg-neutral-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search"
      />
      <Button type="submit">
        <FaSearch />
      </Button>
    </form>
  );
};

export default SearchForm;

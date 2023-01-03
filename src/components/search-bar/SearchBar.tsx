import React, { useState } from "react";

export default function SearchBar() {
  const [searchParam, setSearchParam] = useState<string>("");

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setSearchParam(value);
  }

  return (
    <div className="poke-search">
        <input
          onChange={handleOnChange}
          value={searchParam}
          placeholder="Search pokemon.."
          type="text"
          className="poke-search-input"
        />
    </div>
  );
}

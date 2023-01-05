import React, { Dispatch, useState } from "react";
// Style
import "./SearchBar.scss";

export default function SearchBar(props: {
  searchParam: string;
  setSearchParam: Dispatch<React.SetStateAction<string>>;
}) {

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    props.setSearchParam(value);
  }

  return (
    <div className="poke-search ">
      <input
        onChange={handleOnChange}
        value={props.searchParam}
        placeholder="Search pokemon.."
        type="text"
        className="poke-search-input text-search-500"
      />
    </div>
  );
}

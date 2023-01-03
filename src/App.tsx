import { PokemonClient, NamedAPIResource } from "pokenode-ts";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/search-bar/SearchBar";

function App() {
  const [pokedex, setPokedex] = useState<NamedAPIResource[] | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [resultsLimit, setResultsLimit] = useState<number>(10);

  const api = new PokemonClient();

  async function handlePokemonSpeciesReq() {
    await api.listPokemonSpecies(resultsLimit * (pageIndex - 1), resultsLimit)
      .then((res) => {
        setPokedex(res.results);
      });
  }

  useEffect(() => {
    handlePokemonSpeciesReq();
  }, []);

  return (
    <div className="pokedex-app">
      <SearchBar />
      <div></div>
      {pokedex?.map((pokemon) => {
        return <div>{pokemon.name}</div>;
      })}
      <div className="pokedex-pages"></div>
    </div>
  );
}

export default App;

import { PokemonClient, NamedAPIResource, Pokemon } from "pokenode-ts";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/search-bar/SearchBar";
import PokeDisplay from "./layout/poke-display/PokeDisplay";
import "./index.scss";

function App() {
  const [searchParam, setSearchParam] = useState<string>("");
  const [pokedex, setPokedex] = useState<NamedAPIResource[] | null>(null);
  const [filteredPokedex, setFilteredPokedex] = useState<NamedAPIResource[] | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [resultsLimit, setResultsLimit] = useState<number>(10);

  const api = new PokemonClient();

  async function handlePokemonSpeciesReq() {
    // Ritorna tutti i pokemon
    await api.listPokemons(0, 903).then((res) => {
      setPokedex(res.results);
    });
  }

  function searchPokemon() {
    const filteredPokedex = pokedex?.filter((pokemon) =>
      pokemon.name.startsWith(searchParam.toLocaleLowerCase())
    );
    if (filteredPokedex) setFilteredPokedex(filteredPokedex);
  }

  useEffect(() => {
    searchPokemon();
  }, [searchParam]);

  useEffect(() => {
    handlePokemonSpeciesReq();
  }, []);

  return (
    <div className="pokedex-app">
      <SearchBar searchParam={searchParam} setSearchParam={setSearchParam} />
      <div className="pokedex-entries">
        {filteredPokedex
          ? filteredPokedex
              ?.slice(resultsLimit * (pageIndex - 1), resultsLimit)
              .map((pokemon) => {
                return <PokeDisplay name={pokemon.name} />;
              })
          : pokedex
              ?.slice(resultsLimit * (pageIndex - 1), resultsLimit)
              .map((pokemon) => {
                return <PokeDisplay name={pokemon.name} />;
              })}
      </div>
      <div className="pokedex-pages">
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default App;

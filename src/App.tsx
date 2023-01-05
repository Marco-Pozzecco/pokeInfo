import { PokemonClient, NamedAPIResource, Pokemon } from "pokenode-ts";
import React, { useEffect, useState } from "react";
// Components
import SearchBar from "./components/search-bar/SearchBar";
import PokeDisplay from "./layout/poke-display/PokeDisplay";
// Icons
import { HiBackward, HiForward } from "react-icons/hi2";
// Style
import "./index.scss";
import "./abstract/_typography.scss";

function App() {
  const [searchParam, setSearchParam] = useState<string>("");

  const [pokedex, setPokedex] = useState<NamedAPIResource[] | null>(null);
  const [filteredPokedex, setFilteredPokedex] = useState<NamedAPIResource[] | null>(null);
  
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [resultsLimit, setResultsLimit] = useState<number>(15);

  const api = new PokemonClient();

  async function handlePokemonSpeciesReq() {
    // Ritorna tutti i pokemon
    await api.listPokemons(0, 903).then((res) => {
      setPokedex(res.results);
    });
  }

  function remainingPages(resultsPerPage: number, items: number | undefined) {
    if (items === undefined) {
      return 0;
    }
    return Math.floor(items / resultsPerPage) + 1;
  }

  function navigatePages(index: number, direction: "forward" | "backward", max?: number) {
    if (direction === "backward") {
      if (index > 1) {
        // Riduci l'indice di 1
        const newIndex = index - 1;
        // Setta lo stato
        setPageIndex(newIndex);
      }
    } else if (direction === "forward") {
      if (max && index < max) {
        // Incrementa l'indice
        const newIndex = index + 1;
        // Setta lo stato
        setPageIndex(newIndex);
      }
    }

  }

  function searchPokemon() {
    const filteredPokedex = pokedex?.filter((pokemon) =>
      pokemon.name.startsWith(searchParam.toLocaleLowerCase())
    );
    if (filteredPokedex) {
      setPageIndex(1);
      setFilteredPokedex(filteredPokedex);
    }
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
              ?.slice(resultsLimit * (pageIndex - 1), resultsLimit * pageIndex)
              .map((pokemon) => {
                return <PokeDisplay name={pokemon.name} />;
              })
          : pokedex
              ?.slice(resultsLimit * (pageIndex - 1), resultsLimit * pageIndex)
              .map((pokemon) => {
                return <PokeDisplay name={pokemon.name} />;
              })}
      </div>
      <div className="pokedex-pages">
        <div 
          className="backward-btn" 
          style={{borderColor: `${ pageIndex == 1 ? "var(--text-muted)" : "var(--text-accent)"}`}}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            navigatePages(pageIndex, "backward")}
          }>
          <HiBackward fill={`${ pageIndex == 1 ? "var(--text-muted)" : "var(--text-accent)"}`} />
        </div>
        <h1 className="text-navigation-500 t-normal disable-select">
          Page {pageIndex} of {remainingPages(resultsLimit, filteredPokedex ? filteredPokedex.length : pokedex?.length)}
        </h1>
        <div 
          className="forward-btn" 
          style={{borderColor: `${ pageIndex === remainingPages(resultsLimit, filteredPokedex ? filteredPokedex.length : pokedex?.length) ? "var(--text-muted)" : "var(--text-accent)"}`}}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            navigatePages(pageIndex, "forward", remainingPages(resultsLimit, filteredPokedex ? filteredPokedex.length : pokedex?.length))}
          }>
          <HiForward fill={`${ pageIndex === remainingPages(resultsLimit, filteredPokedex ? filteredPokedex.length : pokedex?.length) ? "var(--text-muted)" : "var(--text-accent)"}`} />
        </div>
      </div>
    </div>
  );
}

export default App;

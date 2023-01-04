import React, { useEffect, useState } from "react";
// Components
import TypeLabel from "../../components/labels/TypeLabel";
import SpriteViewer from "../../components/sprite-viewer/SpriteViewer";
import PokedexIndex from "../../components/podedex-index/PokedexIndex";
import PokemonStats from "../../components/pokemon-stats/PokemonStats";
// Pokenode
import { MainClient, Pokemon, PokemonClient } from "pokenode-ts";
// Utils
import { capitalize } from "../../utils/utils";
// Style
import "./PokeDisplay.scss";
import "../../abstract/_typography.scss"

export default function PokeDisplay(props: { name: string }) {
    const [pokemon, setPokemon] = useState<Pokemon>();

    const api = new MainClient();

    async function handlePokemonReq (name: string) {
        await api.pokemon.getPokemonByName(name).then(res => setPokemon(res))
    }

    useEffect(() => {
        handlePokemonReq(props.name);
    }, [])

    return (
        <div className="poke-display">
            <div className="poke-index">
                <h1 className="text-small-600 t-muted">POKEDEX N°</h1>
                <PokedexIndex pokedex_i={pokemon?.id} />
            </div>
            <div className="poke-types">
                <h1 className="text-small-600 t-muted">TYPES</h1>
                <div className="poke-types-labels">
                    {pokemon?.types.map( (type, i) => {
                        return <TypeLabel type_name={type} key={`${type.slot}-${i}`}/>
                    })}
                </div>
            </div>
            <div className="poke-pokemon">
                <SpriteViewer sprite_url={String(pokemon?.sprites.front_default)} />
                <div className="poke-name">{capitalize(props.name)}</div>
            </div>
            <div className="poke-stats">
                <h1 className="text-small-600 t-muted">BASE STATS</h1>
                <PokemonStats stats={pokemon?.stats} />
            </div>
            
        </div>
    )
}

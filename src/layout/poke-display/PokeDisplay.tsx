import React, { useEffect, useState } from "react";
// Components
import TypeLabel from "../../components/labels/TypeLabel";
import SpriteViewer from "../../components/sprite-viewer/SpriteViewer";
import PokedexIndex from "../../components/podedex-index/PokedexIndex";
import PokemonStats from "../../components/pokemon-stats/PokemonStats";
// Pokenode
import { MainClient, Pokemon, PokemonClient } from "pokenode-ts";
// Style
import "./PokeDisplay.scss"

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
                <PokedexIndex pokedex_i={pokemon?.id} />
            </div>
            <div className="poke-types">
                {pokemon?.types.map( (type, i) => {
                    return <TypeLabel type_name={type} key={`${type.slot}-${i}`}/>
                })}
            </div>
            <div className="poke-sprite">
                <SpriteViewer sprite_url={String(pokemon?.sprites.front_default)} />
            </div>
            <div className="poke-name">{props.name}</div>
            <div className="poke-stats">
                <PokemonStats stats={pokemon?.stats} />
            </div>
        </div>
    )
}

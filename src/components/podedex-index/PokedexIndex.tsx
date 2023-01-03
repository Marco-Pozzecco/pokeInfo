import React from "react";
// Style
import "./PokedexIndex.scss"

export default function PokedexIndex (props: {pokedex_i: number | undefined}) {

    return (
        <div className="pokedex-index">
            {props.pokedex_i}
        </div>
    )
}
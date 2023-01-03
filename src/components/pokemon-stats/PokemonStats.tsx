import { PokemonStat } from "pokenode-ts";
import React from "react";
// Style
import "./PokemonStats.scss"

export default function PokemonStats (props: {stats: PokemonStat[] | undefined}) {

    function totalStats (stats: PokemonStat[] | undefined) {
        let total = 0;
        stats?.forEach( (stat) => {
            total += stat.base_stat;
        }) 
        return total
    }

    return (
        <div className="pokemon-total-stats">
            {totalStats(props.stats)}
        </div>
    )
}
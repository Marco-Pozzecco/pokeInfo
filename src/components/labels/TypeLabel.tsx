import { PokemonType } from "pokenode-ts";
import React from "react";
import "./TypeLabel.scss";

export default function TypeLabel(props: { type_name: PokemonType }) {

    return (
        <div className={`label type-${props.type_name.type.name} text-info-500`} >
            {props.type_name.type.name}
        </div>
    )
}

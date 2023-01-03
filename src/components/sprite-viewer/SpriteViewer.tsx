import React from "react";
import "./SpriteViewer.scss"

export default function SpriteViewer(props: {sprite_url: string | undefined}) {

    return (
    <div className="sprite-viewer">
        <img src={props.sprite_url} className="sprite"/>
    </div>
    )
}
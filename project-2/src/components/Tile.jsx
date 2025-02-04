import React, { useState } from "react";

const Tile = (props) => {
    return (
        <li>
            <button
                className="square"
                onClick={() =>
                    props.handleClick(props.rowIndex, props.columnIndex)
                }
                disabled={props.playerSymbol !== null}
            >
                {props.playerSymbol}
            </button>
        </li>
    );
};

export default Tile;

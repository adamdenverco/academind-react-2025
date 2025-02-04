import React, { useState } from "react";

const Tile = (props) => {
    // const [tileValue, setTileValue] = useState(playerSymbol);

    return (
        <li>
            {/* {console.log("playerSymbol", props.playerSymbol)} */}
            <button
                className="square"
                onClick={() =>
                    props.handleClick(
                        props.rowIndex,
                        props.columnIndex,
                        props.whoseTurn
                    )
                }
            >
                {props.playerSymbol}
            </button>
        </li>
    );
};

export default Tile;

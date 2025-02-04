import React from "react";

const Log = ({ gameTurns }) => {
    return (
        <>
            <ol id="log">
                {gameTurns.map((gameTurn, index) => {
                    console.log("gameTurn", gameTurn);
                    let rowIndex = gameTurn.tile.row;
                    return (
                        <li key={index}>
                            Player {gameTurn.player} chose row{" "}
                            {gameTurn.tile.row}, column {gameTurn.tile.col}
                        </li>
                    );
                })}
            </ol>
        </>
    );
};

export default Log;

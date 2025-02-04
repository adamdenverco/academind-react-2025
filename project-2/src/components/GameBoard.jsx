import React, { useState } from "react";
import Tile from "./Tile";

// let initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ];

const GameBoard = ({
    whoseTurn,
    handleClick,
    playStatus,
    gameTurns,
    createGameBoard,
}) => {
    console.log("gameTurns", gameTurns);
    let updatedGameBoard = createGameBoard(gameTurns);
    console.log("updatedGameBoard", updatedGameBoard);

    return (
        <div>
            <h2>Gameboard</h2>
            {playStatus ? "" : <div>It is now {whoseTurn}'s turn</div>}
            <ol id="game-board">
                {updatedGameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, columnIndex) => (
                                <Tile
                                    key={columnIndex}
                                    rowIndex={rowIndex}
                                    columnIndex={columnIndex}
                                    playerSymbol={playerSymbol}
                                    handleClick={handleClick}
                                />
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default GameBoard;

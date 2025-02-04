import React, { useState } from "react";
import Tile from "./Tile";

const GameBoard = ({
    whoseTurn,
    setWhoseTurn,
    handleClick,
    playStatus,
    setPlayStatus,
    myGameBoard,
}) => {
    return (
        <div>
            <h2>Gameboard</h2>
            <div>
                {playStatus ? (
                    <>
                        {playStatus}{" "}
                        <button onClick={() => resetTheGame()}>
                            Play Again
                        </button>
                    </>
                ) : (
                    `It is now ${whoseTurn}'s turn`
                )}
            </div>
            <ol id="game-board">
                {myGameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, columnIndex) => (
                                <Tile
                                    key={columnIndex}
                                    rowIndex={rowIndex}
                                    columnIndex={columnIndex}
                                    playerSymbol={playerSymbol}
                                    handleClick={handleClick}
                                    whoseTurn={whoseTurn}
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

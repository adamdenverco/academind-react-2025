import React from "react";

const GameOver = ({ playStatus, resetTheGame }) => {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{playStatus}</p>
            <button onClick={() => resetTheGame()}>Play Again</button>
        </div>
    );
};

export default GameOver;

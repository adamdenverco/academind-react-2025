import React from "react";

const App = () => {
    return (
        <main>
            <div id="game-container">
                <ol>
                    <li>
                        <span className="player-name">Player 1</span>
                        <span className="player-symbol">X</span>
                    </li>
                    <li>
                        <span className="player-name">Player 2</span>
                        <span className="player-symbol">O</span>
                    </li>
                </ol>
                <div>Game Board</div>
            </div>
        </main>
    );
};

export default App;

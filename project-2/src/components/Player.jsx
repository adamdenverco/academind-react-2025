import React, { useState } from "react";

const Player = ({ name, symbol, whoseTurn }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    let extraClassName = whoseTurn === symbol ? "active" : "";

    return (
        <li className={extraClassName}>
            {/* {console.log("symbol", symbol)}
            {console.log("whoseTurn", whoseTurn)} */}
            <span className="player">
                <span className="player-name">
                    {!isEditable ? (
                        playerName
                    ) : (
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                    )}
                </span>
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => setIsEditable((editBool) => !editBool)}>
                {isEditable ? "save" : "edit"}
            </button>
        </li>
    );
};

export default Player;

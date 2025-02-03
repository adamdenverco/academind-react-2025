import React, { useState } from "react";

const Player = ({ name, symbol }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    return (
        <li>
            <>
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
                <button onClick={() => setIsEditable(!isEditable)}>
                    {isEditable ? "save" : "edit"}
                </button>
            </>
        </li>
    );
};

export default Player;

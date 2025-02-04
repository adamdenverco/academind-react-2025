import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

let initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function App() {
    // const [whoseTurn, setWhoseTurn] = useState("X");
    const [gameTurns, setGameTurns] = useState([]);
    const [playStatus, setPlayStatus] = useState(null);

    const findActivePlayer = () => {
        return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
    };

    let whoseTurn = findActivePlayer();

    const handleClick = (rowIndex, columnIndex) => {
        if (playStatus !== null) {
            return;
        }

        let newGameBoard = createGameBoard(gameTurns);

        if (newGameBoard[rowIndex][columnIndex] !== null) {
            return;
        }

        let currentPlayer = findActivePlayer();

        console.log("currentPlayer", currentPlayer);

        let updatedTurns = [
            {
                tile: { row: rowIndex, col: columnIndex },
                player: currentPlayer,
            },
            ...gameTurns,
        ];
        console.log("updatedTurns", updatedTurns);
        setGameTurns(updatedTurns);

        newGameBoard = createGameBoard(updatedTurns);
        console.log("newGameBoard 111", newGameBoard);

        console.log("newGameBoard", newGameBoard);

        if (determineWinnerOrDraw(newGameBoard, currentPlayer)) {
            // someone won or it's a draw
            return;
        }

        let nextPlayer = currentPlayer === "X" ? "O" : "X";
        whoseTurn = nextPlayer;

        console.log(
            `Looks like ${currentPlayer} din't win. It's now ${nextPlayer}'s turn.`
        );
    };

    const createGameBoard = (updatedTurns) => {
        let newGameBoard = [
            ...initialGameBoard.map((innerArray) => [...innerArray]),
        ];
        for (let index = 0; index < updatedTurns.length; index++) {
            let rowIndex = updatedTurns[index].tile.row;
            let colIndex = updatedTurns[index].tile.col;
            newGameBoard[rowIndex][colIndex] = updatedTurns[index].player;
        }
        return newGameBoard;
    };

    const determineWinnerOrDraw = (newGameBoard, currentPlayer) => {
        const winValue = currentPlayer + currentPlayer + currentPlayer;
        const tempBoard = newGameBoard;
        console.log("Did Someone Win?");
        console.log("tempBoard", tempBoard);
        if (
            tempBoard[0][0] + tempBoard[1][0] + tempBoard[2][0] === winValue ||
            tempBoard[0][1] + tempBoard[1][1] + tempBoard[2][1] === winValue ||
            tempBoard[0][2] + tempBoard[1][2] + tempBoard[2][2] === winValue ||
            tempBoard[0].join("") === winValue ||
            tempBoard[1].join("") === winValue ||
            tempBoard[2].join("") === winValue ||
            tempBoard[0][0] + tempBoard[1][1] + tempBoard[2][2] === winValue ||
            tempBoard[0][2] + tempBoard[1][1] + tempBoard[2][0] === winValue
        ) {
            console.log(`Looks like ${currentPlayer} won!`);
            setPlayStatus(`Congrats! ${currentPlayer} won`);
            return true;
        } else if (
            tempBoard[0].includes(null) === false &&
            tempBoard[1].includes(null) === false &&
            tempBoard[2].includes(null) === false
        ) {
            console.log(`No spaces left. It's a draw!`);
            setPlayStatus(`No spaces left. It's a draw!`);
            return true;
        }
        return false;
    };

    const resetTheGame = () => {
        console.log("set gameTurns []");
        setGameTurns([]);
        console.log("set playStatus null");
        setPlayStatus(null);
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name="Player 1" symbol="X" whoseTurn={whoseTurn} />
                    <Player name="Player 2" symbol="O" whoseTurn={whoseTurn} />
                </ol>
                {playStatus === null ? (
                    ""
                ) : (
                    <GameOver
                        playStatus={playStatus}
                        resetTheGame={resetTheGame}
                    />
                )}
                <GameBoard
                    whoseTurn={whoseTurn}
                    handleClick={handleClick}
                    playStatus={playStatus}
                    gameTurns={gameTurns}
                    createGameBoard={createGameBoard}
                />
            </div>
            <Log gameTurns={gameTurns} />
        </main>
    );
}

export default App;

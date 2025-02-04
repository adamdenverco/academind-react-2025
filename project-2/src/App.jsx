import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

let initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
function App() {
    // const [count, setCount] = useState(0);
    const [whoseTurn, setWhoseTurn] = useState("X");
    const [gameTurns, setGameTurns] = useState([]);
    const [playStatus, setPlayStatus] = useState(null);
    const [myGameBoard, setMyGameBoard] = useState(initialGameBoard);

    // const setWhoseTurnFunc = (symbol) => {
    //     setWhoseTurn(symbol);
    // };

    // console.log("whoseTurn", whoseTurn);

    const handleClick = (clickRowIndex, clickColumnIndex) => {
        if (playStatus !== null) {
            return;
        }
        if (myGameBoard[clickRowIndex][clickColumnIndex] !== null) {
            return;
        }

        let tempBoard = [...myGameBoard.map((innerArray) => [...innerArray])];
        tempBoard[clickRowIndex][clickColumnIndex] = whoseTurn;
        setMyGameBoard(tempBoard);
        // setGameTurns();

        if (didSomeoneWin()) {
            return;
        }

        setWhoseTurn(whoseTurn === "X" ? "O" : "X");
    };

    const didSomeoneWin = () => {
        const winValue = whoseTurn + whoseTurn + whoseTurn;
        const tempBoard = [
            ...myGameBoard.map((InternalArray) => [...InternalArray]),
        ];
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
            setPlayStatus(`Congrats! ${whoseTurn} won`);
            return true;
        }
        return false;
    };

    const resetTheGame = () => {
        setMyGameBoard(initialGameBoard);
        setWhoseTurn("X");
        setPlayStatus(null);
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name="Player 1" symbol="X" whoseTurn={whoseTurn} />
                    <Player name="Player 2" symbol="O" whoseTurn={whoseTurn} />
                </ol>
                <GameBoard
                    whoseTurn={whoseTurn}
                    setWhoseTurn={setWhoseTurn}
                    handleClick={handleClick}
                    playStatus={playStatus}
                    setPlayStatus={setPlayStatus}
                    myGameBoard={myGameBoard}
                />
            </div>
            <Log />
        </main>
    );
}

export default App;

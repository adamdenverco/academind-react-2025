// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./components/Player";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <main>
            <div id="game-container">
                <ol id="players">
                    <Player name="Player 1" symbol="x" />
                    <Player name="Player 2" symbol="0" />
                </ol>
                GAME BOARD
            </div>
            LOG
        </main>
    );
}

export default App;

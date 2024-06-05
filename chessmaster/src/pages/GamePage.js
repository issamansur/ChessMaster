import Board from "../components/Board";

import "./GamePage.css";
import PlayerBadge from "../components/PlayerBadge";

const GamePage = (props) => {
    const {
        player1,
        player2,
    } = { player1: "Player1", player2: "Player2"};

    function moveHandler(move) {
      console.log(move);
    }

    return (
        <div className="game-page">
            <div className="game-container">
                <PlayerBadge username={player1} position="left" />
                
                <div className="board-container">
                    <Board onMove={moveHandler} />
                </div>
                
                <PlayerBadge username={player2} position="right" />
            </div>
        </div>
    );
};

export default GamePage;
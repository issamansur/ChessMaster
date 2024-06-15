import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Board from "../components/Board";
import PlayerBadge from "../components/PlayerBadge";

import apimanager from "../api/apimanager";

import "./GamePage.css";

const GamePage = (props) => {
    const { gameid } = useParams();

    const [game, setGame] = useState(null);

    const {
        player1,
        player2,
    } = { player1: "Player1", player2: "Player2"};

    async function moveHandler(move) {
        await apimanager.moveGame(gameid, move);
    }

    useEffect(() => {
        async function fetchData() {
            const _game = await apimanager.getGame(gameid);
            await new Promise(resolve => setTimeout(resolve, 500));
            setGame(_game);
        }

        fetchData();
    }, [gameid]);

    return (
        <div className="game-page">
            <div className="game-container">
                <PlayerBadge username={game?.blackPlayerName} position="left" />
                
                <div className="board-container">
                    <Board fen={game?.fen} onMove={async (move) => moveHandler(move)} />
                </div>
                
                <PlayerBadge username={game?.whitePlayerName} position="right" />
            </div>
        </div>
    );
};

export default GamePage;
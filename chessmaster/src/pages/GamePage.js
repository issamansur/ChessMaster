import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Board from "../components/Board";
import PlayerBadge from "../components/PlayerBadge";

import apimanager from "../api/apimanager";

import "./GamePage.css";

const GamePage = (props) => {
    const { gameid } = useParams();

    const [game, setGame] = useState(null);

    async function moveHandler(move) {
        await apimanager.moveGame(gameid, move);
    }

    useEffect(() => {
        async function getGame() {
            let _game = await apimanager.getGame(gameid);
            if (_game === null) {
                return;
            }
            const _user1 = await apimanager.getUser(_game.blackPlayerId);
            const _user2 = await apimanager.getUser(_game.whitePlayerId);
            _game = {
                ..._game,
                blackPlayerName: _user1.username,
                whitePlayerName: _user2.username,
            };

            setGame(_game);
        }

        getGame();
    }, [gameid]);

    if (game?.fen === undefined) {
        return null;
    }

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
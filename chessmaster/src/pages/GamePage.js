import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Board from "../components/Board";
import UserBadge from "../components/UserBadge";

import apimanager from "../api/apimanager";

import "./GamePage.css";

const GamePage = (props) => {
    const navigate = useNavigate();

    const { gameid } = useParams();

    const [game, setGame] = useState(null);

    async function moveHandler(move) {
        await apimanager.moveGame(gameid, move);
    }

    function playerClickHandler(username) {
        navigate(`/users/${username}`);
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
                <UserBadge 
                    position="left"
                    username={game?.blackPlayerName}
                    avatar={true}
                    onClick={playerClickHandler}
                />
                <div className="board-container">
                    <Board fen={game?.fen} onMove={async (move) => moveHandler(move)} />
                </div>
                <UserBadge 
                    position="right"
                    username={game?.whitePlayerName}
                    avatar={true}
                    onClick={playerClickHandler} 
                />
            </div>
        </div>
    );
};

export default GamePage;
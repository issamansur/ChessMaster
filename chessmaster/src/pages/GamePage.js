import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Board from "../components/Board";
import UserBadge from "../components/UserBadge";

import apiManager from "../api/ApiManager";

import "./GamePage.css";
import { useUser } from "../contexts/UserContext";

const GamePage = (props) => {
    const navigate = useNavigate();

    const [user, _] = useUser();

    const { gameid } = useParams();

    const [game, setGame] = useState(null);

    async function moveHandler(move) {
        if (user?.id !== game.blackPlayerId && user?.id !== game.whitePlayerId) {
            return;
        }

        const _game = await apiManager.moveGame(gameid, move);
        if (_game.fen != game.fen) {
            setGame(_game);
        }
    }

    function playerClickHandler(username) {
        navigate(`/users/${username}`);
    }

    useEffect(() => {
        async function getGame() {
            let _game = await apiManager.getGame(gameid);
            if (_game === null) {
                return;
            }
            const _user1 = await apiManager.getUser(_game.blackPlayerId);
            const _user2 = await apiManager.getUser(_game.whitePlayerId);
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
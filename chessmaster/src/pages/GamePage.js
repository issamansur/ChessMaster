import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Board from "../components/Board";
import UserBadge from "../components/UserBadge";

import ApiManager from "../api/ApiManager";

import "./GamePage.css";
import { useUser } from "../contexts/UserContext";
import { Alert, TextInput } from "@gravity-ui/uikit";

const GamePage = (props) => {
    const navigate = useNavigate();

    const [user, _] = useUser();

    const { gameid } = useParams();

    const [game, setGame] = useState(null);
    const [players, setPlayers] = useState({
        whitePlayerName: null,
        blackPlayerName: null,
    });

    const apiManager = () => new ApiManager(user.token);

    const isUserPlaying = () => user?.id === game?.blackPlayerId || user?.id === game?.whitePlayerId;

    const isWhiteMove = game?.fen.split(" ")[1] === "w";

    const pollGameUpdates = async (currentFen) => {
        console.log("Polling game updates");

        const intervalId = setInterval(async () => {
            const _game = await apiManager().getGame(gameid);
            if (_game && _game.fen !== currentFen) {
                console.log("Game updated");
                setGame(_game);
                if (!isUserPlaying()) {
                    currentFen = _game.fen;
                }
                else {
                    clearInterval(intervalId);
                }
            }
        }, 1000);

        return () => clearInterval(intervalId);
    };

    async function moveHandler(move) {
        if (!isUserPlaying()) {
            return;
        }

        if (game.whitePlayerId === user.id && /^[a-z]/.test(move.figure)) {
            return;
        }

        if (game.blackPlayerId === user.id && /^[A-Z]/.test(move.figure)) {
            return;
        }

        const _move = move.figure + move.from + move.to + (move.promotion ? move.promotion : "");

        const _game = await apiManager().moveGame(gameid, _move);

        if (_game.message) {
            return false;
        }
        
        setGame(_game);
        pollGameUpdates(_game.fen);
        return true;
    }

    function playerClickHandler(username) {
        navigate(`/users/${username}`);
    }

    useEffect(() => {
        async function getGame() {
            let _game = await apiManager().getGame(gameid);

            if (!_game?.fen) {
                return null;
            }

            const _user1 = await apiManager().getUser(_game.whitePlayerId);
            const _user2 = await apiManager().getUser(_game.blackPlayerId);
    
            setPlayers({
                whitePlayerName: _user1.username,
                blackPlayerName: _user2.username,
            });
            setGame(_game);
            return _game;
        }

        getGame().then(
            (_game) =>
            {
                if (!_game?.fen) {
                    return null;
                }

                const _isWhiteMove = _game.fen.split(" ")[1] === "w";
                if (
                    !isUserPlaying() ||
                    (_isWhiteMove && user.id === _game.blackPlayerId) ||
                    (!_isWhiteMove && user.id === _game.whitePlayerId)
                ) {
                    pollGameUpdates(_game.fen);
                }
            }
        );
    }, []);

    if (game?.fen === undefined) {
        return null;
    }

    const usernameTop = game.blackPlayerId === user?.id ? players.whitePlayerName : players.blackPlayerName;
    const usernameBottom = game.blackPlayerId === user?.id ? players.blackPlayerName : players.whitePlayerName;

    return (
        <div className="game-page">
            <div className="game-container">
                <UserBadge
                    position="left"                    
                    username={
                        usernameTop
                    }
                    isActive={
                        (game.blackPlayerId === user?.id ? isWhiteMove : !isWhiteMove) && game.gameState !== 3
                    }
                    avatar={true}
                    onClick={playerClickHandler}
                />
                <div className="board-container">
                    <Board 
                        fen={game.fen} 
                        boardOrientation={game.blackPlayerId === user?.id ? "black" : "white"} 
                        arePiecesDraggable={isUserPlaying() && game.gameState !== 3}
                        onMove={async (move) => await moveHandler(move)} 
                    />
                </div>
                <UserBadge 
                    position="right"
                    username={
                        usernameBottom
                    }
                    isActive={
                        (game.blackPlayerId === user?.id ? !isWhiteMove : isWhiteMove) && game.gameState !== 3
                    }
                    avatar={true}
                    onClick={playerClickHandler} 
                />
            </div>
            <div className="game-chat">
                <div className="chat-messages">
                </div>
                <TextInput
                    size="l"
                    placeholder="Message"
                />
            </div>
        </div>
    );
};

export default GamePage;
import { useEffect, useState } from "react";

import { Button } from "@gravity-ui/uikit";
import Board from "../components/Board";

import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ApiManager from "../api/ApiManager";

import "./MainPage.css";

const MainPage = () => {
    const [user, _] = useUser();

    const [currentFen, setCurrentFen] = useState("start");
    const [isWaiting, setIsWaiting] = useState(false);

    const navigate = useNavigate();

    const showGame = () => {
        const game = [
            // start
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            // 1. e4 e5
            "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 1",
            // 2. Nf3 d6
            "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 1",
            "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1",
            // 3. Bc4 Nc6
            "rnbqkbnr/ppp2ppp/3p4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1",
            "r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
            // 4. Nc3 Bg4
            "r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 1",
            "r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
            // 5. Ne5 Bxd1
            "r2qkbnr/ppp2ppp/2np4/4N3/2B1P1b1/2N5/PPPP1PPP/R1BQK2R b KQkq - 0 1",
            "r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 1",
            // 6. Bxf7+ Ke7
            "r2qkbnr/ppp2Bpp/2np4/4N3/4P3/2N5/PPPP1PPP/R1BbK2R b KQkq - 0 1",
            "r2q1bnr/ppp1kBpp/2np4/4N3/4P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 1",
            // 7. Nd5#
            "r2q1bnr/ppp1kBpp/2np4/3NN3/4P3/8/PPPP1PPP/R1BbK2R b KQkq - 0 1"
        ].reverse();

        const intervalId = setInterval(() => {
            if (game.length === 0) {
                clearInterval(intervalId);
                return;
            }
            setCurrentFen(game.pop());
        }, 1000);

        return () => clearInterval(intervalId);
    };

    const waitingEnemy = async (_gameId) => {
        return new Promise((resolve) => {
            const apiManager = new ApiManager(user.token);

            const intervalId = setInterval(async () => {
                const __game = await apiManager.getGame(_gameId);
                console.log(__game);
                if (__game.gameState === 2) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1000);
        });
    };

    async function fastPlayHandler() {
        console.log("Fast play");

        if (user?.token === "") {
            return;
        }

        const apiManager = new ApiManager(user.token);
        const response = await apiManager.searchFreeGames();
        const _freeGames = response.games;
        let _gameId;
        if (_freeGames.length === 0) {
            setIsWaiting(true);

            const _game = await apiManager.createGame();
            _gameId = _game.gameId;

            await waitingEnemy(_gameId);
            
            setIsWaiting(false);
        } else {
            _gameId = _freeGames[0].id;

            await apiManager.joinGame(_gameId);
        }
        
        navigate(`/games/${_gameId}`);
    }

    useEffect(() => {
        showGame();
    }, []);

    return (
        <div className="main-page">
            <div className="game-container">
                <div className="board-container">
                    <Board 
                        fen={currentFen}
                        boardOrientation="white"
                        arePiecesDraggable={false}
                    />
                </div>
            </div>

            <div className="actions-container">
                <Button 
                    size="l" 
                    view="outlined"
                    disabled={user?.token === ""}
                >
                    Create Game
                </Button>
                <Button 
                    size="l" 
                    view="action"
                    disabled={user?.token === ""}
                    loading={isWaiting}
                    onClick={ async () => fastPlayHandler() }
                >
                    Fast play
                </Button>
                <Button 
                    size="l" 
                    view="outlined"
                    disabled={user?.token === ""}
                >
                    Join Game
                </Button>
            </div>
        </div>
    );
}

export default MainPage;
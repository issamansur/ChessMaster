import { useEffect, useState } from "react";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";


const Board = (props) => {
    const { fen, onMove } = props;
    const [game, setGame] = useState(null);

    useEffect(() => {
        console.log(fen);
        setGame(new Chess(fen));
    }, [fen]);

    function boardMove(from, to) {
        const move = {
            from: from,
            to: to,
            promotion: "q",
        };

        try {
            game.move(move);
            const lastMove = getLastMove(game);
            setGame(new Chess(game.fen()));
            onMove(lastMove);
        } catch (error) {
            return false;
        }
    }

    function getLastMove(game) {
        const history = game.history({ verbose: true });
        const lastMove = history[history.length - 1];

        let move = {
            figure: lastMove.color === "w" ? 
                lastMove.piece.toUpperCase() : lastMove.piece,
            from: lastMove.from,
            to: lastMove.to,
            promotion: lastMove.promotion ?? null,
        };

        return move;
    }

    return (
        <Chessboard 
            position={game?.fen()} 
            onPieceDrop={boardMove}
        />
    )
};

export default Board;
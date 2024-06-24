import { Chessboard } from "react-chessboard";


const Board = (props) => {
    const { 
        fen, 
        boardOrientation, 
        arePiecesDraggable, 
        onMove 
    } = props;

    async function boardMove(from, to, piece) {
        const move = {
            figure: piece[0] == "w" ? piece[1].toUpperCase() : piece[1].toLowerCase(),
            from: from,
            to: to,
        };

        return await onMove(move);
    }

    return (
        <Chessboard 
            position={fen} 
            boardOrientation={boardOrientation}
            arePiecesDraggable={arePiecesDraggable}
            onPieceDrop={(from, to, piece) => boardMove(from, to, piece)}
        />
    )
};

export default Board;
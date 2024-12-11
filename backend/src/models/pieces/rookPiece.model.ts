import chessPieceModel from "../chessPiece.model";
import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class RookPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): RookPiece {
        return ChessPiece.createInstance("rook", color, position, gameId) as RookPiece;
    }

    public async moveTo(position: string): Promise<void> {
        await chessPieceServices.moveTo(this, position);
    }

}

export default RookPiece;
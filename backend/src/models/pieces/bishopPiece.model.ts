import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class BishopPiece extends ChessPiece {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): BishopPiece {
        return ChessPiece.createInstance("bishop", color, position, gameId) as BishopPiece;
    }

    public async moveTo(position: string): Promise<void> {
        await chessPieceServices.moveTo(this, position);
    }

}

export default BishopPiece;
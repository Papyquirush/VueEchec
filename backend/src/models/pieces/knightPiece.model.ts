import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";

class KnightPiece extends ChessPiece {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): KnightPiece {
        return ChessPiece.createInstance("knight", color, position, gameId) as KnightPiece;
    }

    public async moveTo(position: string): Promise<void> {
        await chessPieceServices.moveTo(this, position);
    }

}

export default KnightPiece;
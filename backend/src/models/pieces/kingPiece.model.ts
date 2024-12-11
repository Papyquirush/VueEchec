import chessPieceModel from "../chessPiece.model";
import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class KingPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): KingPiece {
        return ChessPiece.createInstance("king", color, position, gameId) as KingPiece;
    }

    public async moveTo(position: string): Promise<void> {
        await chessPieceServices.moveTo(this, position);
    }


}

export default KingPiece;
import ChessPiece from "../chessPiece.model";
import RookPiece from "../pieces/rookPiece.model";
import chessPieceService from "../../services/chessPiece.services";
import { chessPieceDto } from "../../dto/chessPiece.dto";

class Gamestate {
    public whitePieces: { [key: string]: chessPieceDto };
    public blackPieces: { [key: string]: chessPieceDto };
    public gameId: number;

    constructor(gameId: number) {
        this.whitePieces = {};
        this.blackPieces = {};
        this.gameId = gameId;
    }

    async initStartGame(gameId: number) {
        // Exemple d'initialisation des pions blancs
        for (let i = 0; i < 8; i++) {
            let piece = await chessPieceService.createChessPiece('pawn', 'white', `a${i+1}`, gameId);
            this.whitePieces[piece.position] = piece;
        }
    }

    public toJson(): any {
        const result: { [key: string]: string } = {};
        for (const key in this.whitePieces) {
            const piece = this.whitePieces[key];
            result[piece.position] = piece.pieceType;
        }
        for (const key in this.blackPieces) {
            const piece = this.blackPieces[key];
            result[piece.position] = piece.pieceType;
        }
        return result;
    }
}

export default Gamestate;
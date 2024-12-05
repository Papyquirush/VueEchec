import {chessPieceDto} from "../dto/chessPiece.dto";
import {notFound} from "../error/NotFoundError";
import ChessPiece  from "../models/chessPiece.model";
import {ChessPieceMapper} from "../mapper/chessPiece.mapper";
import PawnPiece from "../models/pieces/pawnPiece.model";

const pieceTypeMap: { [key: string]: typeof ChessPiece } = {
    'pawn': PawnPiece,
    // Ajouter d'autres types de pièces ici
};

export class ChessPieceService {
    public async getAllChessPieces(): Promise<chessPieceDto[]> {
        return ChessPieceMapper.toOutputDtoList( await ChessPiece.findAll());
    }

    public async getChessPieceById(id: number): Promise<chessPieceDto> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            return ChessPieceMapper.toOutputDto(chessPiece);
        } else {
            notFound("ChessPiece");
        }
    }

    public async createChessPiece(
        pieceType: string,
        color: string,
        position: string,
        gameId: number,
    ): Promise<chessPieceDto> {
        const PieceClass = pieceTypeMap[pieceType.toLowerCase()] || ChessPiece;
        const chessPiece = PieceClass.createInstance(pieceType, color, position, gameId);
        await chessPiece.save();
        return ChessPieceMapper.toOutputDto(chessPiece);
    }

    public async updateChessPiece(
        id: number,
        pieceType: string,
        color: string,
        position: string,
        gameId: number,
    ): Promise<chessPieceDto> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            if(pieceType !== "") chessPiece.piece_type = pieceType;
            if(color !== "") chessPiece.color = color;
            if(position !== "") chessPiece.position = position;
            if(gameId !== -1) chessPiece.game_id = gameId;
            await chessPiece.save();
            return ChessPieceMapper.toOutputDto(chessPiece);
        } else {
            notFound("ChessPiece");
        }
    }

    public async deleteChessPiece(id: number): Promise<void> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            await chessPiece.destroy();
        } else {
            notFound("ChessPiece");
        }
    }

    public async getSlotsAvailable(position: string,gameId : number): Promise<string[]> {
        let chessPiece = await ChessPiece.findOne({where: {position: position, game_id: gameId}});
        if (chessPiece) {
            return chessPiece.getSlotsAvailable();
        } else {
            notFound("ChessPiece");
        }
    }


}

export default new ChessPieceService();
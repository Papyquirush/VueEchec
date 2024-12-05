import {chessPieceDto} from "../dto/chessPiece.dto";
import {notFound} from "../error/NotFoundError";
import ChessPiece from "../models/chessPiece.model";
import {ChessPieceMapper} from "../mapper/chessPiece.mapper";
import PawnPiece from "../models/pieces/pawnPiece.model";
import KingPiece from "../models/pieces/kingPiece.model";
import QueenPiece from "../models/pieces/queenPiece.model";
import BishopPiece from "../models/pieces/bishopPiece.model";
import KnightPiece from "../models/pieces/knightPiece.model";
import RookPiece from "../models/pieces/rookPiece.model";
import Gamestate from "../models/object/gamestate";

const pieceTypeMap: { [key: string]: typeof ChessPiece } = {
    'pawn': PawnPiece,
    'rook': RookPiece,
    'knight': KnightPiece,
    'bishop': BishopPiece,
    'queen': QueenPiece,
    'king': KingPiece,
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


    public async getChessPieces(id: number): Promise<ChessPiece> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            return this.convertToSpecificPiece(chessPiece);
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
        hasMoved: boolean
    ): Promise<chessPieceDto> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            if(pieceType !== "") chessPiece.piece_type = pieceType;
            if(color !== "") chessPiece.color = color;
            if(position !== "") chessPiece.position = position;
            if(gameId !== -1) chessPiece.game_id = gameId;
            if(hasMoved !== undefined) chessPiece.has_moved = hasMoved;
            await chessPiece.save();
            return ChessPieceMapper.toOutputDto(chessPiece);
        } else {
            notFound("ChessPiece");
        }
    }

    public async moveTo(id: number, position: string): Promise<void> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            let specificChessPiece = this.convertToSpecificPiece(chessPiece);
            await specificChessPiece.moveTo(position);
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

    private convertToSpecificPiece(chessPiece: ChessPiece): ChessPiece {
        let PieceClass = pieceTypeMap[chessPiece.piece_type.toLowerCase()] || ChessPiece;
        return Object.assign(new PieceClass(), chessPiece);
    }

    public async getSlotsAvailable(position: string, gameId: number): Promise<string[]> {
        let chessPiece = await ChessPiece.findOne({ where: { position: position, game_id: gameId } });
        if (chessPiece) {
            let specificChessPiece = this.convertToSpecificPiece(chessPiece);
            return await specificChessPiece.getSlotsAvailable();
        } else {
            notFound("ChessPiece");
        }
    }

    public async isChessPieceInPosition(position: string,gameId : number): Promise<boolean> {
        let chessPiece = await ChessPiece.findOne({where: {position: position, game_id: gameId}});
        return chessPiece !== null;
    }



}

export default new ChessPieceService();
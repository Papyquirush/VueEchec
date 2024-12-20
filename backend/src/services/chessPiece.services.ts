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
import {gameService} from "./game.services";
import { GameDTO } from "../dto/game.dto";
import { all } from "axios";

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


    public async getChessPiece(id: number): Promise<ChessPiece> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            return this.convertToSpecificPiece(chessPiece);
        } else {
            notFound("ChessPiece");
        }
    }

    public async getChessPiecesByGameAndPosition(gameId: number,position : string): Promise<chessPieceDto> {
        let chessPiece = await ChessPiece.findOne({ where: { position: position, game_id: gameId } });
        if (chessPiece) {
            return ChessPieceMapper.toOutputDto(this.convertToSpecificPiece(chessPiece));
        } else {
            notFound("ChessPiece");
        }
    }

    public async moveTo(piece : ChessPiece ,position: string): Promise<void> {
        const oldPosition = piece.position;
        let slots = await piece.getSlotsAvailable();
        if (slots.includes(position)) {
            piece.position = position;
            piece.has_moved = true;
            await gameService.nextTurn(piece.game_id, oldPosition, position);
            await this.updateChessPiece(piece.id, piece.piece_type, piece.color, position, piece.game_id, piece.has_moved);
        }
    }

    public async getChessPieceByPosition(position: string, gameId: number): Promise<ChessPiece> {
        let chessPiece = await ChessPiece.findOne({where: {position: position, game_id: gameId}});
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




    public async deleteChessPiece(id: number): Promise<void> {
        let chessPiece = await ChessPiece.findByPk(id);
        if (chessPiece) {
            await gameService.deleteChessPiece(chessPiece.game_id,chessPiece.position);
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

    public async isTwoPiecesInSameColor(position1: string, position2: string, gameId: number): Promise<boolean> {
        let firstChessPiece = await ChessPiece.findOne({where: {position: position1, game_id: gameId}});
        let secondChessPiece = await ChessPiece.findOne({where: {position: position2, game_id: gameId}});
        if (firstChessPiece && secondChessPiece) {
            return firstChessPiece.color === secondChessPiece.color;
        } else {
            return false;
        }
    }

    public async isTurn(gameId: number, color: string): Promise<boolean> {
        let game = await gameService.getGameById(gameId);
        return game.turnCount % 2 === 0 ? color === "white" : color === "black";
    }

    public async isCheck(gameId: number): Promise<boolean> {
        let game = await gameService.getGameById(gameId);
        if(game){
            let kingPiece = game.turnCount % 2 === 0 ? await ChessPiece.findOne({where: {piece_type: "king", color: "white", game_id: gameId}})
                            : await ChessPiece.findOne({where: {piece_type: "king", color: "black", game_id: gameId}});
            if(kingPiece){
                return await this.isCheckPosition(game,kingPiece.position);
            }
        }
        return false;
    }

    public async isCheckPosition(game:GameDTO,kingPosition:string):Promise<boolean>{
        let opponentPieces = game.turnCount % 2 === 0 ? await ChessPiece.findAll({where: {color: "black", game_id: game.id}})
                                    : await ChessPiece.findAll({where: {color: "white", game_id: game.id}});
        for(let piece of opponentPieces){
            let specificPiece = this.convertToSpecificPiece(piece);
            let slots = await specificPiece.getSlotsAvailable();
            if(slots.includes(kingPosition)){
                return true;
            }
        }
        return false;
    }

    public async slotsAvailableForOutOfCheck(gameId: number): Promise<Map<chessPieceDto,string[]>> {
        let posibilities = new Map<chessPieceDto,string[]>();
        let game = await gameService.getGameById(gameId);
        let fictiveGameMap = await gameService.createFictiveGameByOtherGame(game.id);
        let fictiveGame = fictiveGameMap.keys().next().value;
        let fictiveChessPieces = fictiveGameMap.values().next().value;
        let isWhiteTurn = game.turnCount % 2 === 0;
        let kingPiece = isWhiteTurn ? fictiveChessPieces?.find(piece => piece.piece_type === "king" && piece.color === "white") : undefined;
        if (kingPiece && fictiveGame && fictiveChessPieces) {
            if(await this.isCheckPosition(fictiveGame, kingPiece.position)){
                let allPieces = isWhiteTurn ? fictiveChessPieces.filter(piece => piece.color === "white") : fictiveChessPieces.filter(piece => piece.color === "black");
                for(let piece of allPieces){
                    let specificPiece = this.convertToSpecificPiece(piece);
                    let slots = await specificPiece.getSlotsAvailable();
                    for (let slot of slots){
                        let oldPosition = specificPiece.position;
                        specificPiece.position = slot;
                        let isCheck = specificPiece.piece_type === "king" ? await this.isCheckPosition(fictiveGame, specificPiece.position): await this.isCheckPosition(fictiveGame, kingPiece.position);
                        if(!isCheck){
                            let pieceDto = ChessPieceMapper.toOutputDto(piece);
                            let slotsAvailable = posibilities.get(pieceDto) || [];
                            slotsAvailable.push(slot);
                            posibilities.set(pieceDto, slotsAvailable);
                        }
                        specificPiece.position = oldPosition;
                    }
                }
            }
            else{return notFound('notCheck');}
        }
        
        return posibilities;
    }


}

export default new ChessPieceService();
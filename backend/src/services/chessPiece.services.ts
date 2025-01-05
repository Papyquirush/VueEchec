import {chessPieceDto} from "../dto/chessPiece.dto";
import {notFound} from "../error/NotFoundError";
import ChessPiece from "../models/chessPiece.model";
import {ChessPieceMapper} from "../mapper/chessPiece.mapper";
import PawnPiece from "../models/pieces/pawnPiece";
import KingPiece from "../models/pieces/kingPiece";
import QueenPiece from "../models/pieces/queenPiece";
import BishopPiece from "../models/pieces/bishopPiece";
import KnightPiece from "../models/pieces/knightPiece";
import RookPiece from "../models/pieces/rookPiece";
import Gamestate from "../models/object/gamestate";
import {gameService} from "./game.services";
import { GameDTO } from "../dto/game.dto";
import { all } from "axios";
import {CONSTRAINT} from "sqlite3";

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

    public async getChessPiecesByGameAndPosition(gameId: number,position : string): Promise<chessPieceDto> {
        let chessPiece = await ChessPiece.findOne({ where: { position: position, game_id: gameId, is_captured: false } });
        if (chessPiece) {
            return ChessPieceMapper.toOutputDto(this.convertToSpecificPiece(chessPiece));
        } else {
            notFound("ChessPiece");
        }
    }

    public async moveTo(piece : ChessPiece ,position: string): Promise<void> {
        const oldPosition = piece.position;
        let slots = await piece.getSlotsAvailable(false);
        let resetRuleFiftyMoves = false;
        if (slots.includes(position)) {
            if (piece instanceof KingPiece && slots.includes("roque") && ( piece.color=="white" && (position === "g1" || position === "c1") || (piece.color=="black" && (position === "g8" || position === "c8"))) ) {
                {
                    await piece.roque(piece, position);
                    piece.position = position;
                    piece.has_moved = true;
                    await this.updateChessPiece(piece.id, piece.piece_type, piece.color, position, piece.game_id, piece.has_moved);
                    return;
                }
            }
            if(piece instanceof PawnPiece){
                resetRuleFiftyMoves = true;
            }
            if(piece instanceof PawnPiece && slots.includes("passant")){
                await piece.passant(position);
            }


            if (await this.isChessPieceInPosition(position, piece.game_id) && !await this.isTwoPiecesInSameColor(piece.position, position, piece.game_id)) {
                let chessPiece = await this.getChessPieceByPosition(position, piece.game_id);
                resetRuleFiftyMoves = true;
                await this.deleteChessPiece(chessPiece.id);
            }

            piece.position = position;
            piece.has_moved = true;
            await gameService.nextTurn(piece.game_id, oldPosition, position,resetRuleFiftyMoves);
            await this.updateChessPiece(piece.id, piece.piece_type, piece.color, position, piece.game_id, piece.has_moved);
            }
    }


    public async getChessPieceByPosition(position: string, gameId: number): Promise<ChessPiece> {
        let chessPiece = await ChessPiece.findOne({where: {position: position, game_id: gameId, is_captured: false}});
        if (chessPiece) {
            return this.convertToSpecificPiece(chessPiece);
        } else {
            notFound("ChessPiece");
        }
    }

    public async getChessPieceByPositionWithDTO(position: string, game: GameDTO): Promise<ChessPiece> {
        if(game.gameState[position]){
            let piece = new ChessPiece();
            piece.color = game.gameState[position].color;
            piece.piece_type = game.gameState[position].pieceType;
            piece.position = position;
            piece.game_id = game.id;
            return this.convertToSpecificPiece(piece);
        }else{
            
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
            chessPiece.is_captured = true;
            await chessPiece.save();
            await gameService.deleteChessPiece(chessPiece.game_id,chessPiece.position);
        } else {
            notFound("ChessPiece");
        }
    }

    public convertToSpecificPiece(chessPiece: ChessPiece): ChessPiece {
        let PieceClass = pieceTypeMap[chessPiece.piece_type.toLowerCase()] || ChessPiece;
        return Object.assign(new PieceClass(), chessPiece);
    }

    public async getSlotsAvailable(position: string, gameId: number): Promise<string[]> {
        let chessPiece = await ChessPiece.findOne({ where: { position: position, game_id: gameId, is_captured : false } });
        if (chessPiece) {
            let specificChessPiece = this.convertToSpecificPiece(chessPiece);
            return await specificChessPiece.getSlotsAvailable(false);
        } else {
            notFound("ChessPiece");
        }
    }

    public async isChessPieceInPosition(position: string,gameId : number): Promise<boolean> {
        let chessPiece = await ChessPiece.findOne({where: {position: position, game_id: gameId, is_captured: false}});
        return chessPiece !== null;
    }

    public async isChessPieceInPositionWithDTO(position: string,game : GameDTO): Promise<boolean> {
        if(game.gameState[position] && game.gameState[position].color){
            return true;
        }else{
            return false;
        }
    }

    public async isTwoPiecesInSameColor(position1: string, position2: string, gameId: number): Promise<boolean> {
        let firstChessPiece = await ChessPiece.findOne({where: {position: position1, game_id: gameId,is_captured : false}});
        let secondChessPiece = await ChessPiece.findOne({where: {position: position2, game_id: gameId,is_captured : false}});
        if (firstChessPiece && secondChessPiece) {
            return firstChessPiece.color === secondChessPiece.color;
        } else {
            return false;
        }
    }

    public async isTwoPiecesInSameColorWithDTO(position1: string, position2: string, game: GameDTO): Promise<boolean> {
        if(game.gameState[position1] && game.gameState[position2]){
            return game.gameState[position1].color === game.gameState[position2].color;
        }else{
            return false;
        }
    }

    public async isTurnWithDTO(game: GameDTO, color: string): Promise<boolean> {
        return game.turnCount % 2 === 0 ? color === "white" : color === "black";
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
    public async getKingPosition(game:GameDTO, color: string): Promise<string> {
        for(let position in game.gameState){
            if(game.gameState[position].color === color && game.gameState[position].pieceType === "king"){
                return position;
            }
        }
        return "";
    }
    public async isCheckPosition(game:GameDTO,kingPosition:string,newPiecePosition:string[]=[]):Promise<boolean>{
        //let opponentPieces = game.turnCount % 2 === 0 ? await ChessPiece.findAll({where: {color: "black", game_id: game.id}})
        //                            : await ChessPiece.findAll({where: {color: "white", game_id: game.id}});
        let opponentPieces = [];
        for(let position in game.gameState){
            if(game.gameState[position] && game.gameState[position].color === (game.turnCount % 2 === 0 ? "black" : "white")){
                let piece = new ChessPiece();
                piece.color = game.gameState[position].color;
                piece.piece_type = game.gameState[position].pieceType;
                piece.position = position;
                piece.game_id = game.id;
                opponentPieces.push(piece);
            }
        }
        if(newPiecePosition.length > 0){
            let piece = game.gameState[newPiecePosition[0]];
            let currentPieceInThisPosition = game.gameState[newPiecePosition[1]];
            //game.gameState[newPiecePosition[0]] = oldPiece;
            game.gameState[newPiecePosition[1]] = piece;
            game.gameState[newPiecePosition[0]] = {};

        }
        for(let piece of opponentPieces){
            let specificPiece = this.convertToSpecificPiece(piece);
            let slots = await specificPiece.getSlotsAvailable(true,game);
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
        let kingPiece = isWhiteTurn ? fictiveChessPieces?.find(piece => piece.piece_type === "king" && piece.color === "white") : fictiveChessPieces?.find(piece => piece.piece_type === "king" && piece.color === "black");
        if (kingPiece && fictiveGame && fictiveChessPieces) {
            if(await this.isCheckPosition(fictiveGame, kingPiece.position)){
                let allPieces = isWhiteTurn ? fictiveChessPieces.filter(piece => piece.color === "white") : fictiveChessPieces.filter(piece => piece.color === "black");
                for(let piece of allPieces){
                    let specificPiece = this.convertToSpecificPiece(piece);
                    let slots = await specificPiece.getSlotsAvailable(true,game);
                    for (let slot of slots){
                        
                        let oldPosition = specificPiece.position;
                        let oldPositionValue = fictiveGame.gameState[slot];
                        fictiveGame.gameState[slot]={color:specificPiece.color,pieceType:specificPiece.piece_type};
                        fictiveGame.gameState[oldPosition]={};
                        specificPiece.position = slot;
                        let isCheck = specificPiece.piece_type === "king" ? await this.isCheckPosition(fictiveGame, specificPiece.position): await this.isCheckPosition(fictiveGame, kingPiece.position);
                        if(!isCheck){
                            let pieceDto = ChessPieceMapper.toOutputDto(piece);
                            pieceDto.position = oldPosition;
                            let slotsAvailable = posibilities.get(pieceDto) || [];
                            slotsAvailable.push(slot);
                            posibilities.set(pieceDto, slotsAvailable);

                        }
                        specificPiece.position = oldPosition;
                        fictiveGame.gameState[oldPosition]={color:specificPiece.color,pieceType:specificPiece.piece_type};
                        fictiveGame.gameState[slot]=oldPositionValue;
                    }
                }
                if(posibilities.size === 0){
                    const winnerId = game.turnCount % 2 === 0 ? game.playerBlackId : game.playerWhiteId;
                    if (winnerId !== null) {
                        gameService.finishGame(game.id, winnerId);
                    } else {
                        throw new Error("Winner ID is null");
                    }
                }
            }
            else{

                return notFound('notCheck');
            }
        }
        return posibilities;
    }

    public async removeSlotAvailablesForInCheck(game:GameDTO,slotsAvailable:string[],piecePosition:string){
        let kingPosition = await this.getKingPosition(game,game.turnCount % 2 === 0 ? "white" : "black");
        //let opponentPieces = game.turnCount % 2 === 0 ? await ChessPiece.findAll({where: {color: "black", game_id: game.id}})
         //                           : await ChessPiece.findAll({where: {color: "white", game_id: game.id}});
        let opponentPieces = [];
        for(let position in game.gameState){
            if(game.gameState[position].color === (game.turnCount % 2 === 0 ? "black" : "white")){
                let piece = new ChessPiece();
                piece.color = game.gameState[position].color;
                piece.piece_type = game.gameState[position].pieceType;
                piece.position = position;
                piece.game_id = game.id;
                opponentPieces.push(piece);
            }
        }

        let excludedSlots = [];
        for(let slot of slotsAvailable){
            if(game.gameState[piecePosition].pieceType === "king"){
                kingPosition = slot;
            }
            let oldPiece = game.gameState[slot];
            game.gameState[slot] = {color:game.gameState[piecePosition].color,pieceType:game.gameState[piecePosition].pieceType};
            game.gameState[piecePosition] = {};
            for(let piece of opponentPieces){
                let specificPiece = this.convertToSpecificPiece(piece);
                let slots = await specificPiece.getSlotsAvailable(true,game);
                if(slots.includes(kingPosition)){
                    let index = slotsAvailable.indexOf(slot);
                    if (index > -1) {
                        excludedSlots.push(slot);
                    }
                }
            }
            game.gameState[piecePosition] = {color:game.gameState[slot].color,pieceType:game.gameState[slot].pieceType};
            game.gameState[slot] = oldPiece;
        }
        console.log(slotsAvailable.filter(slot => !excludedSlots.includes(slot)));
        return slotsAvailable.filter(slot => !excludedSlots.includes(slot));       
    }
}

export default new ChessPieceService();
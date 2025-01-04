import { GameDTO, CreateGameDTO } from "../dto/game.dto";
import { Op } from "sequelize";
import Game from "../models/game.model";
import { GameMapper } from "../mapper/game.mapper";
import { notFound } from "../error/NotFoundError";
import  GameState  from "../models/object/gamestate";
import moveServices from "./move.services";
import gamestate from "../models/object/gamestate";
import ChessPiece from "../models/chessPiece.model";

export class GameService {
    public async getGames(): Promise<GameDTO[]> {
        let gameList = await Game.findAll();
        return GameMapper.toDTOList(gameList);
    }

    public async getGameById(id: number): Promise<GameDTO> {
        let game = await Game.findByPk(id);
        if (game) {
            const gameDTO = GameMapper.toDTO(game);
            gameDTO.gameState = typeof gameDTO.gameState === 'string' ? JSON.parse(gameDTO.gameState) : gameDTO.gameState;
            return gameDTO;
        } else {
            notFound("Game");
        }
    }

    public async createGame(playerWhiteId: number | undefined, playerBlackId: number | undefined, isPublic: boolean): Promise<GameDTO> {
        let game = GameMapper.toDTO(await Game.create({
            player_white_id: playerWhiteId,
            player_black_id: playerBlackId,
            is_public: isPublic,
            game_state: {},
            is_finished: false,
            winner_id: null,
            created_at: new Date(),
            turn_count: 0
        }));
        let gameState = new GameState(game.id);
        await gameState.initStartGame(game.id);
        return await this.updateGame(game.id, playerWhiteId, playerBlackId, isPublic, gameState.pieces, false, undefined, 0);
    }

    public async updateGame(id: number, playerWhiteId: number | undefined, playerBlackId: number | undefined, isPublic: boolean, gameState: {
        [key: string]: { [key: string]: string }
    }, isFinished: boolean, winnerId: number | undefined, turnCount: number): Promise<GameDTO> {
        let game = await Game.findByPk(id);
        if (game) {
            if (playerWhiteId) game.player_white_id = playerWhiteId;
            if (playerBlackId) game.player_black_id = playerBlackId;
            if (isPublic) game.is_public = isPublic;
            if (gameState) game.game_state = gameState;
            if (isFinished) game.is_finished = isFinished;
            if (winnerId) game.winner_id = winnerId;
            game.turn_count = turnCount;
            await game.save();
            const gameDTO = GameMapper.toDTO(game);
            gameDTO.gameState = typeof gameDTO.gameState === 'string' ? JSON.parse(gameDTO.gameState) : gameDTO.gameState;
            return gameDTO;
        } else {
            notFound("Game");
        }
    }

    public async nextTurn(id: number, oldPosition: string, position: string) {
        let game = await Game.findByPk(id);
        if (game) {
            let gameState = new GameState(game.id);
            gameState.pieces = typeof game.game_state === 'string'
                ? JSON.parse(game.game_state)
                : JSON.parse(JSON.stringify(game.game_state));

            await gameState.updateGameState(oldPosition, position);

            if (gameState.pieces[position].color === 'white') {
                await moveServices.createMove(game.id, game.turn_count, game.player_white_id, game.id, oldPosition, position, 0);
            } else {
                await moveServices.createMove(game.id, game.turn_count, game.player_black_id, game.id, oldPosition, position, 0);
            }

            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count + 1);
        }
    }

    public async deleteChessPiece(id: number,position : string): Promise<void> {
        let game = await Game.findByPk(id);

        if(game){
            let gameState = new GameState(game.id);
            gameState.pieces = typeof game.game_state === 'string'
                ? JSON.parse(game.game_state)
                : JSON.parse(JSON.stringify(game.game_state));
            await gameState.updateGameStateAfterDelete(position);
            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count);

        }
    }

    public async createFictiveGameByOtherGame(gameId:number): Promise<Map<GameDTO,ChessPiece[]>>{
        let game = await this.getGameById(gameId);
        let fictiveChessPieces: ChessPiece[] = [];
        for (let position in game.gameState) {
            let chessPiece = new ChessPiece();
            chessPiece.position = position;
            chessPiece.color = game.gameState[position].color;
            chessPiece.piece_type = game.gameState[position].type;
            fictiveChessPieces.push(chessPiece);
        }
        let map = new Map<GameDTO, ChessPiece[]>();
        map.set(game,fictiveChessPieces);
        return map;

    }


    public async nextTurnAfterPromote(id: number, position: string,pieceType: string) {
        let game = await Game.findByPk(id);
        if (game) {
            let gameState = new GameState(game.id);
            gameState.pieces = typeof game.game_state === 'string'
                ? JSON.parse(game.game_state)
                : JSON.parse(JSON.stringify(game.game_state));

            await gameState.updateGameStateAfterPromote(position, pieceType);

            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count + 1);
        }
    }


    public async nextTurnAfterRoque(id: number, oldPosition: string, position: string, oldRookPosition :string,rookPosition: string) {

        let game = await Game.findByPk(id);
        if (game) {
            let gameState = new GameState(game.id);

            gameState.pieces = typeof game.game_state === 'string'
                ? JSON.parse(game.game_state)
                : JSON.parse(JSON.stringify(game.game_state));

            await gameState.updateGameStateAfterRoque(oldPosition, position, oldRookPosition, rookPosition);

            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count + 1);
        }

    }

    public async getLastGame(userId: number): Promise<GameDTO | null> {
        let game = await Game.findOne({
            where: {
                [Op.or]: [
                    { player_white_id: userId },
                    { player_black_id: userId }
                ],
                is_finished: false
            },
            order: [['created_at', 'DESC']]
        });
        if (game) {
            return GameMapper.toDTO(game);
        } else {
            return null;
        }
    }

    public async getWinningPercentages(gameId: number): Promise<{ white: number, black: number }> {
        const game = await this.getGameById(gameId);
        const pieces: ChessPiece[] = [];

        for (let position in game.gameState) {
            const piece = new ChessPiece();
            piece.position = position;
            piece.color = game.gameState[position].color;
            piece.piece_type = game.gameState[position].type;
            pieces.push(piece);
        }

        return this.calculateWinningPercentage(pieces);
    }

    public async calculateWinningPercentage(pieces: ChessPiece[]): Promise<{ white: number, black: number }> {
        const totalPieces = pieces.length;
        const whitePieces = pieces.filter(piece => piece.color === 'white').length;
        const blackPieces = pieces.filter(piece => piece.color === 'black').length;

        const whitePercentage = (whitePieces / totalPieces) * 100;
        const blackPercentage = (blackPieces / totalPieces) * 100;

        return {
            white: whitePercentage,
            black: blackPercentage
        };
    }


}

export const gameService = new GameService();
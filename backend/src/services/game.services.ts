
import { GameDTO, CreateGameDTO } from "../dto/game.dto";
import { Op } from "sequelize";
import Game from "../models/game.model";
import { GameMapper } from "../mapper/game.mapper";
import { notFound } from "../error/NotFoundError";
import  GameState  from "../models/object/gamestate";
import moveServices from "./move.services";
import gamestate from "../models/object/gamestate";
import ChessPiece from "../models/chessPiece.model";
import chessPieceService from "./chessPiece.services";
import {chessPieceDto} from "../dto/chessPiece.dto";
import chessPieceServices from "./chessPiece.services";
import PawnPiece from "../models/pieces/pawnPiece";

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

    public async createGame(playerWhiteId: number | undefined, playerBlackId: number | undefined, isPublic: boolean,isReview = false): Promise<GameDTO> {
        let game = GameMapper.toDTO(await Game.create({
            player_white_id: playerWhiteId,
            player_black_id: playerBlackId,
            is_public: isPublic,
            game_state: {},
            is_finished: false,
            winner_id: null,
            created_at: new Date(),
            turn_count: 0,
            count_rule_fifty_moves:0,
            is_review: isReview
        }));
        let gameState = new GameState(game.id);
        await gameState.initStartGame(game.id);
        return await this.updateGame(game.id, playerWhiteId, playerBlackId, isPublic, gameState.pieces, false, undefined, 0,undefined);
    }

    public async updateGame(id: number, playerWhiteId: number | undefined, playerBlackId: number | undefined, isPublic: boolean, gameState: {
        [key: string]: { [key: string]: string }
    }, isFinished: boolean, winnerId: number | undefined, turnCount: number,finished_at:Date |undefined): Promise<GameDTO> {
        let game = await Game.findByPk(id);
        if (game) {
            if (playerWhiteId) game.player_white_id = playerWhiteId;
            if (playerBlackId) game.player_black_id = playerBlackId;
            if (isPublic) game.is_public = isPublic;
            if (gameState) game.game_state = gameState;
            if (isFinished) game.is_finished = isFinished;
            if (winnerId) game.winner_id = winnerId;
            if (finished_at) game.finished_at = finished_at;
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
                let chessPiece = await ChessPiece.findOne({ where: { position: oldPosition, game_id: game.id } });
                if(chessPiece) {
                    await moveServices.createMove(game.id, game.turn_count, game.player_white_id, chessPiece.id, oldPosition, position, 0);
                }
            } else {
                let chessPiece = await ChessPiece.findOne({ where: { position: oldPosition, game_id: game.id } });
                if(chessPiece) {
                    await moveServices.createMove(game.id, game.turn_count, game.player_black_id, chessPiece.id, oldPosition, position, 0);
                }
            }

            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count + 1,undefined);
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
            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count,undefined);

        }
    }

    public async createFictiveGameByOtherGame(gameId:number): Promise<Map<GameDTO,ChessPiece[]>>{
        let game = await this.getGameById(gameId);
        let fictiveChessPieces: ChessPiece[] = [];
        for (let position in game.gameState) {
            let chessPiece = new ChessPiece();
            chessPiece.game_id = game.id;
            chessPiece.position = position;
            chessPiece.color = game.gameState[position].color;
            chessPiece.piece_type = game.gameState[position].pieceType;
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

            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count ,undefined);
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

            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count + 1,undefined);
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


    public async getCapturedPiecesCount(gameId: number): Promise<{ [key: string]: number }> {
        const maxPiecesCount: { [key: string]: number } = {
            whitePawn: 8,
            whiteRook: 2,
            whiteKnight: 2,
            whiteBishop: 2,
            whiteQueen: 1,
            blackPawn: 8,
            blackRook: 2,
            blackKnight: 2,
            blackBishop: 2,
            blackQueen: 1,
        };

        const game = await this.getGameById(gameId);

        for (let position in game.gameState) {
            const piece = game.gameState[position];
            const key = `${piece.color}${piece.pieceType.charAt(0).toUpperCase() + piece.pieceType.slice(1)}`;
            if (maxPiecesCount[key] !== undefined) {
                maxPiecesCount[key]--;
            }
        }

        return maxPiecesCount;
    }

    public async getPublicGames(): Promise<GameDTO[]> {

        let gameList = Game.findAll({
            where: {
                is_public: true
            }
        });

        return GameMapper.toDTOList(await gameList);

    }

    public async getPrivateGames(userId: number): Promise<GameDTO[]> {
        let gameList = Game.findAll({
            where: {
                [Op.or]: [
                    { player_white_id: userId },
                    { player_black_id: userId }
                ],
                is_public: false
            }
        });

        return GameMapper.toDTOList(await gameList);
    }

    public async finishGame(gameId: number, winnerId: number|undefined = undefined): Promise<GameDTO> {
        let game = await Game.findByPk(gameId);
        let finished_at= new Date();
        if (game) {
            await this.updateGame(gameId, game.player_white_id, game.player_black_id, game.is_public, game.game_state, true, winnerId, game.turn_count,finished_at);
            return await this.getGameById(gameId);
        } else {
            notFound("Game");
        }
    }


    public async makePublic(gameId: number) : Promise<void> {
        let game = await Game.findByPk(gameId);
        if (game) {
            game.is_public = !game.is_public;
            await game.save();
        }

    }

    public async getNbMoves(userId: number) {
        let games = await Game.findAll({
            where: {
                [Op.or]: [
                    { player_white_id: userId },
                    { player_black_id: userId }
                ]
            }
        });
        let cpt =0;
        for (let game of games) {
            cpt += game.turn_count;
        }
        return cpt;
    }

    public async getNbPiecesCaptured(userId: number) {

        let games = await Game.findAll({
            where: {
                [Op.or]: [
                    { player_white_id: userId },
                    { player_black_id: userId }
                ]
            }
        });

        let cpt= 0;

        for (let game of games) {
            cpt += await this.getNbPiecesCapturedByColor(game.id, "white") + await this.getNbPiecesCapturedByColor(game.id, "black");
        }

        return cpt;

    }

    public async getNbPiecesCapturedByColor(gameId: number, color: string) {
        let temp = await this.getCapturedPiecesCount(gameId);
        let nbPiecesCaptured = 0;
        for (let key in temp) {
            if (key.includes(color)) {
                nbPiecesCaptured += temp[key];
            }
        }
        return nbPiecesCaptured;
    }

    public async getTotalGames(userId: number) {

        let games = await Game.findAll({
            where: {
                [Op.or]: [
                    { player_white_id: userId },
                    { player_black_id: userId }
                ]
            }
        });

        return games.length;
    }

    public async getUserGames(userId: number) {
        let gameList = Game.findAll({
            where: {
                [Op.or]: [
                    { player_white_id: userId },
                    { player_black_id: userId }
                ]
            }
        })
        return GameMapper.toDTOList(await gameList);
    }

    public async deleteGame(id: number) {
        let game = await Game.findByPk(id);
        if (game) {
            await game.destroy();
        } else {
            notFound("Game");

        }
    }

    public async getGameStates(gameId: number): Promise<{ [key: string]: { [key: string]: any } }[]> {
        let game = await Game.findByPk(gameId);
        if (!game) {
            throw new Error("Game not found");
        }

        let moves = await moveServices.getMovesByGameId(gameId);
        if (!moves) {
            throw new Error("Moves not found");
        }

        let gameStates: { [key: string]: { [key: string]: any } }[] = [];

        let ReviewedGame = await this.createGame(game.player_white_id, game.player_black_id, game.is_public,true);

        let tempState = new GameState(ReviewedGame.id);

        await tempState.initStartGame(ReviewedGame.id);
        gameStates.push(tempState.pieces);

        for(let move of moves) {
            if(move.from_position != "promote") {
                let chessPiece = await chessPieceServices.getChessPieceByPosition(move.from_position, ReviewedGame.id);
                if (chessPiece) {
                    await chessPiece.moveTo(move.to_position)

                    let tempGame = await this.getGameById(chessPiece.game_id);
                    let gameState = new GameState(tempGame.id);
                    gameState.pieces = typeof tempGame.gameState === 'string'
                        ? JSON.parse(tempGame.gameState)
                        : JSON.parse(JSON.stringify(tempGame.gameState));
                    gameStates.push(gameState.pieces);
                }
            }else {
                let chessPiece = await chessPieceServices.getChessPieceByPosition(move.from_position, ReviewedGame.id) as PawnPiece;
                if (chessPiece) {
                    await chessPiece.promotePiece(move.to_position);
                    let tempGame = await this.getGameById(ReviewedGame.id);
                    let gameState = new GameState(tempGame.id);
                    gameState.pieces = typeof tempGame.gameState === 'string'
                        ? JSON.parse(tempGame.gameState)
                        : JSON.parse(JSON.stringify(tempGame.gameState));
                    gameStates.push(gameState.pieces);
                }
            }
        }
        return gameStates;
    }


}

export const gameService = new GameService();

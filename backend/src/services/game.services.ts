import { GameDTO,CreateGameDTO } from "../dto/game.dto";
import Game from "../models/game.model";
import { GameMapper } from "../mapper/game.mapper";
import { notFound } from "../error/NotFoundError";
import  GameState  from "../models/object/gamestate";
import moveServices from "./move.services";
import gamestate from "../models/object/gamestate";

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

            console.log("avant");
            console.log(gameState.pieces);

            await gameState.updateGameState(oldPosition, position);

            console.log("après");
            console.log(gameState.pieces);



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
            await this.updateGame(id, game.player_white_id, game.player_black_id, game.is_public, gameState.pieces, game.is_finished, undefined, game.turn_count + 1);

        }


    }



}

export const gameService = new GameService();
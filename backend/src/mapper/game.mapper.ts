import { GameDTO,CreateGameDTO } from "../dto/game.dto";
import Game from "../models/game.model";

export class GameMapper{
    public static toDTO(game: Game): GameDTO{
        return {
            id: game.id,
            playerWhiteId: game.player_white_id,
            playerBlackId: game.player_black_id,
            gameState: game.game_state && typeof game.game_state === 'string' ? JSON.parse(game.game_state) : game.game_state,
            isFinished: game.is_finished,
            winnerId: game.winner_id,
            isPublic: game.is_public,
            createdAt: game.created_at,
            finishedAt: game.finished_at,
            turnCount: game.turn_count,
            countRuleFiftyMoves: game.count_rule_fifty_moves
        }
    }

    public static toDTOList(gameList: Game[]): GameDTO[] {
        return gameList.map((game) => GameMapper.toDTO(game));
    }

    public static toCreateDTO(game: Game): CreateGameDTO{
        return {
            playerWhiteId: game.player_white_id,
            playerBlackId: game.player_black_id,
            isPublic: game.is_public,
        }
    }
}
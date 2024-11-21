import { GameDTO,CreateGameDTO } from "../dto/game.dto";
import Game from "../models/game.model";

export class GameMapper{
    public static toDTO(game: Game): GameDTO{
        return {
            id: game.id,
            playerWhiteId: game.playerWhite,
            playerBlackId: game.playerBlack,
            gameState: game.gameState,
            isFinished: game.isFinished,
            winnerId: game.winnerId,
            isPublic: game.isPublic,
            createdAt: game.createdAt,
            finishedAt: game.finishedAt
        }
    }

    public static toDTOList(gameList: Game[]): GameDTO[]{
        return gameList.map((game) => GameMapper.toDTO(game));
    }

    public static toCreateDTO(game: Game): CreateGameDTO{
        return {
            playerWhiteId: game.playerWhite,
            playerBlackId: game.playerBlack,
            isPublic: game.isPublic,
        }
    }
}
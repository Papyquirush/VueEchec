import { Controller, Get, Route,Post, Body } from "tsoa";
import { CreateGameDTO, GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.servives";

@Route("games")
export class GameController extends Controller {

    @Get("/")
    public async getGames(): Promise<GameDTO[]> {
        return gameService.getGames();
    }

    @Get("{id}")
    public async getGameById(id: number): Promise<GameDTO> {
        return gameService.getGameById(id);
    }

    @Post("/")
    public async CreateGame(@Body() requestBody: CreateGameDTO): Promise<GameDTO> {
        const { playerWhiteId, playerBlackId, isPublic } = requestBody;
        
        return gameService.createGame(playerWhiteId, playerBlackId, isPublic);
    }


    


}


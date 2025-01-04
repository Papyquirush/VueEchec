import {Controller, Get, Route, Post, Body, Security,Path } from "tsoa";
import { CreateGameDTO, GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.services";
import { notFound } from "../error/NotFoundError";

@Route("games")
export class GameController extends Controller {

    @Get("/")
    public async getGames(): Promise<GameDTO[]> {
        return gameService.getGames();
    }

    @Get("{id}")
    public async getGameById(@Path() id: number): Promise<GameDTO> {
        return gameService.getGameById(id);
    }

    @Post("/")
    public async createGame(@Body() requestBody: CreateGameDTO): Promise<GameDTO> {
        const { playerWhiteId, playerBlackId, isPublic } = requestBody;
        
        return gameService.createGame(playerWhiteId, playerBlackId, isPublic);
    }

    @Get("/last/{userId}")
    public async getLastGame(@Path() userId:number): Promise<GameDTO>
    {
        let game = await gameService.getLastGame(userId);
        if (game) {
            return game;
        } else {
            notFound('game'); 
        }
    }


    @Get("/winningPercentage/{gameId}")
    public async getWinningPercentage(@Path() gameId:number): Promise<{ white: number; black: number }>
    {
        return gameService.getWinningPercentages(gameId);
    }


    @Get("/public/games")
    public async getPublicGames(): Promise<GameDTO[]> {
        return gameService.getPublicGames();
    }

    @Get("/private/{userId}")
    public async getPrivateGames(@Path() userId:number): Promise<GameDTO[]>
    {
        return gameService.getPrivateGames(userId);
    }


}


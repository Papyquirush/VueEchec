
import {Controller, Get, Route, Post, Body, Security, Path, Patch, Delete} from "tsoa";
import { CreateGameDTO, GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.services";
import { notFound } from "../error/NotFoundError";
import Gamestate from "../models/object/gamestate";


@Route("games")
@Security("jwt")
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

    @Get("/pieceCaptured/{gameId}")
    public async getPieceCaptured(@Path() gameId:number): Promise<{ [key: string]: number }>
    {
        return gameService.getCapturedPiecesCount(gameId);
    }

    @Get("/public/games")
    public async getPublicGames(): Promise<GameDTO[]> {
        return gameService.getPublicGames();
    }

    @Get("/user/{userId}")
    public async getUserGames(@Path() userId:number): Promise<GameDTO[]>
    {
        return gameService.getUserGames(userId);
    }

    @Get("/private/{userId}")
    public async getPrivateGames(@Path() userId:number): Promise<GameDTO[]>
    {
        return gameService.getPrivateGames(userId);
    }

    @Patch("/makePublic/{gameId}")
    public async makePublic(@Path() gameId:number): Promise<void>
    {
        return gameService.makePublic(gameId);
    }

    @Get("/nbMoves/{userId}")
    public async getNbMoves(@Path() userId:number): Promise<number>
    {
        return gameService.getNbMoves(userId);
    }

    @Get("/nbCapturedPieces/{userId}")
    public async getNbPiecesCaptured(@Path() userId:number): Promise<number>
    {

        return gameService.getNbPiecesCaptured(userId);
    }


    @Get("/gameStates/{gameId}")
    public async getGameStates(@Path() gameId:number): Promise<{ [key: string]: { [key: string]: any } }[]>
    {
        return gameService.getGameStates(gameId);
    }

    @Delete("{id}")
    public async deleteGame(@Path() id: number): Promise<void> {
        return gameService.deleteGame(id);
    }


    @Get("total/{userId}")
    public async getTotalGames(@Path() userId:number): Promise<number>
    {
        return gameService.getTotalGames(userId);
    }

}


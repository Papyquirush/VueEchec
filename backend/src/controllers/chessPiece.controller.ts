import {
    Controller, Get, Route,Delete,Patch,Path,Post,Body,Security

} from "tsoa";

import {
    chessPieceDto,
    UpdateChessPieceDTO,
    CreateChessPieceDTO,
  } from "../dto/chessPiece.dto";

import chessPieceService, {ChessPieceService} from "../services/chessPiece.services";
import PawnPiece from "../models/pieces/pawnPiece.model";
import chessPieceServices from "../services/chessPiece.services";
import chessPieceModel from "../models/chessPiece.model";
import {gameService} from "../services/game.services";
import KingPiece from "../models/pieces/kingPiece.model";




@Route("chessPieces")
export class ChessPieceController extends Controller {

    @Get("/")
    public async getAllChessPieces(): Promise<chessPieceDto[]> {
      return chessPieceService.getAllChessPieces();
    }

    @Get("{id}")
    public async getChessPieceById(@Path() id: number): Promise<chessPieceDto> {
      return chessPieceService.getChessPieceById(id);
    }

    @Get("/{game}/{position}")
    public async getChessPieceByPosition(@Path() position: string, @Path() game:number): Promise<chessPieceDto> {
      return chessPieceService.getChessPiecesByGameAndPosition(game,position);
    }

    @Post("/")
    public async createChessPiece(
      @Body() requestBody: CreateChessPieceDTO,
    ): Promise<chessPieceDto> {
      const { pieceType, color, position, gameId } = requestBody;
      return chessPieceService.createChessPiece(pieceType, color, position, gameId);
    }




    @Post("/move/{game}/{oldPosition}/{newPosition}")
    public async move(
        @Path() oldPosition: string,
        @Path() newPosition: string,
        @Path() game: number
    ) {
        let chessPiece = await chessPieceService.getChessPieceByPosition(oldPosition,game);
        chessPiece.moveTo(newPosition);

    }

    @Post("/promote/{game}/{position}/{pieceType}")
    public async promote(
        @Path() position: string,
        @Path() pieceType: string,
        @Path() game: number
    ) {
        let chessPiece = await chessPieceService.getChessPieceByPosition(position,game) as PawnPiece;
        await chessPiece.promotePiece(pieceType);
    }



    @Get("slots-available/{gameId}/{position}")
    public async getSlotsAvailable(@Path() position: string,@Path() gameId:number): Promise<string[]> {
        return chessPieceService.getSlotsAvailable(position,gameId);
    }


    @Post("/roque/{game}/{position}/{newPosition}")
    public async roque(
        @Path() newPosition: string,
        @Path() position: string,
        @Path() game: number
    ) {
        let chessPiece = await chessPieceService.getChessPieceByPosition(position,game) as KingPiece;
        console.log(chessPiece);
        await chessPiece.roque(chessPiece,newPosition);
    }


    @Get("is-check/{gameId}")
    public async isCheck(@Path() gameId:number): Promise<boolean> {
        return chessPieceService.isCheck(gameId);
    }
  
}


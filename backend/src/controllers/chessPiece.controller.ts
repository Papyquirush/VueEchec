import {
    Controller, Get, Route,Delete,Patch,Path,Post,Body

} from "tsoa";

import {
    chessPieceDto,
    UpdateChessPieceDTO,
    CreateChessPieceDTO,
  } from "../dto/chessPiece.dto";

import chessPieceService, {ChessPieceService} from "../services/chessPiece.services";
import PawnPiece from "../models/pieces/pawnPiece.model";
import chessPieceServices from "../services/chessPiece.services";




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

    @Delete("/{game}/{position}")
    public async deleteChessPiece(@Path() position: string,@Path() game: number): Promise<void> {
        let chessPiece = await chessPieceService.getChessPiecesByGameAndPosition(game,position);
        await chessPieceServices.deleteChessPiece(chessPiece.id);
    }

    @Patch("{id}")
    public async updateChessPiece(
      @Path() id: number,
      @Body() requestBody: UpdateChessPieceDTO,
    ): Promise<chessPieceDto> {
      const { pieceType, color, position, gameId,hasMoved } = requestBody;
      return chessPieceService.updateChessPiece(id, pieceType ?? "", color ?? "", position ?? "", gameId ?? -1,hasMoved ?? false);
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
  
}


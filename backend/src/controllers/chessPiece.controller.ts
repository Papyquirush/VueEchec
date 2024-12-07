import {
    Controller, Get, Route,Delete,Patch,Path,Post,Body

} from "tsoa";

import {
    chessPieceDto,
    UpdateChessPieceDTO,
    CreateChessPieceDTO,
  } from "../dto/chessPiece.dto";

import chessPieceService, {ChessPieceService} from "../services/chessPiece.services";
import ChessPiece from "../models/chessPiece.model";




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

    @Post("/")
    public async createChessPiece(
      @Body() requestBody: CreateChessPieceDTO,
    ): Promise<chessPieceDto> {
      const { pieceType, color, position, gameId } = requestBody;
      return chessPieceService.createChessPiece(pieceType, color, position, gameId);
    }

    @Delete("{id}")
    public async deleteChessPiece(@Path() id: number): Promise<void> {
      await chessPieceService.deleteChessPiece(id);
    }

    @Patch("{id}")
    public async updateChessPiece(
      @Path() id: number,
      @Body() requestBody: UpdateChessPieceDTO,
    ): Promise<chessPieceDto> {
      const { pieceType, color, position, gameId,hasMoved } = requestBody;
      return chessPieceService.updateChessPiece(id, pieceType ?? "", color ?? "", position ?? "", gameId ?? -1,hasMoved ?? false);
    }

    @Post("{game}/move/{oldPosition}/{newPosition}")
    public async move(
        @Path() oldPosition: string,
        @Path() newPosition: string,
        @Path() game: number
    ) {

        let chessPiece = await chessPieceService.getChessPiecesByGameAndPosition(game,oldPosition);

        chessPiece.moveTo(newPosition);
    }

    @Get("slots-available/{gameId}/{position}")
    public async getSlotsAvailable(@Path() position: string,@Path() gameId:number): Promise<string[]> {
        return chessPieceService.getSlotsAvailable(position,gameId);
    }
  
}


import {
    Controller, Get, Route,Delete,Patch,Path,Post,Body,Security

} from "tsoa";

import {
    MoveDto,
    CreateMoveDto,
    UpdateMoveDto,
  } from "../dto/move.dto";

import MoveService  from "../services/move.services";

@Route("moves")
export class MoveController extends Controller {

    @Get("/")
    public async getAllMoves(): Promise<MoveDto[]> {
      return MoveService.getAllMoves();
    }

    @Get("{id}")
    public async getMoveById(@Path() id: number): Promise<MoveDto> {
      return MoveService.getMoveById(id);
    }

    @Post("/")
    public async createMove(
      @Body() requestBody: CreateMoveDto,
    ): Promise<MoveDto> {
      const { game_id, move_number, player_id, piece_id, from_position, to_position, move_time } = requestBody;
      return MoveService.createMove(game_id, move_number, player_id, piece_id, from_position, to_position, move_time);
    }

    @Delete("{id}")
    public async deleteMove(@Path() id: number): Promise<void> {
      await MoveService.deleteMove(id);
    }

    @Patch("{id}")
    public async updateMove(
      @Path() id: number,
      @Body() requestBody: UpdateMoveDto,
    ): Promise<MoveDto> {
      const { game_id, move_number, player_id, piece_id, from_position, to_position, move_time } = requestBody;
      return MoveService.updateMove(id, game_id ?? -1, move_number ?? -1, player_id ?? -1, piece_id ?? -1, from_position ?? "", to_position ?? "", move_time ?? -1);
    }






}


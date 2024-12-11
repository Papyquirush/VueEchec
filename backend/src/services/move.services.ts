import { MoveDto }  from "../dto/move.dto";
import { notFound } from "../error/NotFoundError";
import Move from "../models/move.model";
import { MoveMapper } from "../mapper/move.mapper";

export class MoveService {

    public async getAllMoves(): Promise<MoveDto[]> {
        return MoveMapper.toOutputDtoList( await Move.findAll());
    }

    public async getMoveById(id: number): Promise<MoveDto> {
        let move = await Move.findByPk(id);
        if (move) {
            return MoveMapper.toOutputDto(move);
        } else {
            notFound("Move");
        }
    }

    public async createMove(
        gameId: number,
        moveNumber: number,
        playerId: number,
        pieceId: number,
        fromPosition: string,
        toPosition: string,
        moveTime: number,
    ): Promise<MoveDto> {
        return MoveMapper.toOutputDto(
            await Move.create({ game_id: gameId, move_number: moveNumber, player_id: playerId, piece_id: pieceId, from_position: fromPosition, to_position: toPosition, move_time: moveTime }),
        );
    }

    public async updateMove(
        id: number,
        gameId: number,
        moveNumber: number,
        playerId: number,
        pieceId: number,
        fromPosition: string,
        toPosition: string,
        moveTime: number,
    ): Promise<MoveDto> {
        let move = await Move.findByPk(id);
        if (move) {
            if(gameId !== -1) move.game_id = gameId;
            if(moveNumber !== -1) move.move_number = moveNumber;
            if(playerId !== -1) move.player_id = playerId;
            if(pieceId !== -1) move.piece_id = pieceId;
            if(fromPosition !== "") move.from_position = fromPosition;
            if(toPosition !== "") move.to_position = toPosition;
            if(moveTime !== -1) move.move_time = moveTime;
            await move.save();
            return MoveMapper.toOutputDto(move);
        } else {
            notFound("Move");
        }
    }

    public async deleteMove(id: number): Promise<void> {
        let move = await Move.findByPk(id);
        if (move) {
            await move.destroy();
        } else {
            notFound("Move");
        }
    }

}

export default new MoveService();
import { MoveDto} from "../dto/move.dto";
import Move from "../models/move.model";

export class MoveMapper {
    public static toOutputDto(move: Move): MoveDto {
        return {
        id: move.id,
        game_id: move.game_id,
        move_number: move.move_number,
        player_id: move.player_id,
        piece_id: move.piece_id,
        from_position: move.from_position,
        to_position: move.to_position,
        move_time: move.move_time,
        };
    }

    public static toOutputDtoList(moveList: Move[]): MoveDto[] {
        return moveList.map((move) => MoveMapper.toOutputDto(move));
    }

}
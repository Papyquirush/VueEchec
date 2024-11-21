import { chessPieceDto} from "../dto/chessPiece.dto";
import ChessPiece  from "../models/chessPiece.model";

export class ChessPieceMapper {
    public static toOutputDto(chessPiece: ChessPiece): chessPieceDto {
        return {
        id: chessPiece.id,
        pieceType: chessPiece.piece_type,
        color: chessPiece.color,
        position: chessPiece.position,
        isCaptured: chessPiece.is_captured,
        hasMoved: chessPiece.has_moved,
        gameId: chessPiece.game_id,
        };
    }

    public static toOutputDtoList(chessPieceList: ChessPiece[]): chessPieceDto[] {
        return chessPieceList.map((chessPiece) => ChessPieceMapper.toOutputDto(chessPiece));
    }

}
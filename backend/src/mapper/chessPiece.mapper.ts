import { chessPieceDto} from "../dto/chessPiece.dto";
import ChessPiece  from "../models/chessPiece.model";

export class ChessPieceMapper {
    public static toOutputDto(chessPiece: ChessPiece): chessPieceDto {
        return {
        id: chessPiece.id,
        pieceType: chessPiece.pieceType,
        color: chessPiece.color,
        position: chessPiece.position,
        isCaptured: chessPiece.isCaptured,
        hasMoved: chessPiece.hasMoved,
        gameId: chessPiece.gameId,
        };
    }

    public static toOutputDtoList(chessPieceList: ChessPiece[]): chessPieceDto[] {
        return chessPieceList.map((chessPiece) => ChessPieceMapper.toOutputDto(chessPiece));
    }

}
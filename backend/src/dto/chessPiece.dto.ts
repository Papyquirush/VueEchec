export interface chessPieceDto {
    id: number;
    pieceType: string;
    color: string;
    position: string;
    isCaptured: boolean;
    hasMoved: boolean;
    gameId: number;
}

export interface CreateChessPieceDTO {
    pieceType: string;
    color: string;
    position: string;
    gameId: number;
}

export interface UpdateChessPieceDTO {
    pieceType?: string;
    color?: string;
    position?: string;
    isCaptured?: boolean;
    hasMoved?: boolean;
    gameId?: number;
}
export interface MoveDto {
    id : number;
    game_id : number;
    move_number : number;
    player_id : number;
    piece_id : number;
    from_position : string;
    to_position : string;
    move_time : number;
}

export interface CreateMoveDto {
    game_id : number;
    move_number : number;
    player_id : number;
    piece_id : number;
    from_position : string;
    to_position : string;
    move_time : number;
}

export interface UpdateMoveDto {
    game_id? : number;
    move_number? : number;
    player_id? : number;
    piece_id? : number;
    from_position? : string;
    to_position? : string;
    move_time? : number;
}
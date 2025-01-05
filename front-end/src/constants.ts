export const API_BASE_URL = 'http://localhost:8000';
export const API_GAME_URL = '/games/';
export const API_BASE_AUTH = '/auth';
export const API_BASE_USERS = '/users';
export const API_SLOTS_AVAILABLE = '/chessPieces/slots-available/';
export const API_MOVE_PIECE = '/chessPieces/move/';
export const API_WINNING = 'winningPercentage/';
export const API_WINRATE = '/winrate/';
export const API_PROMOTE = '/chessPieces/promote/';
export const API_NBMOVES = 'nbMoves/';
export const API_PIECE_CAPTURED = 'nbCapturedPieces/';
export const API_LEADERBOARD = '/classement/winrate';
export const API_PUBLIC_GAMES = 'public/games';
export const API_GAMES_OF_USERS = 'user/';
export const API_MAKE_PUBLIC = 'makePublic/';

export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const ROWS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export type Cell = { pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn', color: 'white' | 'black' } | null;
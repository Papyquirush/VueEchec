import { ChessBoardApi } from './ChessBoardApi';
import type{ Cell } from '@/constants';

export const ChessBoardService = {
  async initializeBoard(playerWhiteId: number, playerBlackId: number) {
    const currGame = await ChessBoardApi.initializeGame(playerWhiteId, playerBlackId);

    console.log("currGame : ",currGame);

    const gameId = currGame.id;
    const gameState = currGame.gameState;

    console.log("gameid : ",gameId,"game state :", gameState);

    const board:Cell[][] = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (const [position, piece] of Object.entries(gameState)) {
      const { row, col } = mapPositionToIndex(position);
      board[row][col] = piece as Cell;
    }
    console.log("board : ",board);
    return { gameId, board };
  },


  async loadBoard(gameId: number) {
    const { gameState } = await ChessBoardApi.getGameState(gameId);

    const board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (const [position, piece] of Object.entries(gameState)) {
      const { row, col } = mapPositionToIndex(position);
      board[row][col] = piece;
    }

    return board;
  },

  async fetchAndHighlightAvailableSlots(gameId: number, position: string) {
    return await ChessBoardApi.getAvailableSlots(gameId, position);
  },
};


const mapPositionToIndex = (pos: string) => {
  const col = pos.charCodeAt(0) - 97;
  const row = 8 - parseInt(pos[1], 10);
  return { row, col };
};

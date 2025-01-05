import { ChessBoardApi } from './ChessBoardApi';
import type{ Cell } from '@/constants';

export const ChessBoardService = {
  async initializeBoard(playerWhiteId: number, playerBlackId: number) {
    const currGame = await ChessBoardApi.initializeGameReview(playerWhiteId, playerBlackId);

    const gameId = currGame.id;
    const gameState = await ChessBoardApi.getGameStateReview(gameId, 1);



    const board:Cell[][] = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (const [position, piece] of Object.entries(gameState)) {
      const { row, col } = mapPositionToIndex(position);
      board[row][col] = piece as Cell;
    }
    return { gameId, board };
  },

  async loadBoard(gameId: number) {
    try {

      const { gameState } = await ChessBoardApi.getGameState(gameId);

      if (!gameState) {
        throw new Error('Le gamestate n\'est pas valide ; Porblème de serveur ?');
      }

      const board = Array(8)
        .fill(null)
        .map(() => Array(8).fill(null));

      for (const [position, piece] of Object.entries(gameState)) {
        const { row, col } = mapPositionToIndex(position);
        board[row][col] = piece;
      }

      return { gameId, board };

    } catch (error) {
      console.error('Erreur de chargement:', error);
      throw error;
    }
  },

  async loadBoardReview(gameId: number, move: number) {
    try {

      const gameState = await ChessBoardApi.getGameStateReview(gameId, move);
      console.log(gameState);
      if (!gameState) {
        throw new Error('Le gamestate n\'est pas valide ; Porblème de serveur ?');
      }

      const board = Array(8)
        .fill(null)
        .map(() => Array(8).fill(null));

      for (const [position, piece] of Object.entries(gameState)) {
        const { row, col } = mapPositionToIndex(position);
        board[row][col] = piece;
      }

      return { gameId, board };

    } catch (error) {
      console.error('Erreur de chargement:', error);
      throw error;
    }
  },




  async fetchAndHighlightAvailableSlots(gameId: number, position: string) {
    return await ChessBoardApi.getAvailableSlots(gameId, position);
  },

  async getWinningGauge(gameId: number) {
    const response = await ChessBoardApi.getWinningGauge(gameId);
    return response;
  },

  async promotePiece(gameId: number, promotionPosition: { value: string }, pieceType: string) {
    const response = await ChessBoardApi.promotePiece(gameId, promotionPosition, pieceType);
    return response;
  },

  async movePiece(gameId: number, from: string, to: string) {
    const response = await ChessBoardApi.movePiece(gameId, from, to);
    return response;
  },

  async getPublicGames() {
    return await ChessBoardApi.getPublicGames();
  },

  async getGamesOfUser(userId: number) {
    return await ChessBoardApi.getGamesOfUser(userId);
  },

  async patchGameToPublic(gameId: number) {
    return await ChessBoardApi.patchGameToPublic(gameId);
  }

};


const mapPositionToIndex = (pos: string) => {
  const col = pos.charCodeAt(0) - 97;
  const row = 8 - parseInt(pos[1], 10);
  return { row, col };
};

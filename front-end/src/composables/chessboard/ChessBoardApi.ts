import axiosInstance from '@/config/AxiosConfig';
import { API_BASE_URL,API_GAME_URL, API_SLOTS_AVAILABLE,API_MOVE_PIECE } from '@/constants';

export const ChessBoardApi = {
  async initializeGame(playerWhiteId: number, playerBlackId: number, isPublic: boolean = true) {
    const response = await axiosInstance.post(API_BASE_URL+API_GAME_URL, {
      playerWhiteId,
      playerBlackId,
      isPublic,
    });
    return response.data;
  },

  async getGameState(gameId: number) {
    const response = await axiosInstance.get(API_BASE_URL+API_GAME_URL+`${gameId}`);
    return response.data; 
  },

  async getAvailableSlots(gameId: number, position: string) {
    const response = await axiosInstance.get(API_BASE_URL+API_SLOTS_AVAILABLE+`${gameId}/${position}`);
    return response.data;
  },

  async movePiece(gameId: number, from: string, to: string) {
    console.log("LALALA");
    const response = await axiosInstance.post(API_BASE_URL+API_MOVE_PIECE+`${gameId}/${from}/${to}`);
    return response.data;
  },
};

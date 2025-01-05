import axiosInstance from '@/config/AxiosConfig';
import { API_BASE_URL,API_GAME_URL, API_SLOTS_AVAILABLE,API_MOVE_PIECE, API_WINNING, API_PROMOTE , API_PUBLIC_GAMES, API_GAMES_OF_USERS, API_MAKE_PUBLIC} from '@/constants';

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
    try {
      
      const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${gameId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 500) {
        throw new Error('Partie non trouvée');
      }
      throw error;
    }
  },

  async getAvailableSlots(gameId: number, position: string) {
    const response = await axiosInstance.get(API_BASE_URL+API_SLOTS_AVAILABLE+`${gameId}/${position}`);
    return response.data;
  },

  async getWinningGauge(gameId: number) {
    const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${API_WINNING}${gameId}`);
    return response.data
  },

  async promotePiece(gameId: number, promotionPosition: { value: string }, pieceType: string) {
    const response = await axiosInstance.post(`${API_BASE_URL}${API_PROMOTE}${gameId}/${promotionPosition.value}/${pieceType}`);
    return response.data;
  },

  async movePiece(gameId: number, from: string, to: string) {
    const response = await axiosInstance.post(`${API_BASE_URL}${API_MOVE_PIECE}${gameId}/${from}/${to}`);
    return response.data;
  },

  async getPublicGames() {
    const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${API_PUBLIC_GAMES}`);
    return response.data;
  },

  async getGamesOfUser(userId: number) {
    const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${API_GAMES_OF_USERS}${userId}`);
    return response.data;
  },

  async patchGameToPublic(gameId: number) {
    const response = await axiosInstance.patch(`${API_BASE_URL}${API_GAME_URL}${API_MAKE_PUBLIC}${gameId}`);
    return response.data;
  }
  
};

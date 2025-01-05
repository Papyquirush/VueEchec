import axiosInstance from '@/config/AxiosConfig';
import { API_BASE_AUTH, API_BASE_USERS, API_WINRATE, API_NBMOVES, API_GAME_URL, API_PIECE_CAPTURED, API_LEADERBOARD} from '@/constants';
import type { User } from '@/models/User.model';

export function useUserApi() {
  return {
    async authenticate(user: User): Promise<string> {
      const res = await axiosInstance.post(`${API_BASE_AUTH}`, {
        username: user.username,
        password: user.password,
      });

      localStorage.setItem('username', user.username);
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('idUser', res.data.userId);
      return res.data.token;
    },
    async register(user: User): Promise<string> {
      const res = await axiosInstance.post(`${API_BASE_USERS}`, {
        username: user.username,
        password: user.password,
      });
      return res.data.token;
    },
    async getWinrate(idUser: number): Promise<number> {
      const res = await axiosInstance.get(`${API_BASE_USERS}${API_WINRATE}${idUser}`);
      return res.data;
    },
    async getNbMoves(idUser: number): Promise<number> {
      const res = await axiosInstance.get(`${API_GAME_URL}${API_NBMOVES}${idUser}`);
      return res.data;
    },
    async getPiecesCaptured(idUser: number): Promise<number> {
      const res = await axiosInstance.get(`${API_GAME_URL}${API_PIECE_CAPTURED}${idUser}`);
      return res.data;
    },
    // async getNbGames(idUser: number): Promise<number> {
    //   const res = await axiosInstance.get(`${API_GAME_URL}${API_PIECE_CAPTURED}${idUser}`);
    //   return res.data;
    // },
    async getLeaderboard() {
      const response = await axiosInstance.get(`${API_BASE_USERS}${API_LEADERBOARD}`);
      return response.data;
    }
  };
}

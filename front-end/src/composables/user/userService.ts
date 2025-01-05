import type { User } from '@/models/User.model';
import { useUserApi } from './userApi';

const userApi = useUserApi();
export function useUserService() {
  return {
    async authenticate(user: User): Promise<User> {
      user.token = await userApi.authenticate(user);
      return user;
    },
    async register(user: User): Promise<User> {
      user.token = await userApi.register(user);
      return user;
    },
    async getWinrate(idUser: number): Promise<number> {
      return userApi.getWinrate(idUser);
    },
    async getNbMoves(idUser: number): Promise<number> {
      return userApi.getNbMoves(idUser);
    },
    async getPiecesCaptured(idUser: number): Promise<number> {
      return userApi.getPiecesCaptured(idUser);
    },
    async getNbGames(idUser: number): Promise<number> {
      return userApi.getNbGames(idUser);
    },
    async getLeaderboard() {
      return userApi.getLeaderboard();
    }
  };
}

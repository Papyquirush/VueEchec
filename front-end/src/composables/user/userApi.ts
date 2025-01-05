import axiosInstance from '@/config/AxiosConfig';
import { API_BASE_AUTH, API_BASE_USERS, API_WINRATE, API_NBMOVES, API_GAME_URL, API_PIECE_CAPTURED, API_LEADERBOARD, API_TOTAL } from '@/constants';
import type { User } from '@/models/User.model';

export function useUserApi() {
  return {
    async authenticate(user: User): Promise<string> {
      try {
        const res = await axiosInstance.post(`${API_BASE_AUTH}`, {
          username: user.username,
          password: user.password,
        });
        localStorage.setItem('username', user.username);
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('idUser', res.data.userId);
        return res.data.token;
      } catch (error: any) {
        if (error.response?.status === 401) {
          throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
        } else if (error.response?.status === 400) {
          throw new Error('Veuillez remplir tous les champs');
        } else {
          throw new Error('Erreur lors de la connexion');
        }
      }
    },

    async register(user: User): Promise<string> {
      try {
        const res = await axiosInstance.post(`${API_BASE_USERS}`, {
          username: user.username,
          password: user.password,
        });
        return res.data.token;
      } catch (error: any) {
        if (error.response?.status === 400) {
          if (error.response.data?.message?.includes('username')) {
            throw new Error('Le nom d\'utilisateur est déjà pris');
          }
          throw new Error('Veuillez remplir tous les champs correctement');
        } else {
          throw new Error('Erreur lors de l\'inscription');
        }
      }
    },

    async getWinrate(idUser: number): Promise<number> {
      try {
        const res = await axiosInstance.get(`${API_BASE_USERS}${API_WINRATE}${idUser}`);
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw new Error('Utilisateur introuvable');
        } else {
          throw new Error('Erreur lors de la récupération du taux de victoire');
        }
      }
    },

    async getNbMoves(idUser: number): Promise<number> {
      try {
        const res = await axiosInstance.get(`${API_GAME_URL}${API_NBMOVES}${idUser}`);
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw new Error('Utilisateur introuvable');
        } else {
          throw new Error('Erreur lors de la récupération du nombre de mouvements');
        }
      }
    },

    async getPiecesCaptured(idUser: number): Promise<number> {
      try {
        const res = await axiosInstance.get(`${API_GAME_URL}${API_PIECE_CAPTURED}${idUser}`);
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw new Error('Utilisateur introuvable');
        } else {
          throw new Error('Erreur lors de la récupération des pièces capturées');
        }
      }
    },

    async getNbGames(idUser: number): Promise<number> {
      try {
        const res = await axiosInstance.get(`${API_GAME_URL}${API_TOTAL}${idUser}`);
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw new Error('Utilisateur introuvable');
        } else {
          throw new Error('Erreur lors de la récupération du nombre de parties');
        }
      }
    },

    async getLeaderboard() {
      try {
        const response = await axiosInstance.get(`${API_BASE_USERS}${API_LEADERBOARD}`);
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          throw new Error('Vous devez être connecté pour voir le classement');
        } else {
          throw new Error('Erreur lors de la récupération du classement');
        }
      }
    }
  };
}
import axiosInstance from '@/config/AxiosConfig';
import { API_BASE_URL, API_GAME_URL, API_SLOTS_AVAILABLE, API_MOVE_PIECE, API_WINNING, API_PROMOTE, API_PUBLIC_GAMES, API_GAMES_OF_USERS, API_MAKE_PUBLIC } from '@/constants';
import { AxiosError } from 'axios';

export const ChessBoardApi = {
  async initializeGame(playerWhiteId: number, playerBlackId: number, isPublic: boolean = false) {
    try {
      const response = await axiosInstance.post(API_BASE_URL + API_GAME_URL, {
        playerWhiteId,
        playerBlackId,
        isPublic,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Données de joueurs invalides');
      } else if (error.response?.status === 401) {
        throw new Error('Vous devez être connecté pour créer une partie');
      } else if (error.response?.status === 403) {
        throw new Error('Vous n\'avez pas les droits pour créer une partie');
      } else {
        throw new Error('Erreur lors de la création de la partie');
      }
    }
  },


  async initializeGameReview(playerWhiteId: number, playerBlackId: number, isPublic: boolean = false,isReview: boolean = true) {
    const response = await axiosInstance.post(API_BASE_URL+API_GAME_URL, {
      playerWhiteId,
      playerBlackId,
      isPublic,
      isReview
    });
    return response.data;
  },

  async getGameState(gameId: number) {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${gameId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Partie introuvable');
      } else if (error.response?.status === 401) {
        throw new Error('Vous devez être connecté pour accéder à cette partie');
      } else {
        throw new Error('Erreur lors de la récupération de l\'état de la partie');
      }
    }
  },


  async getGameStateReview(gameId: number,move : number) {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}gameStates/${gameId}}`);
      return response.data[move-1];
    } catch (error: any) {
      if (error.response?.status === 500) {
        throw new Error('Partie non trouvée');
      }
      throw error;
    }
  },

  async getAvailableSlots(gameId: number, position: string) {
    try {
      const response = await axiosInstance.get(API_BASE_URL + API_SLOTS_AVAILABLE + `${gameId}/${position}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Position ou partie introuvable');
      } else if (error.response?.status === 400) {
        throw new Error('Position invalide');
      } else {
        throw new Error('Erreur lors de la récupération des cases disponibles');
      }
    }
  },

  async getWinningGauge(gameId: number) {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${API_WINNING}${gameId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Partie introuvable');
      } else {
        throw new Error('Erreur lors de la récupération des statistiques de victoire');
      }
    }
  },

  async promotePiece(gameId: number, promotionPosition: { value: string }, pieceType: string) {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}${API_PROMOTE}${gameId}/${promotionPosition.value}/${pieceType}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Promotion invalide');
      } else if (error.response?.status === 403) {
        throw new Error('Ce n\'est pas votre tour de jouer');
      } else if (error.response?.status === 404) {
        throw new Error('Partie ou position introuvable');
      } else {
        throw new Error('Erreur lors de la promotion de la pièce');
      }
    }
  },

  async movePiece(gameId: number, from: string, to: string) {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}${API_MOVE_PIECE}${gameId}/${from}/${to}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Mouvement invalide');
      } else if (error.response?.status === 403) {
        throw new Error('Ce n\'est pas votre tour de jouer');
      } else if (error.response?.status === 404) {
        throw new Error('Partie ou position introuvable');
      } else {
        throw new Error('Erreur lors du déplacement de la pièce');
      }
    }
  },

  async getPublicGames() {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${API_PUBLIC_GAMES}`);
      return response.data;
    } catch (error: any) {
      throw new Error('Erreur lors de la récupération des parties publiques');
    }
  },

  async getGamesOfUser(userId: number) {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}${API_GAME_URL}${API_GAMES_OF_USERS}${userId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Utilisateur introuvable');
      } else {
        throw new Error('Erreur lors de la récupération des parties de l\'utilisateur');
      }
    }
  },

  async patchGameToPublic(gameId: number) {

    const response = await axiosInstance.patch(`${API_BASE_URL}${API_GAME_URL}${API_MAKE_PUBLIC}${gameId}`);
    return response.data;
  },


};
    try {
      const response = await axiosInstance.patch(`${API_BASE_URL}${API_GAME_URL}${API_MAKE_PUBLIC}${gameId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Partie introuvable');
      } else if (error.response?.status === 403) {
        throw new Error('Vous n\'avez pas les droits pour rendre cette partie publique');
      } else {
        throw new Error('Erreur lors du changement de visibilité de la partie');
      }
    }
  }
};


<template>
    <div class="bg-blue-950">
      <HeaderVue />
    </div>
    
    <div class="flex flex-col items-center text-white py-12 px-6">
      <h1 class="text-3xl font-extrabold mb-8 text-center">Liste des Parties Publiques</h1>
      
      <div v-if="games.length > 0" class="w-full max-w-4xl">
        <div class="space-y-6">
          <div v-for="game in games" :key="game.id" class="bg-gray-400 hover:bg-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex flex-col items-start space-y-4">
              <p class="text-lg font-semibold text-yellow-400">Partie ID: <span class="text-white">{{ game.id }}</span></p>
              <p class="text-lg font-semibold">Joueur Blanc: <span class="text-white">{{ game.playerWhiteId }}</span></p>
              <p class="text-lg font-semibold">Joueur Noir: <span class="text-white">{{ game.playerBlackId }}</span></p>
              <p class="text-lg font-semibold">État: <span :class="{'text-green-500': game.isFinished, 'text-red-500': !game.isFinished}">
                {{ game.isFinished ? 'Terminé' : 'En cours' }}</span></p>
              <p class="text-lg font-semibold">Vainqueur: <span class="text-white">{{ game.winnerId || 'Aucun' }}</span></p>
              <p class="text-sm">Créée le: <span class="text-white">{{ new Date(game.createdAt).toLocaleString() }}</span></p>
              <p class="text-sm">Terminée le: <span class="text-white">{{ new Date(game.finishedAt).toLocaleString() }}</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center mt-12">
        <p class="text-lg font-semibold text-gray-300">Aucun jeu disponible.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import HeaderVue from '@/components/HeaderVue.vue';
  import { ChessBoardService } from '@/composables/chessboard/ChessBoardService';
  
  const games = ref<Array<any>>([]);
  const chessBoardServive = ChessBoardService;
  
  onMounted(async () => {
    try {
      const response = await chessBoardServive.getPublicGames();
      games.value = response;
    } catch (error) {
      console.error('Erreur lors de la récupération des jeux publics', error);
    }
  });
  </script>
  
<template>
    <div class="bg-blue-950">
      <HeaderVue />
    </div>
    
    <div class="flex flex-col items-center text-white h-full">
      <h1 class="text-2xl font-bold my-20">Liste des parties publiques</h1>
      
      <div v-if="games.length > 0">
        <ul class="list-none">
          <li v-for="game in games" :key="game.id" class="my-4">
            <div class="flex flex-col items-center">
              <p>Partie ID: {{ game.id }}</p>
              <p>Joueur Blanc: {{ game.playerWhiteId }}</p>
              <p>Joueur Noir: {{ game.playerBlackId }}</p>
              <p>État: {{ game.isFinished ? 'Terminé' : 'En cours' }}</p>
              <p>Vainqueur: {{ game.winnerId || 'Aucun' }}</p>
              <p>Créée le: {{ new Date(game.createdAt).toLocaleString() }}</p>
              <p>Terminée le: {{ new Date(game.finishedAt).toLocaleString() }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun jeu disponible.</p>
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
  
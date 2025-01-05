<template>
    <div class="w-full max-w-2xl mx-auto py-4">
      <h2 class="text-xl mb-2 underline text-white">Chances de victoires :</h2>
      
      <div class="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="absolute left-0 h-full bg-white border border-gray-300"
          :style="{ width: `${winningPercentages.white}%` }"
        />
        <div 
          class="absolute right-0 h-full bg-black"
          :style="{ width: `${winningPercentages.black}%` }"
        />
        
        <div class="absolute w-full h-full flex justify-between items-center px-4">
          <span class="text-gray-800 font-bold">
            {{ winningPercentages.white.toFixed(1) }}%
          </span>
          <span class="text-white font-bold">
            {{ winningPercentages.black.toFixed(1) }}%
          </span>
        </div>
      </div>
      <div class="flex justify-between  text-white px-4">
        <div class="flex items-center">
          <div class="w-4 h-4 text-white rounded-sm mr-2" />
          <span>Blancs</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 text-white rounded-sm mr-2" />
          <span>Noirs</span>
        </div>
      </div>
      
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { ChessBoardService } from '@/composables/chessboard/ChessBoardService';
  
  const gameId = defineModel('gameId');
  const refreshTrigger = defineProps({ moveCount: Number });
  
  const winningPercentages = ref({
    white: 50,
    black: 50
  });
  const fetchWinningPercentages = async () => {
    
    
    if (!gameId.value) return;
    try {
      const data = await ChessBoardService.getWinningGauge(Number(gameId.value));
      winningPercentages.value = data;
      
    } catch (error) {
      console.error('Erreur lors de l\'affichage des poucentages:', error);
    }
  };
  
  watch(refreshTrigger, () => {
  fetchWinningPercentages();
}, { immediate: true });


</script>
<template>
    <div class="bg-blue-950">
      <HeaderVue/>
    </div>
    
    <div class="flex flex-col items-center text-white h-screen">
      <h1 class="text-2xl font-bold my-20">Classement des utilisateurs</h1>
      <div v-if="leaderboard.length > 0">
        <ul class="list-none">
          <li v-for="(user, index) in sortedLeaderboard" :key="user.username" class="my-2">
            <span>{{ index + 1 }}. {{ user.username }} - {{ user.winrate }}%</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun classement disponible.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import HeaderVue from '@/components/HeaderVue.vue';
  import { useUserService } from '@/composables/user/userService';
  
  const leaderboard = ref<Array<{ username: string, winrate: number }>>([]);
  
  onMounted(async () => {
    try {
      const response = await useUserService().getLeaderboard();
      leaderboard.value = response;
    } catch (error) {
      console.error('Erreur lors de la récupération du leaderboard', error);
    }
  });
  
  const sortedLeaderboard = computed(() => {
    return leaderboard.value.sort((a, b) => b.winrate - a.winrate);
  });
  </script>
  
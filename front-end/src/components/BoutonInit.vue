<template>
  <button @click="verif()" class="border rounded-lg bg-white text-black">Nouvelle partie</button>
</template>

<script setup lang="ts">
import { useUserConnecteService } from '@/composables/user/userConnecteService';

const isInit = defineModel<boolean>('isInit');

function verif () {
  isInit.value = !isInit.value;
  console.log(useUserConnecteService().userConnecte.value);
  
} 
</script> 

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>

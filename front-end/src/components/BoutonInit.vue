<template>
  <button @click="verif()" class="border rounded-lg bg-white text-black">Init</button>
</template>

<script setup lang="ts">

const isInit = defineModel<boolean>('isInit');

function verif () {
  isInit.value = !isInit.value;
} 
</script> 

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>

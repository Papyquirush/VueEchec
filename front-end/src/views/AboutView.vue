<template>
   <div class="bg-yellow-950"><HeaderVue/></div>
  <div class="about">
    <h1>This is an about Page with a chessboard included !</h1>
    <ChessBoard />
  </div>
</template>

<style>
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderVue from '@/components/HeaderVue.vue'
import {Tab} from "@headlessui/vue";
import ChessBoard from '@/components/ChessBoard.vue'
export default defineComponent({
  components: {
    Tab,
    HeaderVue,
    ChessBoard
  }
})
</script>

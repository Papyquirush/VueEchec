<template>
   <div class="bg-blue-950"><HeaderVue/></div>
    <ChessBoard />
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

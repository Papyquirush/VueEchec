<template>
  <div class="bg-blue-950"><HeaderVue/></div>

  <div>
      <h1 class="text-5xl">Vue échecs</h1>
  </div>

  <div>
    <h1 class="text-4xl">Le site d'échecs numéro 4 au monde !</h1>
    <ChessBoard />
  </div>
</template>

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

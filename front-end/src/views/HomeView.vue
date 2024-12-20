<template>
  <div class="bg-blue-950"><HeaderVue/></div>

  <div>
      <h1 class="text-5xl text-white text-center mt-4">Vue échecs</h1>
  </div>

  <div>
    <h1 class="text-4xl text-white text-center">Le site d'échecs numéro 4 au monde !</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderVue from '@/components/HeaderVue.vue'
import {Tab} from "@headlessui/vue";
export default defineComponent({
  components: {
    Tab,
    HeaderVue
  }
})
</script>

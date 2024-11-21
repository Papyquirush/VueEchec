<template>
  <img :src="pieceIcon" :alt="type" class="chess-piece" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const pieceIcon = computed(() => {
      return require(`@/assets/chess_pieces/${props.type}.svg`)
    })
    return {
      pieceIcon
    }
  }
})
</script>

<style scoped>
.chess-piece {
  width: 40px;
  height: 40px;
}
</style>

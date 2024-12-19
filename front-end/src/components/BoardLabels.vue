<template>
  <span 
    v-if="rowIndex === 0"
    :class="['legend-cols', isRotated ? 'block' : 'hidden']"
  >
    {{ columns[colIndex] }}
  </span>
  <span 
    v-if="colIndex === 7"
    :class="['legend-rows', isRotated ? 'block' : 'hidden']"
  >
    {{ rows[rowIndex] }}
  </span>
  <span 
    v-if="rowIndex === 7"
    :class="['legend-cols', isRotated ? 'hidden' : 'block']"
  >
    {{ columns[colIndex] }}
  </span>
  <span 
    v-if="colIndex === 0"
    :class="['legend-rows', isRotated ? 'hidden' : 'block']"
  >
    {{ rows[rowIndex] }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  rowIndex: number;
  colIndex: number;
  isRotated: boolean;
  columns: string[];
  rows: string[];
}>();
</script>

<style scoped>
.legend-cols {
  position: absolute;
  bottom: 0;
  right: 2%;
  font-size: 1.5vw;
  font-weight: bold;
}

.legend-rows {
  position: absolute;
  top: 2%;
  left: 2%;
  font-size: 1.5vw;
  font-weight: bold;
}
</style>
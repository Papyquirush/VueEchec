<template>
  <button @click="toggleRotate" class="border rounded-lg bg-white text-black">Rotate</button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

const toggleRotate = () => {
  emit('update:modelValue', !props.modelValue);

};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>

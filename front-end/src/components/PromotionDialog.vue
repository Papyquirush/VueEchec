<template>
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-xl font-bold mb-4 text-center">Choisissez une pièce pour la promotion</h2>
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="piece in pieces"
            :key="piece"
            @click="selectPiece(piece)"
            class="p-4 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center"
          >
            <ChessPiece 
              :type="piece"
              :color="color"
              class="w-12 h-12"
            />
            <span class="mt-2 capitalize text-sm">{{ piece }}</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import ChessPiece from './ChessPiece.vue';
  
  const props = defineProps<{
    modelValue: boolean;
    color: 'white' | 'black';
  }>();
  
  const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'promote', pieceType: 'queen' | 'rook' | 'bishop' | 'knight'): void;
    }>();

    // Et définir le tableau des pièces avec le bon type
    const pieces: ('queen' | 'rook' | 'bishop' | 'knight')[] = ['queen', 'rook', 'bishop', 'knight'];
  
  const selectPiece = (pieceType: 'queen' | 'rook' | 'bishop' | 'knight') => {
    emit('promote', pieceType);
    emit('update:modelValue', false);
  };
  </script>
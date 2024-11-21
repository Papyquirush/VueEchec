<template>
  <div class="chessboard">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell">
        <ChessPiece v-if="cell" :type="cell" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChessPiece from './ChessPiece.vue'

export default defineComponent({
  components: {
    ChessPiece
  },
  data() {
    return {
      board: [
        ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
      ]
    }
  }
})
</script>

<style scoped>
.chessboard {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1px;
}
.row {
  display: contents;
}
.cell {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0d9b5;
}
.cell:nth-child(even) {
  background-color: #b58863;
}
</style>

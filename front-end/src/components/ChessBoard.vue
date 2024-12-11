<template>
  <BoutonRotate v-model="isRotated"/>
  <div
    :class="['chessboard', isRotated ? 'rotatitating' : 'unRotatitating']">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <div v-for="(cell, colIndex) in row"
           :key="colIndex" class="cell"
           :class="[changeCell(rowIndex, colIndex), isRotated ? 'rotatitating' : 'unRotatitating']">
        <ChessPiece v-if="cell" :type="cell.pieceType" :color="cell.color" />
        <span v-if="rowIndex === 0"
              :class="['legend-cols', isRotated ? 'block' : 'hidden']">{{ columns[colIndex] }}</span>
        <span v-if="colIndex === 7"
              :class="['legend-rows', isRotated ? 'block' : 'hidden']">{{ rows[rowIndex] }}</span>
        <span v-if="rowIndex === 7"
              :class="['legend-cols', isRotated ? 'hidden' : 'block']">{{ columns[colIndex] }}</span>
        <span v-if="colIndex === 0"
              :class="['legend-rows', isRotated ? 'hidden' : 'block']">{{ rows[rowIndex] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChessPiece from './ChessPiece.vue';
import BoutonRotate from "./BoutonRotate.vue";

type Cell = { pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn', color: 'white' | 'black' } | null;

const backendData = {
  gameState: {
    a2: { pieceType: 'pawn', color: 'white' },
    a7: { pieceType: 'pawn', color: 'black' },
    b2: { pieceType: 'pawn', color: 'white' },
    b7: { pieceType: 'pawn', color: 'black' },
    c2: { pieceType: 'pawn', color: 'white' },
    c7: { pieceType: 'pawn', color: 'black' },
    d2: { pieceType: 'pawn', color: 'white' },
    d7: { pieceType: 'pawn', color: 'black' },
    e2: { pieceType: 'pawn', color: 'white' },
    e7: { pieceType: 'pawn', color: 'black' },
    f2: { pieceType: 'pawn', color: 'white' },
    f7: { pieceType: 'pawn', color: 'black' },
    g2: { pieceType: 'pawn', color: 'white' },
    g7: { pieceType: 'pawn', color: 'black' },
    h2: { pieceType: 'pawn', color: 'white' },
    h7: { pieceType: 'pawn', color: 'black' },
    a1: { pieceType: 'rook', color: 'white' },
    h1: { pieceType: 'rook', color: 'white' },
    b1: { pieceType: 'knight', color: 'white' },
    g1: { pieceType: 'knight', color: 'white' },
    c1: { pieceType: 'bishop', color: 'white' },
    f1: { pieceType: 'bishop', color: 'white' },
    d1: { pieceType: 'queen', color: 'white' },
    e1: { pieceType: 'king', color: 'white' },
    a8: { pieceType: 'rook', color: 'black' },
    h8: { pieceType: 'rook', color: 'black' },
    b8: { pieceType: 'knight', color: 'black' },
    g8: { pieceType: 'knight', color: 'black' },
    c8: { pieceType: 'bishop', color: 'black' },
    f8: { pieceType: 'bishop', color: 'black' },
    d8: { pieceType: 'queen', color: 'black' },
    e8: { pieceType: 'king', color: 'black' }
  } as const };

const mapPositionToIndex = (pos: string) => {
  const col = pos.charCodeAt(0) - 97;
  const row = 8 - parseInt(pos[1], 10);
  return { row, col };
};

const board = ref<Cell[][]>(Array(8).fill(null).map(() => Array(8).fill(null)));

const initializeBoard = () => {
  for (const [position, piece] of Object.entries(backendData.gameState)) {
    const { row, col } = mapPositionToIndex(position);
    board.value[row][col] = piece;
  }
};

const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];

const isRotated = ref(false);

const rotateBoard = () => {
  isRotated.value = !isRotated.value;
};
const changeCell = (rowIndex: number, colIndex: number): string => {
  let resultClass = "";
  if ((rowIndex + colIndex) % 2 === 1) {
    resultClass += " dark";
  }
  return resultClass;
};

onMounted(() => {
  initializeBoard();
});
</script>

<style scoped>
.chessboard {
  display: grid;
  grid-template-columns: repeat(8, 5vw);
  grid-template-rows: repeat(8, 5vw);
  justify-content: center;
  align-items: center;
  padding-top: 5%;
  padding-bottom: 5%;
}
.row {
  display: contents;
}
.cell {
  width: 5vw;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #b4cfe8;
  color: #374d65;
}
.cell:hover {
  background-color: #6b8baf;
}
.dark {
  background-color: #374d65;
  color: #b4cfe8;
}
.dark:hover {
  background-color: #2f4156;
}
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

.rotatitating {
  animation: rotateBoard 1.5s ease-in-out forwards;
}

.unRotatitating {
  animation: unRotateBoard 1.5s ease-in-out forwards;
}

@keyframes rotateBoard {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

@keyframes unRotateBoard {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>

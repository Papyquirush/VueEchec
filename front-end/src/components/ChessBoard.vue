<template>
  <BoutonInit v-model:isInit="isInit"/>
  <BoutonRotate v-model="isRotated"/>
  <h1 class="text-3xl text-white">Partie numéro : {{ gameId }}</h1>
  <div
    :class="['chessboard selectedNone', isRotated ? 'rotatitating' : 'unRotatitating']">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <div v-for="(cell, colIndex) in row"
           :key="colIndex" class="cell"
           :class="[changeCell(rowIndex, colIndex),isRotated ? 'rotatitating' : 'unRotatitating',
           isHighlighted(rowIndex, colIndex) ? 'highlighted' : ''
         ]"
         @click="handleCellClick(rowIndex, colIndex)">
        <ChessPiece v-if="cell" :type="cell.pieceType" :color="cell.color" />
        <span v-if="rowIndex === 0"
              :class="['legend-cols', isRotated ? 'block' : 'hidden']">{{ COLUMNS[colIndex] }}</span>
        <span v-if="colIndex === 7"
              :class="['legend-rows', isRotated ? 'block' : 'hidden']">{{ ROWS[rowIndex] }}</span>
        <span v-if="rowIndex === 7"
              :class="['legend-cols', isRotated ? 'hidden' : 'block']">{{ COLUMNS[colIndex] }}</span>
        <span v-if="colIndex === 0"
              :class="['legend-rows', isRotated ? 'hidden' : 'block']">{{ ROWS[rowIndex] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import ChessPiece from './ChessPiece.vue';
import BoutonInit from './BoutonInit.vue';
import BoutonRotate from "./BoutonRotate.vue";
import { ChessBoardService } from '@/composables/chessboard/ChessBoardService';
import { COLUMNS , ROWS, type Cell } from '@/constants';




const gameId = ref<string>();
gameId.value = "1";

const currGame = ref();

const board = ref<Cell[][]>(Array(8).fill(null).map(() => Array(8).fill(null)));

const isRotated = ref(false);

const isInit = ref(false);


watch(isInit, async (value) => {
  if (value) {
    currGame.value = await ChessBoardService.initializeBoard(1,3);
    board.value = currGame.value.board;
    gameId.value = currGame.value.gameId;

    console.log(currGame.value.gameId);
    
    console.log(gameId.value);
  }
});

const changeCell = (rowIndex: number, colIndex: number): string => {
  let resultClass = "";
  if ((rowIndex + colIndex) % 2 === 1) {
    resultClass += " dark";
  }
  return resultClass;
};

const availableMoves = ref<string[]>([]);
const selectedCell = ref<{row: number, col: number} | null>(null);

const indexToPosition = (row: number, col: number): string => {
  const column = String.fromCharCode(97 + col);
  const rowNotation = 8 - row;
  return `${column}${rowNotation}`;
};

const isHighlighted = (row: number, col: number): boolean => {
  const position = indexToPosition(row, col);
  return availableMoves.value.includes(position);
};

const handleCellClick = async (row: number, col: number) => {
  if (!currGame.value?.gameId) return;
  
  if (board.value[row][col]) {
    const position = indexToPosition(row, col);
    try {
      availableMoves.value = await ChessBoardService.fetchAndHighlightAvailableSlots(
        currGame.value.gameId,
        position
      );
      selectedCell.value = { row, col };
    } catch (error) {
      console.error("Erreur lors de la récupération des mouvements possibles:", error);
      availableMoves.value = [];
      selectedCell.value = null;
    }
  } else {
    availableMoves.value = [];
    selectedCell.value = null;
  }
};

onBeforeMount(async() => {
  if(currGame.value != undefined){
    if (gameId.value) {
      currGame.value = await ChessBoardService.loadBoard(Number(gameId.value));
    }
    console.log(currGame.value.gameId);
  }
});

onMounted(() => {
    
});



</script>

<style scoped>

.selectedNone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.highlighted {
  background-color: #7fb2e6 !important; 
  position: relative;
}

.highlighted::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  pointer-events: none;
}


.highlighted:hover {
  background-color: #6b9fd3 !important;
  cursor: pointer;
}

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

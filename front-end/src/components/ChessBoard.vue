<template>
  <BoutonInit v-model:isInit="isInit" class="m-10"/>
  <!-- <BoutonRotate v-model="isRotated"/> -->
  <h1 class="text-3xl text-white text-center underline">Partie numéro : {{ gameId }}</h1>
  <div :class="['chessboard', isRotated ? 'rotatitating' : 'unRotatitating']">
    <div v-for="(row, rowIndex) in localBoard" :key="rowIndex" class="row">
      <div v-for="(cell, colIndex) in row"
           :key="colIndex"
           class="cell"
           :class="[
             getCellClasses(rowIndex, colIndex),
             isRotated ? 'rotatitating' : 'unRotatitating',
             {'highlighted': isHighlighted(rowIndex, colIndex)},
             {'selected': isSelectedCell(rowIndex, colIndex)}
           ]"
           @click="handleCellClick(rowIndex, colIndex)">
        <ChessPiece 
          v-if="cell" 
          :type="cell.pieceType" 
          :color="cell.color"
          :class="{'piece-animation': isMoving(rowIndex, colIndex)}"
        />
        <BoardLabels 
          :row-index="rowIndex"
          :col-index="colIndex"
          :is-rotated="isRotated"
          :columns="COLUMNS"
          :rows="ROWS"
        />
      </div>
    </div>
  </div>
  <WinningGauge 
  :gameId="gameId"
  :moveCount="moveCount"
   />
   <PromotionDialog
    v-model="showPromotion"
    :color="getPawnColor()"
    @promote="handlePromotion"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive } from 'vue';
import ChessPiece from './ChessPiece.vue';
import BoutonInit from './BoutonInit.vue';
import BoutonRotate from "./BoutonRotate.vue";
import BoardLabels from './BoardLabels.vue';
import { ChessBoardService } from '@/composables/chessboard/ChessBoardService';
import { COLUMNS, ROWS, type Cell } from '@/constants';
import { useUserConnecteService } from '@/composables/user/userConnecteService';
import WinningGauge from './WinningGauge.vue';
import PromotionDialog from './PromotionDialog.vue';
import type { EnumDeclaration } from 'typescript';


const gameId = ref<string>("1");
const localBoard = ref<Cell[][]>(Array(8).fill(null).map(() => Array(8).fill(null)));
const isRotated = ref(false);
const isInit = ref(false);
const currGame = ref();
const moveCount = ref(0);
let isUpdating = false;
const showPromotion = ref(false);
const promotionPosition = ref("");

const selectedCell = ref<{row: number, col: number} | null>(null);
const availableMoves = ref<string[]>([]);
const lastMove = ref<{from: {row: number, col: number}, to: {row: number, col: number}} | null>(null);

const indexToPosition = (row: number, col: number): string => {
  const column = String.fromCharCode(97 + col);
  const rowNotation = 8 - row;
  return `${column}${rowNotation}`;
};

const positionToIndex = (position: string): {row: number, col: number} => {
  const col = position.charCodeAt(0) - 97;
  const row = 8 - parseInt(position[1]);
  return { row, col };
};

const getCellClasses = (rowIndex: number, colIndex: number): string => {
  return (rowIndex + colIndex) % 2 === 1 ? 'dark' : '';
};

const isHighlighted = (row: number, col: number): boolean => {
  return availableMoves.value.includes(indexToPosition(row, col));
};

const isSelectedCell = (row: number, col: number): boolean => {
  return selectedCell.value?.row === row && selectedCell.value?.col === col;
};

const isMoving = (row: number, col: number): boolean => {
  if (!lastMove.value) return false;
  const { to } = lastMove.value;
  return to.row === row && to.col === col;
};

const handleCellClick = async (row: number, col: number) => {
  if (!currGame.value?.gameId || isUpdating) return;
  
  const position = indexToPosition(row, col);
  const clickedPiece = localBoard.value[row][col];

  if (selectedCell.value) {
    if (isHighlighted(row, col)) {
      const fromPosition = indexToPosition(selectedCell.value.row, selectedCell.value.col);
      await movePiece(fromPosition, position);
    } else {
      clearSelection();
      if (clickedPiece) {
        await selectPiece(row, col);
      }
    }
  } else if (clickedPiece) {
    await selectPiece(row, col);
  }
};

const selectPiece = async (row: number, col: number) => {
  try {
    const position = indexToPosition(row, col);
    availableMoves.value = await ChessBoardService.fetchAndHighlightAvailableSlots(
      currGame.value.gameId,
      position
    );
    selectedCell.value = { row, col };
  } catch (error) {
    console.error("Erreur lors de la récupération des mouvements:", error);
    clearSelection();
  }
};

const movePiece = async (from: string, to: string) => {
  const fromIndices = positionToIndex(from);
  const toIndices = positionToIndex(to);

  try {
    isUpdating = true;
    moveCount.value++;
    await ChessBoardService.movePiece(currGame.value.gameId, from, to);


    const movingPiece = JSON.parse(JSON.stringify(localBoard.value[fromIndices.row][fromIndices.col]));
    const newBoard = localBoard.value.map(row => [...row]);
    newBoard[fromIndices.row][fromIndices.col] = null;
    newBoard[toIndices.row][toIndices.col] = movingPiece;
    localBoard.value = newBoard;
    
    if (isPawnPromotion(from, to)) {
      showPromotion.value = true;
      promotionPosition.value = to;
    } else {
      lastMove.value = { from: fromIndices, to: toIndices };
      clearSelection();
      await new Promise(resolve => setTimeout(resolve, 700));
      await syncWithServer();
    }
    //variable pour actualiser la barre de % de victoire
    
    //isRotated.value = !isRotated.value;
    await new Promise(resolve => setTimeout(resolve, 700));
    await syncWithServer();
  } catch (error) {
    console.error("Erreur lors du mouvement:", error);
    await syncWithServer();
  } finally {
    isUpdating = false;
  }
};

const clearSelection = () => {
  selectedCell.value = null;
  availableMoves.value = [];
};



const loadGame = async () => {
  const savedGameId = localStorage.getItem('currentGameId');
  
  if (savedGameId) {
    gameId.value = savedGameId;
  }
  
  const loadedGame = await ChessBoardService.loadBoard(Number(gameId.value));
  currGame.value = { gameId: loadedGame.gameId };
  localBoard.value = loadedGame.board;

  localStorage.setItem('currentGameId', currGame.value.gameId);
};

const syncWithServer = async () => {
  const loadedGame = await ChessBoardService.loadBoard(currGame.value.gameId);
  localBoard.value = loadedGame.board;
};

watch(isInit, async (value) => {
  if (value) {
    try {
    const idUser = useUserConnecteService().userConnecte.value.id;
    const newGame = await ChessBoardService.initializeBoard(idUser, 3);
    currGame.value = { gameId: newGame.gameId };
    localBoard.value = newGame.board;
    gameId.value = newGame.gameId.toString();
    localStorage.setItem('currentGameId', gameId.value);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la partie: Vous êtes connectez ? ", error);
  }
}
});

const isPawnPromotion = (from: string, to: string): boolean => {
  const piece = localBoard.value[positionToIndex(from).row][positionToIndex(from).col];
  if (piece?.pieceType !== 'pawn') return false;
  
  const toRow = positionToIndex(to).row;
  // Un pion blanc atteint la rangée 8 (index 0) ou un pion noir atteint la rangée 1 (index 7)
  return (piece.color === 'white' && toRow === 0) || 
         (piece.color === 'black' && toRow === 7);
};

const getPawnColor = (): 'white' | 'black' => {
  if (!promotionPosition.value) return 'white';
  const { row, col } = positionToIndex(promotionPosition.value);
  return localBoard.value[row][col]?.color || 'white';
};

const handlePromotion = async (pieceType: 'queen' | 'rook' | 'bishop' | 'knight') => {
  try {

    ChessBoardService.promotePiece(currGame.value.gameId, {value:promotionPosition.value}, pieceType);
    
    const { row, col } = positionToIndex(promotionPosition.value);
    const newBoard = localBoard.value.map(r => [...r]);
    newBoard[row][col] = {
      pieceType,
      color: getPawnColor()
    };
    localBoard.value = newBoard;
    
    promotionPosition.value = '';
    await syncWithServer();
  } catch (error) {
    console.error("Erreur lors de la promotion:", error);
    await syncWithServer();
  }
};

onMounted(async () => {
  await loadGame();
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
  transition: background-color 0.2s ease;
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

.highlighted {
  position: relative;
  background-color: #7fb2e6 !important;
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

.selected {
  background-color: #ffd700 !important;
}

.piece-animation {
  animation: movePiece 0.3s ease-in-out;
}

.rotatitating {
  animation: rotateBoard 1.5s ease-in-out forwards;
}

.unRotatitating {
  animation: unRotateBoard 1.5s ease-in-out forwards;
}

@keyframes movePiece {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes rotateBoard {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}

@keyframes unRotateBoard {
  from { transform: rotate(180deg); }
  to { transform: rotate(360deg); }
}
</style>
<template>
    <div class="bg-blue-950">
      <HeaderVue />
    </div>

    <div class="flex flex-col items-center text-white h-full">
        <h1 class="text-2xl font-bold my-20">Profil de <span>{{ username }}</span></h1>
        
        <div class="flex flex-col items-center">
            <div class="flex gap-4">
                <div>
                    <h2 class="text-lg font-bold">Winrate : <span>{{ winrate }}</span></h2>
                </div>
                <div>
                    <h2 class="text-lg font-bold">Nombre de parties : <span>{{ nbGames }}</span></h2>
                </div>
                <div>
                    <h2 class="text-lg font-bold">Nombre de pièces capturées : <span>{{ nbCaptures }}</span></h2>
                </div>
            </div>
        </div>
        
        <div v-if="games.length > 0" class="mt-8 w-full max-w-4xl">
            <h2 class="text-xl font-bold mb-4">Mes Jeux</h2>
            <div v-for="game in games" :key="game.id" class="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
                <div class="flex flex-col items-start space-y-4">
                    <p class="text-lg font-semibold text-yellow-400">Partie ID: <span class="text-white">{{ game.id }}</span></p>
                    <p class="text-lg font-semibold">Joueur Blanc: <span class="text-white">{{ game.playerWhiteId }}</span></p>
                    <p class="text-lg font-semibold">Joueur Noir: <span class="text-white">{{ game.playerBlackId }}</span></p>
                    <p class="text-lg font-semibold">État: 
                        <span :class="{'text-green-500': game.isFinished, 'text-red-500': !game.isFinished}">
                            {{ game.isFinished ? 'Terminé' : 'En cours' }}
                        </span>
                    </p>
                    <p class="text-lg font-semibold">Vainqueur: <span class="text-white">{{ game.winnerId || 'Aucun' }}</span></p>
                    <p class="text-sm">Créée le: <span class="text-white">{{ new Date(game.createdAt).toLocaleString() }}</span></p>
                    <p class="text-sm">Terminée le: <span class="text-white">{{ new Date(game.finishedAt).toLocaleString() }}</span></p>
                    
                    <p class="text-sm font-semibold">
                        Statut: 
                        <span :class="{'text-green-500': game.isPublic, 'text-red-500': !game.isPublic}">
                            {{ game.isPublic ? 'Public' : 'Privé' }}
                        </span>
                    </p>

                    <div v-if="!game.isPublic" class="mt-4">
                        <button 
                            @click="makeGamePublic(game.id)"
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-200">
                            Passer en Public
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="mt-8">
            <p class="text-lg font-semibold text-gray-300">Aucun jeu disponible.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderVue from '@/components/HeaderVue.vue'
import { useUserConnecteService } from '@/composables/user/userConnecteService'
import { useUserService } from '@/composables/user/userService'
import { ChessBoardService } from '@/composables/chessboard/ChessBoardService'
import { onMounted, ref } from 'vue'

const { userConnecte } = useUserConnecteService()
const username = userConnecte.value.username
const userService = useUserService()
const nbGames = ref(0)
const nbCaptures = ref(0)
const winrate = ref(0)

const games = ref<Array<any>>([])

onMounted(async () => {
    try {
        winrate.value = await userService.getWinrate(userConnecte.value.id)
    } catch (error) {
        console.error("Erreur lors de la récupération du winrate, Vous êtes connectés ?", error)
    }

    try {
       // nbGames.value = await userService.getNbGames(userConnecte.value.id)
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de parties, Vous êtes connectés ?", error)
    }

    try {
        //nbCaptures.value = await userService.getPiecesCaptured(userConnecte.value.id)
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de pièces capturées, Vous êtes connectés ?", error)
    }

    try {
        const response = await ChessBoardService.getGamesOfUser(userConnecte.value.id)
        games.value = response
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux de l'utilisateur", error)
    }
})

const makeGamePublic = async (gameId: number) => {
    try {
        await ChessBoardService.patchGameToPublic(gameId)
        const gameIndex = games.value.findIndex((game) => game.id === gameId)
        if (gameIndex !== -1) {
            games.value[gameIndex].isPublic = true
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut public du jeu", error)
    }
}
</script>

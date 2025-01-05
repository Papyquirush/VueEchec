<template>
    <div class="bg-blue-950"><HeaderVue/></div>
    <div class="flex flex-col items-center text-white h-screen">
        <h1 class="text-2xl font-bold my-20">Profil de <span> {{ username }}</span></h1>
        <div class="flex flex-col items-center">
            <div class="flex gap-4">
                <div>
                    <h2 class="text-lg font-bold">Winrate : <span> {{ winrate }} </span></h2>
                </div>
                <div>
                    <h2 class="text-lg font-bold">Nombre de parties : <span> {{ nbGames }} </span></h2>
                </div>
                <div>
                    <h2 class="text-lg font-bold">Nombre de pièces capturées : <span> {{ nbCaptures }} </span></h2>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderVue from '@/components/HeaderVue.vue'
import { useUserConnecteService } from '@/composables/user/userConnecteService'
import { useUserService } from '@/composables/user/userService';
import { onMounted, ref } from 'vue';

const { userConnecte } = useUserConnecteService()
const username = userConnecte.value.username
const userService = useUserService()
const nbGames = ref(0);
const nbCaptures = ref(0);
const winrate = ref(0);

onMounted(async () => {
    try {
        winrate.value = await userService.getWinrate(userConnecte.value.id);
        
    } catch (error) {
        console.error("Erreur lors de la récupération du winrate, Vous êtes connectés ?", error)
    }

    try {
        //nbGames.value = await userService.getNbGames(userConnecte.value.id);
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de parties, Vous êtes connectés ?", error)
    }

    try {
        //nbCaptures.value = await userService.getPiecesCaptured(userConnecte.value.id);
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de pièces capturées, Vous êtes connectés ?", error)
    }
    
})

</script>
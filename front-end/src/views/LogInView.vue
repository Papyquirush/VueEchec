<template>
  <div class="bg-blue-950"><HeaderVue/></div>
    <div class="text-white h-screen flex gap-5 flex-col items-center justify-center">
      <h2 class="font-bold text-xl py-50">Connexion</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col mx-[30%] p-20 gap-10 bg-blue-950 rounded-xl">
        <div class="flex flex-col">
          <label for="username" class="font-bold">Nom d'utilisateur</label> 
          <input 
            id="username"
            v-model="form.username"
            type="text"
            required
            class="p-2 rounded-lg bg-white text-black"
          />
        </div>
        
        <div class="flex flex-col">
          <label for="password" class="font-bold">Mot de passe</label>
          <input 
            id="password"
            v-model="form.password"
            type="password"
            required
            class="p-2 rounded-lg bg-white text-black"
          />
        </div>
  
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
  
        <button type="submit" class="p-2 border hover:bg-black rounded-lg ">Se connecter</button>
        
        <div class="register-link">
          <router-link to="/register">Pas encore de compte ? S'inscrire</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import HeaderVue from '@/components/HeaderVue.vue'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserService } from '@/composables/user/userService';
  import { useUserConnecteService } from '@/composables/user/userConnecteService';
  import type { User } from '@/models/User.model';
  
  const router = useRouter();
  const userService = useUserService();
  const { userConnecte } = useUserConnecteService();
  
  const form = ref({
    username: '',
    password: ''
  });
  
  const error = ref('');
  
  const handleLogin = async () => {
    try {
      error.value = '';
      const user: User = {
        username: form.value.username,
        password: form.value.password,
        id: 0
      };
      
      const authenticatedUser = await userService.authenticate(user);
      userConnecte.value = authenticatedUser;
      console.log(userConnecte.value);
      
      router.push('/play');
    } catch (e) {
      error.value = 'Identifiants invalides';
    }
  };
  </script>
  
  
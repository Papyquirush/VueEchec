<template>
  <div class="bg-blue-950"><HeaderVue/></div>
    <div class="login-container">
      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input 
            id="username"
            v-model="form.username"
            type="text"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input 
            id="password"
            v-model="form.password"
            type="password"
            required
          />
        </div>
  
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
  
        <button type="submit">Se connecter</button>
        
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
        password: form.value.password
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
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .error-message {
    color: red;
    font-size: 0.9em;
  }
  
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .register-link {
    text-align: center;
    margin-top: 10px;
  }
  </style>
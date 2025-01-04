<template>
  <div class="bg-blue-950"><HeaderVue/></div>
    <div class="register-container">
      <h2>Inscription</h2>
      <form @submit.prevent="handleRegister" class="register-form">
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
  
        <button type="submit" class="bg-blue-950 hover:bg-blue-700">S'inscrire</button>
        
        <div class="login-link">
          <router-link to="/login">Déjà un compte ? Se connecter</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import HeaderVue from '@/components/HeaderVue.vue'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserApi } from '@/composables/user/userApi';
  
  const router = useRouter();
  const userApi = useUserApi();
  
  const form = ref({
    username: '',
    password: ''
  });
  
  const error = ref('');
   
  const handleRegister = async () => {
    try {
      error.value = '';
      await userApi.register(form.value);
      router.push('/login');
    } catch (e) {
      error.value = 'Erreur lors de l\'inscription';
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .register-form {
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
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .login-link {
    text-align: center;
    margin-top: 10px;
  }
  </style>
<template>
  <div class="bg-blue-950"><HeaderVue /></div>
  <div class="text-white h-screen flex flex-col gap-5 items-center justify-center">
    <h2 class="font-bold text-xl py-50">Inscription</h2>
    <form @submit.prevent="handleRegister" class="flex flex-col mx-[30%] p-20 gap-10 bg-blue-950 rounded-xl">
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

      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>

      <button type="submit" class="p-2 border border-white hover:bg-black rounded-lg">S'inscrire</button>
      
      <div class="text-center mt-4">
        <router-link to="/login" class="text-blue-300 hover:underline">Déjà un compte ? Se connecter</router-link>
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
    password: '',
    id: 0
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
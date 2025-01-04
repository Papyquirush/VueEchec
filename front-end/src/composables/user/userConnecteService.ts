import type { User } from '@/models/User.model';
import { ref } from 'vue';

const userConnecte = ref<User>({ username: '', password: '' , token: '' });

export function useUserConnecteService() {

  const token = localStorage.getItem('authToken');
  if (token) {
    userConnecte.value.token = token;
  }
  return {
    userConnecte,
  };
}

export function logout() {
  localStorage.removeItem('authToken');
  userConnecte.value = { username: '', password: '', token: '' };
}
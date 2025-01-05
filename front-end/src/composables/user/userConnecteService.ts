import type { User } from '@/models/User.model';
import { ref } from 'vue';

const userConnecte = ref<User>({ username: '', password: '' , token: '' , id: 0});

export function useUserConnecteService() {

  const username = localStorage.getItem('username');
  if (username) {
    userConnecte.value.username = username;
  }

  const token = localStorage.getItem('authToken');
  if (token) {
    userConnecte.value.token = token;
  }

  const idUser = localStorage.getItem('idUser');
  if (idUser) {
    userConnecte.value.id = Number(idUser);
  }
  
  return {
    userConnecte,
  };
}

export function logout() {
  localStorage.removeItem('authToken');
  userConnecte.value = { username: '', password: '', token: '' ,id: 0};
}
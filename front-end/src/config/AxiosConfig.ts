import { useUserConnecteService } from '@/composables/user/userConnecteService';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/constants';

const { userConnecte } = useUserConnecteService();
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (userConnecte.value.token) {
    config.headers['Authorization'] = `Bearer ${userConnecte.value.token}`;
  }
  return config;
});

export default axiosInstance;
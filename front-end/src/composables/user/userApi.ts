import axiosInstance from '@/config/AxiosConfig';
import { API_BASE_AUTH, API_BASE_USERS } from '@/constants';
import type { User } from '@/models/User.model';

export function useUserApi() {
  return {
    async authenticate(user: User): Promise<string> {
      const res = await axiosInstance.post(`${API_BASE_AUTH}`, {
        username: user.username,
        password: user.password,
      });
      console.log(res.data.token);
      localStorage.setItem('authToken', res.data.token);
      return res.data.token;
    },
    async register(user: User): Promise<void> {
      const res = await axiosInstance.post(`${API_BASE_USERS}`, {
        username: user.username,
        password: user.password,
      });
      return res.data.token;
    },
  };
}
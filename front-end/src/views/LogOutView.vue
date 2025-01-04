<template>

</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useUserConnecteService } from '@/composables/user/userConnecteService';
  import { onMounted } from 'vue';

    const router = useRouter();
    const { userConnecte } = useUserConnecteService();

    onMounted(() => {
        localStorage.removeItem('authToken');
        userConnecte.value = { username: '', password: '', token: '' };
        router.push('/login');
    });
  

</script>
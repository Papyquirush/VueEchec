<template>
  <Disclosure as="nav" class="bg-gray-100 text-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0">
            <img class="size-8 chess-piece" src="@/assets/images/chess_icon.svg" alt="logo_chess" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a v-for="item in filteredNavigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
        </div>
        
        <div class="-mr-2 flex md:hidden">
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <DisclosureButton v-for="item in filteredNavigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-black' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useUserConnecteService } from '@/composables/user/userConnecteService'

import { useRouter } from 'vue-router'

const router = useRouter()
const { userConnecte } = useUserConnecteService()

const navigation = [
  { name: 'Vue Échecs', href: '/', current: true },
  { name: 'Jouer', href: '/play', current: false },
  { name: 'Mes parties', href: '#', current: false },
  { name: 'Profil', href: '/profile', current: false },
]

const filteredNavigation = computed(() => {
const nav = [...navigation]
if (!userConnecte.value.token) {
  nav.push({ name: 'Connexion', href: '/login', current: false })
} else {
  nav.push({ name: 'Déconnexion', href: '/logout', current: false })
}
return nav
})

</script>

<style scoped>
.chess-piece {
filter: invert(100%);
}
</style>
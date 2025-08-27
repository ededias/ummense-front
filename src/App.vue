

<template>
  <Header v-if="shouldShowLayout" :user-data="user" @logout-user="logoutUser" class="bg-white hidden lg:block shadow-lg transition-all duration-300 ease-in-out z-30" :class="[
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 '
        ]"/>
  <MobileHeader v-if="shouldShowLayout" class="block lg:hidden" @is-opened-mobile-menu="toggleMobileMenu" @close-menu-mobile="closeMobileMenu" />
  <div :class="[ route.name != 'Login' ? 'flex h-screen bg-gray-100' : '']">
      <SideMenu v-if="shouldShowLayout" :user="user" :menuOpened="isMobileMenuOpen" :class="[isMobileMenuOpen || !isMobile ? 'block' : 'hidden']" />
      <div :class="[ route.name != 'Login' ? 'flex-1 shadow-lg px-4 py-3' : '']">
        <router-view />
      </div>
  </div>

 
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'
import MobileHeader from './components/MobileHeader.vue'
import router from './router';
import { getUser, logout } from './services/auth';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router'

const user = ref({
  id: 0,
  name: "",
  role: "",
  email: ""
});


const isMobileMenuOpen = ref(false);
const isCollapsed = ref(false);

const route = useRoute()
const shouldShowLayout = computed(() => !route.meta.hideLayout)

const toggleMobileMenu = (isOpen: boolean) => {
  isMobileMenuOpen.value = isOpen;

  // Aqui você pode adicionar lógica adicional, como redirecionar o usuário ou exibir
  // um alerta, etc.
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;

  // Aqui você pode adicionar lógica adicional, como redirecionar o usuário ou exibir
  // um alerta, etc.
}

const logoutUser = (logoutAction: any) => {

  // Aqui você pode adicionar lógica adicional, como redirecionar o usuário ou exibir
  logout();
  router.push('/login')
};


const isMobile = ref(false)

const updateScreen = () => {
  isMobile.value = window.innerWidth < 1024 // Tailwind's "lg"
}

// onBeforeUnmount(() => {
//   // window.removeEventListener('resize', updateScreen)
// })



onMounted(async () => {
  


  updateScreen()
  window.addEventListener('resize', updateScreen)

  try {
    user.value = await getUser();

  } catch (error) {
    console.error('Erro ao obter usuário:', error);
  }
});


</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

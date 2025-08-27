<template>
    <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo/Brand -->
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-gray-900">Partly</h1>
                </div>
                

                <!-- User Menu -->
                <div class="relative" ref="menuRef">
                    <button @click="toggleMenu"
                        class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <i data-lucide="user" class="w-5 h-5 text-white"></i>
                        </div>
                        <div class="hidden md:block text-left">
                            <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                            <p class="text-xs text-gray-500">{{ userRole }}</p>
                        </div>
                        <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500 transition-transform duration-200"
                            :class="{ 'rotate-180': isMenuOpen }"></i>
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="isMenuOpen"
                        class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div class="py-1">
                            <!-- User Info Section -->
                            <div class="px-4 py-3 border-b border-gray-100">
                                <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                                <p class="text-sm text-gray-500">{{ userEmail }}</p>
                            </div>

                            <!-- Menu Items -->
                            <div class="py-1">
                                <button @click="handleMenuItemClick('User Data')"
                                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                   
                                    <User class="w-4 h-4 mr-3 text-gray-400"/>
                                    Usuário
                                </button>

                                <button @click="handleMenuItemClick('Settings')"
                                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                    
                                    <Settings class="w-4 h-4 mr-3 text-gray-400"/>
                                    Configurações
                                </button>

                                <div class="border-t border-gray-100 mt-1 pt-1">
                                    <button @click="logout"
                                        class="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150">
                                        
                                        <LogOut class="w-4 h-4 mr-3 text-gray-400"/>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script lang="ts" setup>

import { computed, defineEmits, onMounted, onUnmounted, ref } from 'vue';
import { Settings, User, LogOut } from 'lucide-vue-next';

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
}

interface Props {
  userData?: User
}

const props = withDefaults(defineProps<Props>(), {
    userData: () => ({
        id: 1,
        name: '',
        email: '',
        role: ''
    })
});

const isMenuOpen = ref(false);
const menuRef = ref(null);
const userName = ref(props.userData.name);
const userRole = ref(props.userData.role);
const userEmail = ref(props.userData.email);
const emit = defineEmits(['logout-user']);
computed(() => {
    userName.value = props.userData.name || 'Usuário';
    userRole.value = props.userData.role || 'Visitante';
    userEmail.value = props.userData.email || 'email@example.com';
})

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
    emit('logout-user', 'logout');
}

const handleMenuItemClick = (action: string) => {
    isMenuOpen.value = false;

    // Add your actual functionality here
    switch (action) {
        case 'User Data':
            // Handle user data action
            alert('User Data clicked');
            break;
        case 'Settings':
            // Handle settings action
            alert('Settings clicked');
            break;
        case 'Logout':
            // Handle logout action
            alert('Logout clicked');
            break;
    }
};

const handleClickOutside = (event: MouseEvent) => {
    const menuEl = menuRef.value as HTMLElement | null;
    if (menuEl && !menuEl.contains(event.target as Node)) {
        isMenuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
    // No need to initialize Lucide icons when using lucide-vue-next
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});



</script>
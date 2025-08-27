<!-- SideMenu.vue -->
<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="bg-white shadow-lg transition-all duration-300 ease-in-out z-30" :class="[
            isCollapsed ? 'w-16' : 'w-64',
            menuOpened ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]">
            <!-- Sidebar Header -->
            <div class="flex items-center justify-end p-4 border-b border-gray-200">
               
                <!-- Toggle Button -->
                <button @click="toggleSidebar"
                    class="p-1 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block">
                    <ChevronLeftIcon class="w-5 h-5 text-gray-500 transition-transform duration-300"
                        :class="{ 'rotate-180': isCollapsed }" />
                </button>
            </div>

            <!-- Navigation -->
            <nav class="p-4 space-y-2">
                <!-- Main Navigation Items -->
                <div v-for="item in mainNavItems" :key="item.id">
                    <!-- Simple Menu Item -->
                    <div v-if="!item.children">
                        <router-link :to="item.path"
                            class="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 group"
                            :class="[
                                isActiveRoute(item.path)
                                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            ]">
                            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" :class="[
                                isActiveRoute(item.path) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                            ]" />
                            <span v-if="!isCollapsed" class="font-medium transition-opacity duration-300">
                                {{ item.name }}
                            </span>
                            <span v-if="item.badge && !isCollapsed"
                                class="ml-auto px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                                {{ item.badge }}
                            </span>
                        </router-link>
                    </div>

                    <!-- Dropdown Menu Item -->
                    <div v-else>
                        <button @click="toggleDropdown(item.id)"
                            class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 group text-left"
                            :class="[
                                hasActiveChild(item)
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            ]">
                            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" :class="[
                                hasActiveChild(item) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                            ]" />
                            <span v-if="!isCollapsed" class="font-medium flex-1 transition-opacity duration-300">
                                {{ item.name }}
                            </span>
                            <ChevronDownIcon v-if="!isCollapsed" class="w-4 h-4 transition-transform duration-200"
                                :class="{ 'rotate-180': openDropdowns.includes(item.id) }" />
                        </button>

                        <!-- Dropdown Items -->
                        <div v-if="openDropdowns.includes(item.id) && !isCollapsed" class="ml-8 mt-2 space-y-1">
                            <router-link v-for="child in item.children" :key="child.id" :to="child.path"
                                class="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 group"
                                :class="[
                                    isActiveRoute(child.path)
                                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                ]">
                                <div class="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gray-400"></div>
                                <span class="text-sm font-medium">{{ child.name }}</span>
                                <span v-if="child.badge"
                                    class="ml-auto px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                                    {{ child.badge }}
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Bottom Section -->
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon class="w-5 h-5 text-gray-500" />
                    </div>
                    <div v-if="!isCollapsed" class="flex-1">
                        <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                        <p class="text-xs text-gray-500">{{ user.role }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
    Home,
    Users,
    ChevronDown,
    ChevronLeft,
    User
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()



// Icon aliases
const HomeIcon = Home
const UsersIcon = Users
const ChevronDownIcon = ChevronDown
const ChevronLeftIcon = ChevronLeft
const UserIcon = User

// Types
interface NavItem {
    id: string
    name: string
    path: string
    icon: any
    badge?: string | number
    children?: NavItem[]
}

interface User {
    name: string
    role: string
    avatar?: string
}

// Props
interface Props {
    user?: User,
    menuOpened?: boolean,
    closeMenu?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    user: () => ({
        name: 'John Doe',
        role: 'Admin'
    }),
    menuOpened: false,
    closeMenu: false
})



// State
const isCollapsed = ref(props.closeMenu)
const isMobileMenuOpen = ref(props.menuOpened)
const openDropdowns = ref<string[]>([])
const emit = defineEmits(['is-opened-mobile-menu']);

// Navigation items
const mainNavItems = ref<NavItem[]>([
    {
        id: 'dashboard',
        name: 'Início',
        path: '/',
        icon: HomeIcon
    },
    {
        id: 'users',
        name: 'Usuários',
        path: '/users',
        icon: UsersIcon
    },
])

// Methods
const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
    if (isCollapsed.value) {
        openDropdowns.value = []
    }
}


const toggleDropdown = (itemId: string) => {
    if (isCollapsed.value) return

    const index = openDropdowns.value.indexOf(itemId)
    if (index > -1) {
        openDropdowns.value.splice(index, 1)
    } else {
        openDropdowns.value.push(itemId)
    }
}

const isActiveRoute = (path: string) => {
    const splitedRoute = route.path.split('/')

    const checked = splitedRoute.some((item) => {
        if (item === 'shop') {
            return path.includes('shop')
        }
    })
    
    return checked || route.path === path || route.path.startsWith(path + '/');
    
}

const hasActiveChild = (item: NavItem) => {
    
    if (!item.children) return false
    return item.children.some(child => isActiveRoute(child.path))
}


// Handle responsive behavior
onMounted(() => {
    const handleResize = () => {
        if (window.innerWidth < 1024) {
            isCollapsed.value = false
            isMobileMenuOpen.value = false
        }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
})
</script>

<style scoped>
/* Custom scrollbar for navigation */
nav::-webkit-scrollbar {
    width: 4px;
}

nav::-webkit-scrollbar-track {
    background: transparent;
}

nav::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
}
</style>
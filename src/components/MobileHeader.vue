<template>

    <div class="flex justify-between items-center bg-white shadow-lg px-4 py-3">
        <div>
            <h1>Partly</h1>
        </div>
        <div>
            <!-- Mobile Overlay -->
            <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-20 z-20 lg:hidden"
                @click="closeMobileMenu"></div>

            <!-- Main Content -->
            <div class="flex-1 overflow-hidden">
                <!-- Mobile Header -->
                <div class="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                    <button @click="toggleMobileMenu" class="p-2 rounded-lg hover:bg-gray-100">
                        <MenuIcon class="w-6 h-6 text-gray-600" />
                    </button>
                </div>


            </div>
        </div>

    </div>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    Menu,
} from 'lucide-vue-next'

const MenuIcon = Menu;
const isMobileMenuOpen = ref(false)
const emit = defineEmits(['is-opened-mobile-menu', 'close-menu-mobile']);


const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    emit('close-menu-mobile', isMobileMenuOpen.value)
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    emit('is-opened-mobile-menu', isMobileMenuOpen.value)
}



</script>
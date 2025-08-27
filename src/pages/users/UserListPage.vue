<template>
  <div class="max-w-6xl mx-auto px-4">

    <Alert v-if="showAlert"
      type="error"
      title="Tem certeza que deseja excluir este usuário?"
      :show-confirm-button="true"
      :show-cancel-button="true"
      confirm-text="Excluir"
      cancel-text="Cancelar"
      @confirm="deleteUser"
      @cancel="acknowledgeExclusion"
    />

    <!-- Header -->
    <div class="bg-white rounded-lg shadow-lg mb-6">
      <div
        class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg flex justify-between items-center">
        <h1 class="text-3xl font-bold">Gerenciamento de Usuários</h1>
        <button @click="showAddForm = true" v-if="!showAddForm"
          class="bg-white text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2">
          <Plus class="w-4 h-4"></Plus>
          Adicionar Usuário
        </button>
      </div>

      <!-- Add User Form -->
      <div v-if="showAddForm" class="p-6 bg-gray-50 border-b">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Adicionar Novo Usuário</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input v-model="newUser.name" type="text" placeholder="Digite o nome"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="newUser.email" type="email" placeholder="Digite o email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Papeis</label>
            <div class="relative">
              <div @click="toggleRolesDropdown"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white min-h-[40px] flex flex-wrap gap-1 items-center">
                <span v-for="role in newUser.roles" :key="role.id"
                  class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {{ role.name }}
                  <button @click.stop="removeRoleFrom(role)" class="hover:bg-blue-200 rounded-full p-0.5">
                    <X data-lucide="x" class="w-3 h-3"></X>
                  </button>
                </span>
                <span v-if="newUser.roles.length === 0" class="text-gray-500">Selecione os papéis...</span>
              </div>
              <div v-if="showRolesDropdown"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div class="p-2">
                  <input v-model="roleSearch" @input="filterRoles" type="text" placeholder="Pesquisar papéis..."
                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
                <div class="max-h-40 overflow-y-auto">
                  <div v-for="role in avaiableRoles" :key="role.id" @click="addRole(role)" :class="[
                    'px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm',
                    newUser.roles.includes(role) ? 'bg-blue-50 text-blue-700' : ''
                  ]">
                    <div class="flex items-center justify-between">
                      <span>{{ role.name }}</span>
                      <X v-if="newUser.roles.includes(role)" data-lucide="check" class="w-4 h-4 text-blue-600"></X>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input v-model="newUser.password" type="password" placeholder="Digite sua senha" autocomplete="false"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Repetir senha</label>
            <input v-model="newUser.checkPassword" type="password" placeholder="Repetir senha"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="flex items-end gap-2">
            <button @click="handleAddUser"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2">
              <Save data-lucide="save" class="w-4 h-4"></Save>
              Save
            </button>
            <button @click="handleCancelAdd"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2">
              <X data-lucide="x" class="w-4 h-4"></X>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papel</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.id }}</td>

                <!-- Edit Mode -->
                <template v-if="editingUser && editingUser.id === user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input v-model="editingUser.name" type="text"
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input v-model="editingUser.email" type="email"
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Papeis</label>
                      <div class="relative">
                        <div @click="toggleRolesDropdownEdit"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white min-h-[40px] flex flex-wrap gap-1 items-center">
                          <span v-for="role in user.roles" :key="role.id"
                            class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {{ role.name }}
                            <button @click.stop="removeRoleFrom(role)" class="hover:bg-blue-200 rounded-full p-0.5">
                              <X data-lucide="x" class="w-3 h-3"></X>
                            </button>
                          </span>
                          <span v-if="user.roles != undefined && user.roles.length === 0" class="text-gray-500">Selecione os papéis...</span>
                        </div>
                        <div v-if="showRolesDropdownEdit"
                          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                          <div class="p-2">
                            <input v-model="roleSearch" @input="filterRoles" type="text"
                              placeholder="Pesquisar papéis..."
                              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                          </div>
                          <div class="max-h-40 overflow-y-auto">
                            <div v-for="role in avaiableRoles" :key="role.id" @click="addRole(role)" :class="[
                              'px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm',
                              user.roles.includes(role) ? 'bg-blue-50 text-blue-700' : ''
                            ]">
                              <div class="flex items-center justify-between">
                                <span>{{ role.name }}</span>
                                <X v-if="user.roles.includes(role)" data-lucide="check" class="w-4 h-4 text-blue-600">
                                </X>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex gap-2">
                      <button @click="handleSaveEdit"
                        class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200 flex items-center gap-1">

                        <Save class="w-3 h-3"></Save>
                        Salvar
                      </button>
                      <button @click="handleCancelEdit"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200 flex items-center gap-1">
                        <X class="w-3 h-3"></X>
                        Cancelar
                      </button>
                    </div>
                  </td>
                </template>

                <!-- View Mode -->
                <template v-else>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-for="role in user.roles" :key="role" :class="getRoleBadgeClass(role.name)"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                      {{ role.name }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex gap-2">
                      <button @click="handleEdit(user)"
                        class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200 flex items-center gap-1">
                        <Pencil class="w-3 h-3"></Pencil>
                        Editar
                      </button>
                      <button @click="handleDelete(user.id)"
                        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200 flex items-center gap-1">
                        <Trash2 class="w-3 h-3"></Trash2>
                        Excuir
                      </button>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="users.length === 0" class="text-center py-12">
          <div class="text-gray-500">
            <i data-lucide="users" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>
            <p class="text-lg">Usuários não encontrados</p>
            <p class="text-sm">Clique no botão "Adicionar Usuário" para começar</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>



</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onUpdated } from 'vue'
import {
  User,
  Trash2,
  Pencil,
  Save,
  X,
  Plus
} from 'lucide-vue-next'
import Alert from '../../components/Alert.vue'

import { useUsers } from '../../composables/useUsers'
import { useRoles } from '../../composables/useRoles'

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  checkPassword?: string;
  roles: Roles[];
}

interface Roles {
  id: number;
  name: string;
}

const { fetchUsers, removeUser, updateUser, createUser } = useUsers()
const { fetchRoles } = useRoles()
const showAlert = ref(false);
const deleteUserId = ref<number | null>(null);

const editingUser = ref<User | null>(null);
const showAddForm = ref(false);
const newUser = reactive<User>({
  name: '', email: '', roles: [],
  id: 0
});




const avaiableRoles = ref<{ id: number; name: string }[]>([]);
const showRolesDropdown = ref(false);
const showRolesDropdownEdit = ref(false);
const roleSearch = ref('');

const filterRoles = () => {
  const search = roleSearch.value.toLowerCase();
  fetchRoles().then((roles: { id: number; name: string }[]) => {
    avaiableRoles.value = roles.filter(role =>
      role.name.toLowerCase().includes(search)
    );
  });
};

const toggleRolesDropdown = async () => {
  const response = await fetchRoles();

  response.map((role: { name: string; id: number }) => {
    if (!avaiableRoles.value.find(r => r.id === role.id)) {
      avaiableRoles.value.push(role.name ? { id: role.id, name: role.name } : { id: role.id, name: 'Unknown Role' });
    }
  })
  showRolesDropdown.value = !showRolesDropdown.value;

}

const toggleRolesDropdownEdit = async () => {
  const response = await fetchRoles();

  response.map((role: { name: string; id: number }) => {
    if (!avaiableRoles.value.find(r => r.id === role.id)) {
      avaiableRoles.value.push(role.name ? { id: role.id, name: role.name } : { id: role.id, name: 'Unknown Role' });
    }
  })
  showRolesDropdownEdit.value = !showRolesDropdownEdit.value;

}


const addRole = (role: { id: number; name: string }) => {

  if (Array.isArray(newUser.roles)) {
    if (!newUser.roles.includes(role)) {
      newUser.roles.push(role);
      return;
    }
    if (editingUser.value && !editingUser.value.roles.includes(role)) {
      editingUser.value.roles.push(role);
      return;
    }
  } else {
    if (editingUser.value) {
      editingUser.value.roles = [role];
      return;
    }
    newUser.roles = [role];
  }
};


const removeRoleFrom = (role: { id: number; name: string }) => {


  const user = editingUser.value !== null && editingUser.value !== undefined ? editingUser.value : newUser;

  const index = user.roles.findIndex(r => r.name === role.name);
  console.log(index);
  if (index > -1) {
    user.roles.splice(index, 1);
  }
};



const users = ref<User[]>([]);
const loadUsers = async () => {
  const response = await fetchUsers()

  users.value = response || [];
}
onMounted(() => {
  loadUsers();
});


// Methods
const handleEdit = (user: User | null) => {

  if (user) {
    editingUser.value = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles || [],
    };
    
  } else {
    editingUser.value = null;
  }
};

const handleSaveEdit = async () => {
  if (!editingUser.value || !editingUser) return;
  if (editingUser.value) {

    await updateUser(editingUser.value.id, {
      name: editingUser.value.name,
      email: editingUser.value.email,
      roles: editingUser.value.roles
    });

    const index = users.value.findIndex(user => user.id === editingUser.value!.id);
    if (index !== -1) {
      users.value[index] = { ...(editingUser.value) };
    }
    editingUser.value = null;
  }
};

const handleCancelEdit = () => {
  editingUser.value = null;
};

const handleDelete = (userId: number) => {
  showAlert.value = true;
  deleteUserId.value = userId;
  
};


const deleteUser = async () => {
  try {
    if (deleteUserId.value === null) return;
    await removeUser(deleteUserId.value);
    showAlert.value = false;
    loadUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


const handleAddUser = async () => {
  if (newUser.name && newUser.email) {

    await createUser(newUser);

    const id = Math.max(...users.value.map(u => u.id), 0) + 1;
    users.value.push({ ...newUser, id });
    Object.assign(newUser, { name: '', email: '', role: 'User' });
    showAddForm.value = false;
  }
};

const handleCancelAdd = () => {
  Object.assign(newUser, { name: '', email: '', role: 'User' });
  showAddForm.value = false;
};

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800';
    case 'vendedor':
      return 'bg-blue-100 text-blue-800';
    case 'cliente':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};




</script>

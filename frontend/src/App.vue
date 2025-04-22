<template>
  <v-card
    variant="flat"
    class="mb-2"
    min-width="600"
    min-height="305"
    background-color="grey-lighten-1">
    <v-card-title>TODO LIST</v-card-title>
    <v-list>
      <v-list-item v-for="(todo, index) in paginatedTodos" :key="index">
        <v-row no-gutters>
          <v-col>
            <v-list-item-title class="text-start text-wrap">
              {{ todo.text }}
            </v-list-item-title>
          </v-col>
          <v-col cols="2">
            <v-btn
              variant="outlined"
              color="success"
              density="compact"
              @click="deleteTodo(todo)">
              Done
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-card>

  <!-- PAGE NAVIGATION -->
  <v-row class="mb-2" no-gutters>
    <v-btn variant="text" @click="currentPage--" :disabled="currentPage === 1">
      Prev
    </v-btn>
    <v-spacer></v-spacer>

    <v-btn
      :variant="page === currentPage ? 'outlined' : 'text'"
      v-for="(page, index) in visiblePages"
      :key="index"
      :class="{ active: page === currentPage }"
      @click="typeof page === 'number' && (currentPage = page)"
      :disabled="page === '...'">
      {{ page }}
    </v-btn>

    <v-spacer></v-spacer>
    <v-btn
      variant="text"
      @click="currentPage++"
      :disabled="currentPage === totalPages">
      Next
    </v-btn>
  </v-row>

  <!-- ADD TODO BUTTON -->
  <v-btn variant="outlined" @click="showDialog">Add Todo</v-btn>

  <TodoDialog ref="dialogRef" @todo-added="getTodos" />
  <VToast ref="toastRef" />
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import TodoDialog from './components/TodoDialog.vue';
  import VToast from './components/VToast.vue';
  import axios from 'axios';

  const dialogRef = ref(null);
  const toastRef = ref(null);
  const todoList = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = 5;

  const paginatedTodos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return todoList.value.slice(start, end);
  });

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(todoList.value.length / itemsPerPage))
  );

  const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const delta = 1; // how many pages to show around current
    const range = []; // shown pages
    const rangeWithDots = []; // shown pages, including dots
    let prevPage;

    // generate pages to show (e.g. 1, 5,6,7, 10)
    for (let i = 1; i <= total; i++) {
      if (
        i === 1 || // first page
        i === total || // last page
        (i >= current - delta && i <= current + delta) // around current page
      ) {
        range.push(i);
      }
    }

    // add dots and the pages to the final array
    // (e.g. 1, ..., 5,6,7, ..., 10)
    for (let i of range) {
      if (prevPage) {
        if (i - prevPage === 2) {
          rangeWithDots.push(prevPage + 1);
        } else if (i - prevPage > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      prevPage = i;
    }

    return rangeWithDots;
  });

  onMounted(async () => {
    getTodos();
  });

  function showDialog() {
    if (dialogRef.value) {
      dialogRef.value.open();
    }
  }

  async function getTodos() {
    axios
      .get('/todos')
      .then(function (response) {
        todoList.value = response.data;
      })
      .catch(function (error) {
        toastRef.value.show({
          message: 'Error retrieving ToDos: ' + error,
          color: 'error',
          icon: 'mdi-alert',
        });
      });
  }

  async function deleteTodo(todo) {
    axios
      .delete('/todos/' + todo._id)
      .then(function (response) {
        console.log(response.data);
        // Remove the completed todo from the list
        todoList.value = todoList.value.filter(
          (checkTodo) => checkTodo._id !== todo._id
        );

        // Update the current page if the last todo on the page was removed
        // and the current page is now empty
        const totalPages = Math.ceil(todoList.value.length / itemsPerPage);
        if (totalPages < currentPage.value) {
          currentPage.value = Math.max(1, totalPages);
        }

        toastRef.value.show({
          message: 'Successfully completed: ' + response.data.text,
        });
      })
      .catch(function (error) {
        console.log(error);
        toastRef.value.show({
          message: 'Error removing completed ToDo: ' + error,
          color: 'error',
          icon: 'mdi-alert',
        });
      });
  }
</script>

<style scoped></style>

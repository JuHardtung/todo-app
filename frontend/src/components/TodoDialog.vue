<!--
 * Created Date: 22.04.2025 10:28:59
 * Author: Julian Hardtung
 * 
 * Last Modified: 22.04.2025 11:04:08
 * Modified By: Julian Hardtung
 * 
 * Description: Vue component for creating a new todo item
 -->

<template>
  <v-dialog v-model="isOpen">
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" sm="8" md="4" lm="3">
        <v-card title="Create Todo">
          <v-text-field
            maxlength="120"
            counter
            label="Describe what you want to do"
            v-model="todoText" />
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="success" @click="addTodo">
              Add Todo
            </v-btn>
            <v-btn variant="outlined" color="error" @click="close">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
  <VToast ref="toastRef" />
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import VToast from './VToast.vue';

  const isOpen = ref(false);
  const todoText = ref('');
  const toastRef = ref(null);

  const emit = defineEmits(['todo-added']);

  function open() {
    isOpen.value = true;
  }

  function close() {
    todoText.value = '';
    isOpen.value = false;
  }

  async function addTodo() {
    axios
      .post(
        '/todos',
        { text: todoText.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        console.log(response.data);
        emit('todo-added');
        close();
      })
      .catch(function (error) {
        console.log(error);
        toastRef.value.show({
          message: 'Error adding new ToDo: ' + error,
          color: 'error',
          icon: 'mdi-alert',
        });
      });
  }

  defineExpose({ open, close });
</script>

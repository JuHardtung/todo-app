<!--
 * Created Date: 22.04.2025 10:35:11
 * Author: Julian Hardtung
 * 
 * Last Modified: 22.04.2025 12:40:30
 * Modified By: Julian Hardtung
 * 
 * Description: Vue component for displaying a snackbar message
 -->

<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    location="bottom"
    class="d-flex justify-center">
    <v-icon :icon="icon" start></v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script setup>
  import { ref } from 'vue';
  const showSnackbar = ref(false);
  const message = ref('');
  const color = ref('success');
  const icon = ref('$mdi-check');
  const timer = ref(3000);

  const show = (data) => {
    message.value = data.message || 'missing "message".';
    color.value = data.color || 'success';
    timer.value = data.timer || 3000;
    icon.value = data.icon || 'mdi-check';
    showSnackbar.value = true;
  };

  defineExpose({ show });
</script>

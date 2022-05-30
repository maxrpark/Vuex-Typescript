<template>
  <div class="alert-container">
    <div
      v-if="store.state.showAlert"
      :class="store.state.alertMessege.type"
      class="alert-box"
    >
      <p>{{ store.state.alertMessege.messege }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();
</script>

<style lang="scss" scoped></style>

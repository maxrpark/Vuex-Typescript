<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <input
      :value="store.state.ItemValue"
      @input="updateMessage"
      type="text"
      class="input-control"
      placeholder="Type something..."
      maxlength="25"
    />
  </form>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { actionType } from '@/ts/store/actionType';
const store = useStore();

const updateMessage = (e: any) =>
  store.dispatch(actionType.UPDATE_MESSAGE, e.target.value);

const handleSubmit = () => {
  if (store.state.ItemValue && store.state.ItemValue.trim() !== '') {
    store.dispatch(actionType.FORM_SUBMIT);
  }
};
</script>

<style lang="scss" scoped></style>

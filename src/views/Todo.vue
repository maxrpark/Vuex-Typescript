<template>
  <div class="section-center section">
    <h2 className="title">Vue assistant</h2>
    <Alert />
    <section class="main-container">
      <h2>Task List</h2>
      <Form ref="form" />
      <div class="todo-list">
        <ul class="todo-container">
          <li
            v-for="item in store.state.todoList"
            :key="item.id"
            :class="{ isComplete: item.isComplete }"
            class="item"
          >
            <TodoItem :item="item" />
          </li>
        </ul>
      </div>

      <button
        v-if="store.state.todoList.length"
        class="remove-items"
        @click="removeAll"
      >
        remove all
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import TodoItem from '../components/TodoItem.vue';
import Alert from '../components/Alert.vue';
import Form from '../components/Form.vue';
import { actionType } from '../ts/store/actionType';
import { useStore } from 'vuex';
const store = useStore();
const removeAll = () => store.dispatch(actionType.REMOVE_ALL);
</script>

<style></style>

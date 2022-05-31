<template>
  <div class="section">
    <h2 class="title">{{ title }}</h2>
    <h3 class="title">Same App with different frameworks or languages</h3>
    <div class="container">
      <div
        v-for="project in store.state.projects"
        class="card"
        :key="project.id"
      >
        <ProjectsCard :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ProjectsCard from '../components/ProjectsCard.vue';
import { actionType } from '../ts/store/actionType';
import { useStore } from 'vuex';
const store = useStore();

let title = computed(() => {
  return store.state.projects.length > 0 ? 'Assistant' : 'Loading...';
});

onMounted(() => {
  if (store.state.projects.length === 0) {
    store.dispatch(actionType.GET_PROJECTS);
  }
});
</script>

<template>
  <div class="section">
    <h2 class="title">{{ title }}</h2>
    <h3 class="title">Same App with different frameworks or languages</h3>
    <div class="container">
      <div v-for="project in projects" class="card" :key="project.id">
        <ProjectsCard :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Project } from '../ts/interfaces';
import axios from 'axios';
import ProjectsCard from '../components/ProjectsCard.vue';

let url = 'https://assitant-app.netlify.app/api/projects-api';
let projects = ref<Project[]>([]);

let title = computed(() => {
  return projects.value.length > 0 ? 'Assistant' : 'Loading...';
});

onMounted(() => {
  getData();
});
const getData = async () => {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    projects.value = data;
  } catch (error) {
    console.log(error);
  }
};
</script>

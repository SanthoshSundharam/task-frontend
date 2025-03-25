<!-- src/components/tasks/CompletedTasks.vue -->
<template>
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white">
        <h5 class="mb-0">Completed Tasks</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li v-for="task in completedTasks" :key="task.id" class="list-group-item">
          <span class="text-decoration-line-through">{{ task.title || 'No Title' }}</span>
        </li>
        <li v-if="completedTasks.length === 0" class="list-group-item text-center text-muted">
          No completed tasks.
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CompletedTasks',
    computed: {
      completedTasks() {
        return this.$store.getters.getCompletedTasks || []
      }
    }
  }
  </script>
  
  <style scoped>
  .text-decoration-line-through {
    text-decoration: line-through;
  }
  </style>
  
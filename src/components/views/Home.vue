<!-- src/views/Home.vue -->
<template>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6 mb-4">
          <add-task></add-task>
          <task-list></task-list>
        </div>
        <div class="col-md-6 mb-4">
          <completed-tasks></completed-tasks>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AddTask from '../tasks/AddTask.vue'
  import TaskList from '../tasks/TaskList.vue'
  import CompletedTasks from '../tasks/CompletedTasks.vue'
  
  export default {
    name: 'Home',
    components: {
      AddTask,
      TaskList,
      CompletedTasks
    },
    created() {
      this.$store.dispatch('fetchTasks')
      this.$store.dispatch('fetchDeletedTasks')
    }
  }
  </script>
  

<style scoped>
    


</style>
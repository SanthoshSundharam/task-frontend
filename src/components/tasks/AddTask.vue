<!-- src/components/tasks/AddTask.vue -->
<template>
    <div class="card mb-4 shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Add New Task</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="addTask">
          <div class="form-group">
            <label for="taskTitle">Title</label>
            <input
              type="text"
              id="taskTitle"
              v-model="title"
              class="form-control"
              placeholder="Enter task title"
              required
            />
          </div>
          <div class="form-group mt-3">
            <label for="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              v-model="description"
              class="form-control"
              rows="3"
              placeholder="Enter task description"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success mt-3 w-100">
            Add Task
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddTask",
    data() {
      return {
        title: "",
        description: ""
      }
    },
    methods: {
      addTask() {
        const newTask = {
          title: this.title,
          description: this.description
        }
        this.$store.dispatch("addTask", newTask)
          .then(() => {
            this.title = ""
            this.description = ""
          })
          .catch(err => {
            console.error("Error adding task:", err)
          })
      }
    }
  }
  </script>
  
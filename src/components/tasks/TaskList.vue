<!-- src/components/tasks/TaskList.vue -->
<template>
  <div class="card shadow-sm">
    <div class="card-header bg-info text-white">
      <h5 class="mb-0">Your Tasks</h5>
    </div>
    <div class="m-2">
      <div
        v-for="task in tasks"
        :key="task.id"
        style="margin: 10px"
        class="card m-2"
      >
        <div class="m-3">
          <div v-if="editingTask && editingTask.id === task.id">
            <div class="form-group">
              <input
                type="text"
                v-model="editingTask.title"
                class="form-control"
                placeholder="Edit Title"
              />
            </div>

              <div class="form-group mt-2">
                <textarea
                  v-model="editingTask.description"
                  class="form-control"
                  rows="2"
                  placeholder="Edit Description"
                ></textarea>
              </div>
              <div class="mt-2">
                <button
                  class="btn btn-md btn-primary"
                  @click="saveEdit(task.id)"
                >
                  Save
                </button>
                <button class="btn btn-md btn-secondary" @click="cancelEdit">
                  Cancel
                </button>
              </div>
          </div>
          <div v-else @click="toggleDetails(task.id)" style="cursor: pointer">
            <span
              :class="{ 'text-decoration-line-through': task.completed }"
              class="font-weight-bold"
            >
              {{ task.title || "No Title" }}
            </span>
          </div>
        </div>

        <div
          v-if="
            expandedTaskIds.includes(task.id) &&
            (!editingTask || editingTask.id !== task.id)
          "
          style="margin-left: 15px; margin-bottom: 10px;"
        >
          <p>{{ task.description || "No Description" }}</p>
          <div class="mt-2">
            <button class="btn btn-md btn-success" @click="markCompleted(task)">
              Completed
            </button>
            <button class="btn btn-md btn-primary" @click="startEdit(task)">
              Edit
            </button>
            <button
              class="btn btn-md btn-secondary"
              @click="collapseTask(task.id)"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  data() {
    return {
      expandedTaskIds: [],
      editingTask: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasks || [];
    },
  },
  methods: {
    toggleDetails(taskId) {
      if (this.expandedTaskIds.includes(taskId)) {
        this.expandedTaskIds = this.expandedTaskIds.filter(
          (id) => id !== taskId
        );
      } else {
        this.expandedTaskIds.push(taskId);
      }
    },
    collapseTask(taskId) {
      this.expandedTaskIds = this.expandedTaskIds.filter((id) => id !== taskId);
    },
    markCompleted(task) {
      this.$store
        .dispatch("deleteTask", task.id)
        .catch((err) => console.error("Error marking completed:", err));
      this.collapseTask(task.id);
    },
    startEdit(task) {
      this.editingTask = {
        id: task.id,
        title: task.title,
        description: task.description,
      };
    },
    cancelEdit() {
      this.editingTask = null;
    },
    saveEdit(taskId) {
      const updatedTask = {
        id: this.editingTask.id,
        title: this.editingTask.title,
        description: this.editingTask.description,
      };
      this.$store
        .dispatch("updateTask", updatedTask)
        .then(() => {
          this.editingTask = null;
        })
        .catch((err) => console.error("Error updating task:", err));
    },
  },
  created() {
    this.$store.dispatch("fetchTasks");
  },
};
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}

button {
  margin-right: 10px;
}
</style>

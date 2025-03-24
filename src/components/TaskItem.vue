<template>
  <div class="tableouter">
    <div class="table-container">
      <table
        :style="{ border: '1px solid black', width: '75%', margin: '1em' }"
      >
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(task, index) in getdata()" :key="index">
            <td :style="{ padding: '8px', textAlign: 'center' }">
              {{ index + 1 }}
            </td>

            <td>
              <span v-if="isEditing === task.id">
                <input type="text" v-model="update.title" />
              </span>
              <span v-else>{{ task.title }}</span>
            </td>

            <td>
              <span v-if="isEditing === task.id">
                <input type="text" v-model="update.description" />
              </span>
              <span v-else>{{ task.description }}</span>
            </td>

            <td>
              <span v-if="isEditing === task.id">
                <input
                  type="checkbox"
                  v-model="update.status"
                  :style="{ transform: 'scale(1.9)' }"
                />
              </span>
              <span v-else>
                <input
                  type="checkbox"
                  :style="{
                    transform: 'scale(1.9)',
                    border: '1px solid black',
                  }"
                  :checked="task.status === 'Completed'"
                  disabled
                />
              </span>
            </td>
            <td>
              <button
                class="actions"
                v-if="isEditing === task.id"
                @click="save()"
              >
                Save
              </button>
              <button class="actions" v-else @click="edit(task)">Edit</button>
              <button class="action" @click="deleteTask(task.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
        <h3 v-show="visible">rthr</h3>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",

  data() {
    return {
      isEditing: "",
      update: {
        title: "",
        description: "",
        status: false,
      },
      tasks: [],
      visible: false,
    };
  },

  methods: {
    edit(task) {
      this.isEditing = task.id;
      this.update = {
        ...task,
        status: task.status === "Completed",
      };
    },

    save() {
      this.update.status = this.update.status ? "Completed" : "Pending";
      this.$store.dispatch("update", this.update);
      this.isEditing = "";
      this.resetForm();
    },
    getdata() {
      //const a = this.$store.getters.gettask;
     // return a;
    },

    deleteTask(id) {
      this.$store.dispatch("delete", id);
    },

    resetForm() {
      this.update = { title: "", description: "", status: false };
    },
  },
  created() {
    console.log("first");
    const id = localStorage.getItem("user");
    console.log(this.$store);    
    this.$store.dispatch('get', id);
  },
};
</script>

<style>
.table-container {
  display: flex;
  justify-content: center;
  margin-top: 4em;
}
table {
  background-color: rgba(252, 252, 252, 0.986);
  border-spacing: 20px;
  table-layout: fixed;
  border-radius: 10px;
}
table th {
  font-size: larger;
}
.action {
  padding: 0.6em;
  margin-left: 5px;
  background-color: rgb(221, 38, 38);
  border-radius: 5px;
}
.action:hover {
  background-color: red;
}
.actions {
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: rgba(20, 167, 76, 0.973);
  border-radius: 5px;
}
.actions:hover {
  background-color: green;
}
.tableouter {
  height: auto;
  width: 99%;
}

table td {
  font-weight: 200;
  text-align: center;
  font-size: larger;
}
</style>

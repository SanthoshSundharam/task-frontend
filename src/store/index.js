// src/store/index.js
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const normalizeTask = (task, fallbackData = {}) => ({
  ...task,
  id: task.Id || task.id || fallbackData.id,
  title: task.title || task.task_title || fallbackData.title || "No Title",
  description:
    task.description ||
    task.task_description ||
    fallbackData.description ||
    "No Description",
  completed: task.completed || false,
});

const handleError = (error, context) => {
  console.error(`${context} error:`, error);
  throw error;
};

const handleTaskResponse = (response) => {
  const data = response.data;
  if (data.tasks && Array.isArray(data.tasks)) {
    return data.tasks
      .map((task) => normalizeTask(task))
      .filter((task) => !task.deleted_at && !task.completed);
  }
  console.warn("Unexpected task response format:", data);
  return [];
};

const handleDeletedResponse = (response) => {
  const data = response.data;
  if (data.deleted_tasks && Array.isArray(data.deleted_tasks)) {
    return data.deleted_tasks.map((task) => normalizeTask(task));
  }
  console.warn("Unexpected deleted tasks format:", data);
  return [];
};

export default new Vuex.Store({
  state: {
    user: {
      email: localStorage.getItem("email") || "",
      id: localStorage.getItem("userId") || "",
    },
    token: localStorage.getItem("token") || "",
    tasks: [],
    completedTasks: [],
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(normalizeTask(task));
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(
        (task) => task.id === (updatedTask.Id || updatedTask.id)
      );
      if (index !== -1) {
        Vue.set(
          state.tasks,
          index,
          normalizeTask({
            ...state.tasks[index],
            ...updatedTask,
          })
        );
      }
    },
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    SET_COMPLETED_TASKS(state, tasks) {
      state.completedTasks = tasks;
    },
    ADD_COMPLETED_TASK(state, task) {
      state.completedTasks.push(normalizeTask(task));
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        return await axios.post("/register", userData);
      } catch (error) {
        return handleError(error, "Registration");
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post("/login", credentials);
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("userId", user);

        commit("SET_TOKEN", token);
        commit("SET_USER", { email: credentials.email, id: user });
        return response;
      } catch (error) {
        return handleError(error, "Login");
      }
    },
    async logout({ commit }) {
      try {
        await axios.post("/logout");
      } catch (error) {
        if (error.response?.status === 401) {
          console.warn("Logout: Unauthorized error, clearing state anyway.");
        } else {
          console.error("Logout error:", error);
        }
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        commit("SET_TOKEN", "");
        commit("SET_USER", { email: "", id: "" });
      }
    },
    async fetchTasks({ commit, getters }) {
      try {
        const userId = getters.getUserId;
        if (!userId) throw new Error("User ID not found.");

        const res = await axios.get(`/getUserTasks/${userId}`);
        console.log("Full API response for fetchTasks:", res.data);

        commit("SET_TASKS", handleTaskResponse(res));
      } catch (error) {
        return handleError(error, "Fetching tasks");
      }
    },
    async fetchDeletedTasks({ commit, getters }) {
      try {
        const userId = getters.getUserId;
        if (!userId) throw new Error("User ID not found.");

        const res = await axios.get(`/getDeletedTasks/${userId}`);
        console.log("Full API response for fetchDeletedTasks:", res.data);

        commit("SET_COMPLETED_TASKS", handleDeletedResponse(res));
      } catch (error) {
        return handleError(error, "Fetching deleted tasks");
      }
    },
    async addTask({ commit, getters }, taskData) {
      try {
        const userId = getters.getUserId;
        const response = await axios.post("/create", {
          ...taskData,
          user_id: userId,
        });
        commit("ADD_TASK", {
          ...response.data,
          ...taskData,
        });

        return response;
      } catch (error) {
        return handleError(error, "Adding task");
      }
    },
    async updateTask({ commit }, taskData) {
      try {
        const response = await axios.put(`/update/${taskData.id}`, taskData);
        commit("UPDATE_TASK", {
          ...response.data,
          ...taskData, // Include the original data as fallback
        });
        return response;
      } catch (error) {
        return handleError(error, "Updating task");
      }
    },
    async deleteTask({ commit, state }, taskId) {
      try {
        const originalTask = state.tasks.find((task) => task.id === taskId);
        const response = await axios.delete(`/delete/${taskId}`);

        commit("REMOVE_TASK", taskId);
        commit("ADD_COMPLETED_TASK", originalTask || { title: "No Title" });

        return response;
      } catch (error) {
        return handleError(error, "Deleting task");
      }
    },
  },
  getters: {
    getTasks: (state) => state.tasks,
    getCompletedTasks: (state) => state.completedTasks,
    isLoggedIn: (state) => !!state.token,
    getUserId: (state) => state.user.id || localStorage.getItem("userId"),
  },
});

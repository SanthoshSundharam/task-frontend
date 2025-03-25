<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <router-link class="navbar-brand" to="/home">Task Manager</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ml-auto">
          <!-- Show avatar and Logout if user is logged in -->
          <li v-if="isLoggedIn" class="nav-item d-flex align-items-center">
            <div
              class="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mr-3"
              style="width: 40px; height: 40px;"
            >
              {{ avatar }}
            </div>
            <button class="btn btn-outline-danger btn-sm" @click="handleLogout">
              Logout
            </button>
          </li>
          <!-- Otherwise, show Login -->
          <li v-else class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    // Directly reference Vuex state so updates are reactive
    isLoggedIn() {
      return this.$store.state.token !== '';
    },
    avatar() {
      const email = this.$store.state.user.email;
      return email ? email.charAt(0).toUpperCase() : '';
    }
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.avatar {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>

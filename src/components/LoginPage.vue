<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" class="submit-button" :disabled="isLoading">
        <span v-if="isLoading">Logging in...</span>
        <span v-else>Login</span>
      </button>

      <p>Don't have an account ? <router-link to="/register"> Register </router-link></p>

      
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      isLoading: false, 
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = ""; 
      this.isLoading = true; 

      if (!this.email || !this.password) {
        this.errorMessage = "Please fill in all fields.";
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          console.log(response)
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user);
          
          const firstLetter = this.email.charAt(0).toUpperCase();
          localStorage.setItem("userInitial", firstLetter);
          this.$router.push("/home");
        } else {
          this.errorMessage = "Invalid login credentials.";
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage =
            error.response.data.message || "Login failed. Please try again.";
        } else if (error.request) {
          this.errorMessage = "Network error. Please check your connection.";
        } else {
          this.errorMessage = "An unexpected error occurred.";
        }
      } finally {
        this.isLoading = false; 
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover:not(:disabled) {
  background-color: #369c6e; /* Change color on hover only if not disabled */
}

.submit-button[disabled] {
  background-color: #ccc; /* Disabled button style */
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>

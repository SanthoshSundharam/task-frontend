<template>
    <div class="reg-container">
      <h2>Registration</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Enter your name"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="form.password_confirmation"
            placeholder="Confirm your password"
            required
          />
        </div>
  
        <button type="submit" class="submit-button">Register</button>
      </form>
  
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        },
        errorMessage: "", 
      };
    },
    methods: {
      async handleSubmit() {
        if (!this.form.name || !this.form.email || !this.form.password || !this.form.password_confirmation) {
          this.errorMessage = "Please fill in all fields.";
          return;
        }
        if (this.form.password !== this.form.password_confirmation) {
          this.errorMessage = "Passwords do not match.";
          return;
        }
  
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/register", this.form);
          console.log("Registration successful:", response.data);
          this.$router.push({ name: "login" });
          this.form = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            
          };
          this.errorMessage = "";
        } catch (error) {
          console.error("Registration failed:", error);
          if (error.response) {
            this.errorMessage = error.response.data.message || "Registration failed. Please try again.";
          } else if (error.request) {
            this.errorMessage = "Network error. Please check your connection.";
          } else {
            this.errorMessage = "An unexpected error occurred.";
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .reg-container {
    width: 400px;
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
  
  .submit-button:hover {
    background-color: #369c6e;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>
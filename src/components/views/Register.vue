<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm" style="width:25rem;  background-color: #f2f6ff;">
            <div class="mt-2 text-center">
              <h4 class="mb-0">Register</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleRegister">

                <div class="form-group">
                  <!-- <label for="registerName">Name</label> -->
                  <input
                    type="text"
                    id="registerName"
                    v-model="name"
                    class="form-control"
                    placeholder="Enter your name"
                    @blur="validateName"
                  />
                  <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
                </div>

                <div class="form-group mt-3">
                  <!-- <label for="registerEmail">Email</label> -->
                  <input
                    type="email"
                    id="registerEmail"
                    v-model="email"
                    class="form-control"
                    placeholder="Enter your email"
                    @blur="validateEmail"
                  />
                  <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                </div>
  

                <div class="form-group mt-3">
                  <!-- <label for="registerPassword">Password</label> -->
                  <input
                    type="password"
                    id="registerPassword"
                    v-model="password"
                    class="form-control"
                    placeholder="Enter your password"
                    @blur="validatePassword"
                  />
                  <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                </div>
  

                <div class="form-group mt-3">
                  <!-- <label for="registerPasswordConfirmation">Confirm Password</label> -->
                  <input
                    type="password"
                    id="registerPasswordConfirmation"
                    v-model="password_confirmation"
                    class="form-control"
                    placeholder="Confirm your password"
                    @blur="validatePasswordConfirmation"
                  />
                  <div v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation }}</div>
                </div>

                <button type="submit" class="btn  mt-4 w-100" style="background-color: #202d48; color:white;">Register</button>
                <p class="mt-4 text-center">
                  Already have an account?   <router-link to="/login" style="color: #202d48; font-weight: bold;">  Login here</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Register",
    data() {
      return {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: {
          name: "",
          email: "",
          password: "",
          password_confirmation: ""
        }
      };
    },
    methods: {
      validateName() {
        this.errors.name = this.name.trim() ? "" : "Name is required.";
      },
      validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email.trim()) {
          this.errors.email = "Email is required.";
        } else if (!emailPattern.test(this.email)) {
          this.errors.email = "Please enter a valid email address.";
        } else {
          this.errors.email = "";
        }
      },
      validatePassword() {
        this.errors.password = this.password.length >= 6 ? "" : "Password must be at least 6 characters.";
      },
      validatePasswordConfirmation() {
        this.errors.password_confirmation = this.password === this.password_confirmation ? "" : "Passwords do not match.";
      },
      handleRegister() {
        this.validateName();
        this.validateEmail();
        this.validatePassword();
        this.validatePasswordConfirmation();

        if (Object.values(this.errors).some(error => error)) {
          return;
        }
  

        this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          console.error("Registration error:", err);
        });
      }
    }
  };
  </script>


<style>
input{
    margin-top:1.5rem;
}

button{
    background-color: #202d48;
}
</style>
  
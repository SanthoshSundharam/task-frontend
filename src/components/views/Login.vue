<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm" style="width: 25rem; height: 20.5rem;  background-color: #f2f6ff;">
            <div class="text-black text-center mt-2">
              <h4 class="mt-2">Welcome Back</h4>
            </div>
            <div class="card-body" >
              <form @submit.prevent="handleLogin" >
                <div class="form-group" style="">
                  <!-- <label for="loginEmail">Email</label> -->
                  <input
                    type="email"
                    id="loginEmail"
                    v-model="email"
                    class="form-control mt-3"
                    placeholder="Enter your email"
                    @blur="validateEmail"
                  />
                  <small v-if="emailError" class="text-danger">{{ emailError }}</small>
                </div>
                <div class="form-group mt-4">
                  <!-- <label for="loginPassword">Password</label> -->
                  <input
                    type="password"
                    id="loginPassword"
                    v-model="password"
                    class="form-control"
                    placeholder="Enter your password"
                    @blur="validatePassword"
                  />
                  <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
                </div>
                <button type="submit" class="btn  mt-4 w-100 text-center" style="background-color: #202d48; color:white;" >Login</button>
                <!-- <button type="submit" class="btn  mt-4 w-100 text-center" style="background-color: #202d48; color:white;" :disabled="!isFormValid">Login</button> -->

                <p class="mt-4 text-center ">
                  Don't have an account?  
                  <router-link to="/register" style="color: #202d48; font-weight: bold;">  Register here</router-link>
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
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        emailError: "",
        passwordError: ""
      };
    },
    computed: {
      isFormValid() {
        return this.email && this.password && !this.emailError && !this.passwordError;
      }
    },
    methods: {
      validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email) {
          this.emailError = "Email is required.";
        } else if (!emailPattern.test(this.email)) {
          this.emailError = "Please enter a valid email address.";
        } else {
          this.emailError = "";
        }
      },
      validatePassword() {
        if (!this.password) {
          this.passwordError = "Password is required.";
        } else if (this.password.length < 6) {
          this.passwordError = "Password must be at least 6 characters long.";
        } else {
          this.passwordError = "";
        }
      },
      handleLogin() {
        this.validateEmail();
        this.validatePassword();
        if (this.isFormValid) {
          this.$store.dispatch("login", { email: this.email, password: this.password })
            .then(() => {
              this.$router.push("/home");
            })
            .catch(err => {
              console.error("Login error:", err);
            });
        }
      }
    }
  };
  </script>



<style scoped>

.form-bg{
   
}

</style>
  
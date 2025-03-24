<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import LoginPage from "./components/LoginPage.vue";
import RegistrationPage from "./components/RegistrationPage.vue";
import Home from "./components/Home.vue";
import TaskList from "./components/TaskList.vue";


export default {
  components: {
    LoginPage,
    RegistrationPage,
    Home
  },
};
</script>

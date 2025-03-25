<!-- src/App.vue -->
<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/views/NavBar.vue"
export default {
  name: "App",
  components: {
    NavBar
  }
}
</script>

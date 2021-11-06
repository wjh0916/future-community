<template>
  <div id="app">
    <router-view name="Top" />
    <router-view />
    <BackTop></BackTop>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  components: {Footer}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}

.content {
  padding: 0 16%;

  .Breadcrumb {
    text-align: left;
    background: unset;
    margin: 10px 0;
  }
}
</style>
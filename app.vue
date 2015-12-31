<style>
.view {
  transition: all .5s ease;
}
.test-enter, .test-leave {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}
.v-link-active {
  color: red;
}
[v-cloak] {
  display: none;
}
</style>

<template>
  <div>
    <p v-show="authenticating" style="color:red">Authenticating...</p>
    <h1>App Header</h1>
    <top></top>
    <login></login>
  </div>
  
</template>

<script>
import login from './components/login.vue'
import top from './components/top.vue'
export default {
  data () {
    return {
      authenticating: false
    }
  },

  components:{login , top}
}
</script>

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
    <a v-link="{ path: '/inbox/message/123' }">首页</a>
    <a v-link="{ path: '/about' }">照片</a>
    <a v-link="{ path: '/user/1234/profile/what' }">音乐</a>
    <a v-link="{ path: '/forbidden' }">应用</a>
    <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      authenticating: false
    }
  }
}
</script>

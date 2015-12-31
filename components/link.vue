<style>
.topLink{
	
	position:absolute;
	left:0;
	width:100%;
	height:100px;
	top:0;
  margin-top:70px;
  
}
</style>

<template>
  <div class='topLink'>
      <a v-link="{ path: '/inbox/message/123' }">首页</a>
      <a v-link="{ path: '/about' }">照片</a>
      <a v-link="{ path: '/user' }">音乐</a>
      <a v-link="{ path: '/forbidden' }">应用</a>
    <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>
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
      <a v-link="{ path: '/image' }">照片</a>
      <a v-link="{ path: '/music' }">音乐</a>
      <a v-link="{ path: '/apk' }">应用</a>
    <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>
<style>
.top{
	background:green;
	position:absolute;
	left:0;
	width:100%;
	height:100px;
	top:0;
    box-shadow: 0px 3px 8px #888888;
}
</style>

<template>
  <div class='top'>
  	<link></link>
  </div>
</template>

<script>
import link from './link.vue'
export default {
  
  components:{link}
}
</script>
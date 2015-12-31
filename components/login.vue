<style>
.lg{
	background:#cccccc;
	position:absolute;
	left:0;
	width:100%;
	height:100%;
	top:0;

}
</style>

<template>
  <div v-show="login" class='lg'>
  
  </div>
</template>

<script>
export default {
  
  data () {
  	return {
  		login:false
  	}
  },

  logOut () {
    
  }
}
</script>
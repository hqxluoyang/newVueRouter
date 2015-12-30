<template>
  <div>
    <h3>{{msg}}</h3>
    <p>{{$route.params.userId}} {{$route.params.something}}</p>
  </div>
  <Hcomp></Hcomp>
</template>

<script>

import Hcomp from './Hcomp.vue'
	export default {
		data () {
			return {
				msg :"hello world"
			}
		} ,

		components:{Hcomp}
	}
</script>
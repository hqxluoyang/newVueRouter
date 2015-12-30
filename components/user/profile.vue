<template>
  <div>
    <h3>{{msg}}</h3>
    <p>{{$route.params.userId}} {{$route.params.something}}</p>
  </div>
  <Hcomp></Hcomp>
</template>

<script>
import $ from 'jquery'
import channel from '../../services/wschannel.js'
import Hcomp from './Hcomp.vue'
	export default {
		data () {

			console.log("jquery:" , channel)
			return {
				msg :"hello world"
			}
		} ,

		components:{Hcomp}
	}
</script>
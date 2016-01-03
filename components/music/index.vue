<style>
	.imageContainer {
		background:#e0e0e0;
		width:100%;
		height:300px;
		overflow-y:scroll;
		margin-top:18px;
	}
</style>

<template>
  <div class='imageContainer'>
   <p>music</p>
   <p>musiccccc</p>
   <p>dddddddd</p>
   
  </div>
</template>

<script>
//import tools from '../../services/tools'
import Config from '../../services/config'
export default {
	init () { 
		
	},

	ready () {

		
		const bus = Config.Runtime.eventBus;
		console.log("bus:" , Config)
		setTimeout(function(){
		//	bus.emit("startImage")
		} , 1000)
		
	}
}

</script>
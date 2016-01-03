<style>
	.imageContainer {
		background:#e0e0e0;
		width:100%;
		overflow-y:scroll;
		margin-top:18px;
	}
</style>

<template>
  <div class='imageContainer' v-bind:style="{height:h + 'px'}">
  <p v-for="obj in item">
    <span>{{obj.message}}</span>
  </p>
  <p>{{time}}</p>
   <test></test>
  </div>
</template>

<script>

import tools from  '../../services/tools.js'
import initBus from '../../services/image/initBus.js'
import test from './test.vue'

export default {

   data () {
      console.log("this" , this)
      return {
         h: 450,
         time:10,
         msg:"left",
         item:[{message:'taodhuilang'},{message:'taodhuilang'},{message:'taodhuilang'},{message:'taodhuilang'},{message:'taodhuilang'},{message:'taodhuilang'},{message:'taodhuilang'}],
         hi:"k"
      }
   },

  methods : {
      great () {
        console.log("this:" , this)
      }
  },

   init () {
     console.log("init this:" , this)
   },

    getThis (el) {
      var self = null;

      if(el){
        self = el
        
      }

      return function () {
        return el
      }
   },

   ready () {
      initBus.setThis.call(initBus, this);
   },

   initBus (bus) {
      initBus.regBus(bus);
   },

   components:{test}

   
}
</script>

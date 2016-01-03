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
   <p v-on:click = "great()">{{msg}}</p>
   <p>{{time}}</p>
   <p>{{hi}}</p>
   <test></test>
  </div>
</template>

<script>

import tools from  '../../services/tools.js'
import test from './test.vue'

export default {

   data () {
      console.log("this" , this)
      return {
         h: 450,
         time:10,
         msg:"left",
         hi:"k"
      }
   },

  methods : {
      great () {
        console.log("this:" , this)
      }
  },

   setPageSize () {
      const h = tools.getPageHeight();
      const w = tools.getPageWidth();
      this.h = h - 110
      console.log("setPageSize:" , this , this.h)
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
      console.log("start component")
      tools.el = this;
       console.log("image self:" , tools.el)
      this.$options.getThis(this);
     
   },

   image () {
    if(!tools.el) return 

    setInterval(()=>{
      tools.el.time ++
    } , 2000)
    tools.el.msg = "tao tao tao tao"
     console.log("image getThis:" , tools.el , this)
   },

   initBus (bus) {
     
      bus.on("startImage" , this.image.bind(this))
   },

     components:{test}

   
}
</script>

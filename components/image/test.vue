<style>
	
</style>

<template>
  <div>
    hello dddddddddddddddddddddd
  </div>
</template>

<script>

import tools from  '../../services/tools.js'

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
      this.$options.getThis(this);
      console.log("image self:" , this)
   }


   
}
</script>

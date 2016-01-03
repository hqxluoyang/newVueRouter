
//import channelControl from './channelControl'
//import allComp from './allComp'
import comp from '../components/index.vue'
import Vue from 'vue'
import Config from './config'
export default {
    startInit () {
 		const allComp = comp.getComp();
 		const bus = Config.Runtime.eventBus;
 		
 		for(var obj in allComp){
 			console.log("obj:" , allComp[obj])
 			try{
 				allComp[obj].initBus(bus)
 			}catch(e){
 				console.log("err:" , e)
 			}
 			
 		}
 		
    }
}
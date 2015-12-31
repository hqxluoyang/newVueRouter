
//import channelControl from './channelControl'
//import allComp from './allComp'
import comp from '../components/index.vue'
import Config from './config'
export default {
    startInit () {
 		const allComp = comp.getComp();
 		const bus = Config.Runtime.eventBus;
 		allComp['userHcomp'].initBus(bus)
  		console.log("comp:" , allComp)
    }
}
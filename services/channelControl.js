import wschannel from './wschannel.js'
import config from './config'
import EventBus from './event-bus.js'

export default {
	setChannel () {

		console.log("services.channelurl:" , services.channelurl , services)
		var channel = new wschannel(services.channelurl);
		var eventBus = new EventBus(channel);

		eventBus.on("channel" , function(){alert("heheh")})

		setTimeout(function(){
			eventBus.emit("channel")
		} , 1000)
		Config.Runtime.eventBus = eventBus;
	}
}
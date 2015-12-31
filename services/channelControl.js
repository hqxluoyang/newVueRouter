import wschannel from './wschannel.js'
import Config from './config'
import EventBus from './event-bus.js'

export default {
	setChannel () {
		services.channelurl = services.baseurl
		console.log("services.channelurl:" , services.channelurl , services)
		var channel = new wschannel(services.channelurl);
		var eventBus = new EventBus(channel);

		eventBus.on("channel" , function(){})

		setTimeout(function(){
			eventBus.emit("channel")
		} , 1000)
		Config.Runtime.eventBus = eventBus;
	}
}
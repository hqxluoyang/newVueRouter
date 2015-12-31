/*
    hqx
    2016/1231
*/
import Config from './config'
export default {
	
	onOpened () {
		console.log("opened :")
	},

	onPhoneConnected () {
		console.log("phoneConnected")
	},

	onPhoneDisconnected () {
		console.log("phoneDisconnected")
	},

    initStart () {
        const bus = Config.Runtime.eventBus;
		bus.on("opened", this.onOpened);
		bus.on("phoneConnected", this.onPhoneConnected);
		bus.on("phoneDisconnected", this.onPhoneDisconnected);
		
    },

}
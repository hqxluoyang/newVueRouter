/*
    hqx
    2016/1231
*/
import Config from './config'
export default {
	
	onDirect () {
		console.log("direct :")
	},

	onDirectOK () {
		console.log("directOK")
	},

	onDirectUpload () {
		console.log("onDirectUpload")
	},

    initStart () {
        const bus = Config.Runtime.eventBus;
		bus.on("direct", this.onDirect);
		bus.on('directOK', this.onDirectOK);
		bus.on('directUpload', this.onDirectUpload);
		
    },

}
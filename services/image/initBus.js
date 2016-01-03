import tools from '../tools.js'

export default {

	setThis (self) {
		this.vm = self;
		console.log("thiseeeeeeeeeeeeeeeeee:", this)
	},

	getVm () {
		if(this.vm){
			return true
		}else{
			return false
		}
	},

	execFun (callback) {
		const self = this;
		return function () {
            if(self.getVm){
				callback.call(self);
			}
			
		}
	},

	startImage () {
		const self = this.vm;
    
		self.time=100000
		console.log("start Image:" , this)
	},

	regBus (bus) {
		bus.on("startImage" , this.execFun.call(this, this.startImage))
	}
}
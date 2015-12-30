/*
 * author michael wang
 * 2014.03.27
 */
define(["debug", "./channel","./wschannel", "./config"] , function(debug, Channel, WSChannel, Config){
	var EventBus = function(channel){
		this.listeners = {};
		if(channel){
			this.channel = channel;
			var self = this;
			this.channel.on('ALL',function(type,data){
				self.emit(type,data);
			});
			
			
		}
		var bus = this;
		
		this.on('directChannel', function(data){
			Config.Runtime.directChannelURL = data.url
		    //启用直连channel
			bus.localChannel = new WSChannel(data.url, true)
			bus.localChannel.on('ALL',function(type,data){
				self.emit(type,data)
			})
			bus.localChannel.longPolling();
			
		})
		
		this.on('switchChannel', function(){
			Config.Runtime.isDirectChannel = true;
			
		})
		
		this.on('postMessage', function(msg){
			if(!Config.Runtime.isDirectChannel){
				bus.channel.postMessage(msg);
			}else{
				bus.localChannel.postMessage(msg);
			}
//			console.log("post message by eventbus");
		})		
	};
	
	
	
	EventBus.prototype.on = function (event, fn) {
	    	if(!this.listeners[event]){
	    	
	    		this.listeners[event] = [];
	    	}
	    	if(fn){
	    		this.listeners[event].push(fn);
	    	}else{
	    		console.log("WARNING: invalid callback for event " + event + ". callback is undefine or null" );
	    	}
	    }

	EventBus.prototype.emit = function (event) {
        var callbacks = this.listeners[event];
        if (callbacks) {
        	
        	for(var i = 0; i < callbacks.length; i++ ){
        		var args = Array.prototype.slice.call(arguments, 1);
        		callbacks[i].apply(null,args);
        	}
        }
    }
    console.log("eventbus:" , Channel)
	return EventBus;
})
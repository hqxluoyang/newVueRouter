define(["debug", "./longpollingtransport"], function(debug, LongPollingTransport){
	var Channel = function (channelurl) {
        this.channelurl = channelurl;
        this.transport = new LongPollingTransport(channelurl, this.decodeMessage.bind(this));
        this.listeners = {};
        this.errorCount = 0;
        this.SLEEPTIME = [1,2,3,5,8,13,21,34];
    };
    
    Channel.prototype.longPolling = function () {
    	this.transport.connect();
    };
    
    var doEmit = function(channel, event){
    	if (event.type === "o") {
			channel.emit("opened");
		} else if (event.type === "h") {
			channel.emit("heartBeat");
		} else {
			channel.emit(event.type,event.data);
		}
    }
    
    //现在消息有两种格式，1.裸JSON对象2.字符串数组

    Channel.prototype.decodeMessage = function (msgs) {
    	
    	var event;
    	if(msgs instanceof Array){
    		for (var i = 0; i < msgs.length; i++) {
    			var msg = msgs[i];
    			try{
    				debug.clogs(msg, "blue", "blue");
    				event = tools.parseJson(msg);
    				doEmit(this, event);
    			}catch(e){
    				tools.logs(e);
    			}
    		}
    	}else{
    		debug.clogs(JSON.stringify(msgs),"blue","blue");
    		doEmit(this, msgs);
    	}

    };

    Channel.prototype.on = function (event, fn) {
    	if(!this.listeners[event]){
    	
    		this.listeners[event] = [];
    	}
        this.listeners[event].push(fn);
    }

    Channel.prototype.emit = function (event) {
        var callbacks = this.listeners[event];
        if (callbacks) {
        	
        	for(var i = 0; i < callbacks.length; i++ ){
        		
        		var args = Array.prototype.slice.call(arguments, 1);
        		callbacks[i].apply(null,args);
        	}
        }
        
        callbacks = this.listeners["ALL"];
        if (callbacks) {
        	
        	for(var i = 0; i < callbacks.length; i++ ){
        		
        		callbacks[i].apply(null,arguments);
        	}
        }
    }
    
    Channel.prototype.postMessage = function (msg){
		this.transport.postMessage(msg);
    }
    
    return Channel;
});  
define(["debug", "./websockettransport", "./longpollingtransport"], function(debug, WebsocketTransport, LongPollingTransport){
	var WSChannel = function (channelurl, sendSwitchChannel) {
        this.channelurl = channelurl;
        this.wschannelurl = convertToWSChannelurl(channelurl);
        this.transport = new WebsocketTransport(this.wschannelurl, this.decodeMessage.bind(this));
        this.listeners = {};
        this.errorCount = 0;
        this.SLEEPTIME = [1,2,3,5,8,13,21,34];
        this.sendSwitchChannel = !!sendSwitchChannel;
    };
    
    WSChannel.prototype.longPolling = function () {
    		var that = this;
    		this.transport.connect(function(error){
//    			if(that.sendSwitchChannel){
//    				that.emit("switchChannel");
//    			}
    			console.log("websocket failed, fallback");
    			that.transport = new LongPollingTransport(that.channelurl, that.decodeMessage.bind(that));
    			that.transport.connect();
    			
    		});
    };
    
    var convertToWSChannelurl = function (channelurl){
    	return channelurl.replace("http","ws").replace("channel","wschannel");
    	
    }
    
    var doEmit = function(channel, event){
    	if (event.type === "o") {
			console.log("channel opened!");
			channel.emit("opened");
		} else if (event.type === "h") {
			channel.emit("heartBeat");
		} else {
			channel.emit(event.type,event.data);
		}
    }
    
    //现在消息有两种格式，1.裸JSON对象2.字符串数组

    WSChannel.prototype.decodeMessage = function (msgs) {
    	
    	//console.log("msg:" , msgs)
    	var event;
    	if(msgs instanceof Array){
    		for (var i = 0; i < msgs.length; i++) {
    			var msg = msgs[i];
    			try{
    				debug.clogs(msg, "blue", "blue");
    				event = JSON.parse(msg);
    				doEmit(this, event);
    			}catch(e){
    				console.log(e);
    			}
    		}
    	}else{
    		debug.clogs(JSON.stringify(msgs),"blue","blue");
    		doEmit(this, msgs);
    	}

    };

    WSChannel.prototype.on = function (event, fn) {
    	if(!this.listeners[event]){
    	
    		this.listeners[event] = [];
    	}
        this.listeners[event].push(fn);
    }

    WSChannel.prototype.emit = function (event) {
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
    
    WSChannel.prototype.postMessage = function (msg){
    	this.transport.postMessage(msg);
    }
    
    return WSChannel;
});  
define(["debug"], function(debug){
	var WebsocketTransport = function(channelurl, onMessageCallback){
		this.channelurl = channelurl;
        this.onMessageCallback = onMessageCallback;
	}    
   
	
	WebsocketTransport.prototype.connect = function(fallback){
		try{
			
			var ws = new WebSocket(this.channelurl);
		}catch(e){
			throw e;
		}
		
    	var self = this;
    	//部分浏览器safari5.1.x 对websocket异常处理不正确，当握手不成功时，没有调用onerror，而是直接调用onclose 
    	//因此这里增加一个wsopened的开关，当未open就close时，认为是握手失败，然后再fallback到longpolling
    	ws.onopen = function(event){
    		self.wsopened = true;
    	}
    	ws.onmessage = function(event){
    		try{
    			console.log("ws event:" + event.data);
    			self.onMessageCallback(JSON.parse(event.data));
        	}catch(err){
        		console && console.log && console.log(err); 
        	}
    	}
        ws.onclose = function(event){
        	if(!self.wsopened){
        		!self.fallbacked && fallback(event);
        		self.fallbacked = true;
        	}
        	wsopend = false
        }
        
        ws.onerror = function(event){
        	!self.fallbacked && fallback(event);
        	self.fallbacked = true;
        	
        }
        this.ws = ws;
		
	}
	
	WebsocketTransport.prototype.postMessage = function(msg){
		this.ws.send(msg);
	}
	
	return WebsocketTransport;

	
});  
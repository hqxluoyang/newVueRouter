define(["debug"], function(debug){
	var LongPollingTransport = function(channelurl, onMessageCallback){
		this.channelurl = channelurl;
        this.errorCount = 0;
        this.SLEEPTIME = [1,2,3,5,8,13,21,34];
        this.onMessageCallback = onMessageCallback;
	}    
   
	
	LongPollingTransport.prototype.connect = function(){
	      var self = this;
	      //  tools.logs("longPolling:" , self.errorCount , this.channelurl);
	        var c = '&'
	        if(this.channelurl.indexOf('?') < 0){
	        	c = '?'
	        }
	        $.getJSON(this.channelurl + c +"t=" + (new Date().getTime()), function () {})
	            .done(function (msg) {
	            	
	            	//tools.logs("polling:" , msg)
	            	try{
		                self.onMessageCallback(msg);
		                self.errorCount = 0;
	            	}catch(err){
	            		console && console.log && console.log(err); 
	            	}
	            })
	            .always(function (d,textStatus,error) {
	            	if( ["error" ,"timeout" , "parsererror"].indexOf(textStatus) >= 0 ){
	            		self.errorCount = self.errorCount + 1;
	            		var sleeptime = self.findSleepTime();
	            		setTimeout(function(){self.connect();}, sleeptime);
	            	}else {
	            		self.connect();	
	            	}
	            }
	        );
		
	}
	
	LongPollingTransport.prototype.findSleepTime = function(){
		var self = this;
		var sleeptime;
		if(self.errorCount >= self.SLEEPTIME.length){
			sleeptime = self.SLEEPTIME[self.SLEEPTIME.length - 1] * 1000;
		}else{
			sleeptime = self.SLEEPTIME[self.errorCount] * 1000;
		}
		if(console && console.log){
			console.log("channel error, sleeptime " + sleeptime + " ms");
		}
		return sleeptime;
	}
	
	LongPollingTransport.prototype.postMessage = function(msg){
		$.ajax({
			url: this.channelurl,
			type: 'POST',
			contentType:"application/json;utf-8",
			data: msg,
			success: function(d){
			},
			error: function(xhr, tstatus, ethrows){
			}
		});
	}
	
	return LongPollingTransport;
});  
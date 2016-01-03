/*
 * author michael wang
 * 2014.05.29
 */
define(['./config'], 
	function(Config){
	var Tools = {
		xmlhttp:null,
		
		init:function(){
			Tools.getPageSize();
		},
		sendMsgToChannel: function(s){
			
			var msg = JSON.stringify(s);
			
			debug.clogs(msg, "green", "green");
			if(!Config.Runtime.isDirect && s.type === "requestFile"){
				var data = s.data;
				var path;
				var url;
				var xhr;
				for(var i = 0; i < data.length; i++){
					path = data[i];
					url = Config.Config.baseUrl + "respImage/" + Config.Runtime.imei + path;
					xhr = new XMLHttpRequest();
					xhr.open("GET", url, false);
					xhr.setRequestHeader("Y-Action", "requestFile");
					xhr.send();
				}
			}else{
				//console.log("send message to channel = " + s.data);
				$.ajax({
					url: Config.Runtime.channelURL,
					type: 'POST',
					contentType:"application/json;utf-8",
					data: msg,
					success: function(d){
					},
					error: function(xhr, tstatus, ethrows){
					}
				});
			}
		},
		checkload: function(){
			var self = Tools;
			if(self.ifr.contentWindow.document.readyState == "complete"){
				self.ifr.contentWindow.document.execCommand("SaveAs");
				clearInterval(self.timer);
				document.body.removeChild(self.ifr);
			}
			
		},
		imgAnim:function(){
			
		},
		rotateImgRightLeft: function(flag , elClass){
			switch(elClass){
				case "classRotate0":
					flag ? elClass="classRotateBig270" : elClass="classRotateBig90";
					break;
				case "classRotateBig90":
					flag ? elClass="classRotate0" : elClass="classRotate180";
					break;
				case "classRotate180":
					flag ? elClass="classRotateBig90" : elClass="classRotateBig270";
					break;
				case "classRotateBig270":
					flag ? elClass="classRotate180" : elClass="classRotate0";
					break;
				default:
					break;
			}
			return elClass;
			
		},
		downloadFile: function(url){
			var self = Tools;
			
			//alert($("#downloadFile").length)
		
			//console.log("url:" , url)
			var ifr = document.createElement("iframe");
			//self.ifr.id = "downloadFile";
			    ifr.src = url+"?download=1";
			    ifr.style.display = "none";
			/*    ifr.onload = function(){
				$(this).remove();
			//	console.log("this.remove:" , this)
			}
			*/
			  /*  $(ifr).load(function(){
			    	$(this).remove();
			    })
			    */
			  //  if (!/*@cc_on!@*/0) { //if not IE 
			  /*  	ifr.onload = function(){ 
			    	alert("Local iframe is now loaded."); 
			    	}; 
			    	} else { 
			    	ifr.onreadystatechange = function(){ 
			    	if (ifr.readyState == "complete"){ 
			    	alert("Local iframe is now loaded."); 
			    	} 
			    	}; 
			    	} 
			    	*/
			   /* $(ifr).load(function(){
			    	$(this).remove();
			    })
			    */
			   /* function onComplete(){
			    	alert("dddd")
			    }
			    */
			    var fmState=function(){
			    	var state=null;
			    	if(document.readyState){
			    		try{
			    			state=ifr.document.readyState;
			    		}catch(e){
			    			state=null;
			    		}
			    		if(state=="complete" || !state){
			    			$(ifr).remove();
			    			return;
			    		}
			    		window.setTimeout(fmState , 10);
			    	}
			    }
			   fmState.timeoutInt = window.setTimeout(fmState,400);   
			   document.body.appendChild(ifr);
			 
			//self.ifr.contentWindow.location.href=url+"?download=1";
			//self.timer = setInterval(self.checkload, 200);
	//		window.open(url,"download","");
			
			//$("#downloadFile").remove();
		},
		uploadFiles: function(opts){
			Tools.allMiddlePosition("#upload_container");
	
			$.blockUI({
				'message':{},
				'bindEvents': false,
				'css':{"background":"#000"}
			});
			$("#upload_container").show();
			$('#file_upload').uploadify({
				"swf"  : Config.Config.baseUrl + "js/uploadify.swf",
				"uploader": Config.Config.baseUrl + "upload",  //"/server/upload", 			
				"fileTypeExts": opts.fileTypeExts,
				"fileTypeDesc": "请选择"+opts.fileTypeExts,
				"cancelImage" : "images/cancel.png",
				"removeTimeout": 0.1,
				"auto":false,
				"multi":false,
				"requeueErrors":false,
				"queueID": "upload_queue",
				"width":90,
				"height":30,
				"buttonText":"添加文件",
				"multi":true,
				"formData":{"imei":"111", "mime":"image/jpg", "path":"/111111111/"},
				"onSelect": function(file){
					console.log("file name = " + file.name);
					
					/*
					if(file.size<=100*1024){
						alert('文件'+file.name+'小于100K,请选择大于100K以上的影视文件');
						$('#file_upload').uploadifyCancel(file.id);
						return false;
					}else if(file.size>=2*1024*1024*1024-1024){//减掉1kb的头文件信息大小
						alert(file.name+'文件超出2G大小限制\r\n如传输,请选择迅雷7');
						$('#file_upload').uploadifyCancel(file.id);
						return false;
					}
					*/
				},
				"onUploadStart":function(file){
					var m = {};
					m.type = "sendFile";
					m.data = {"fileType":opts.fileType, "fileName":file.name};
					Tools.sendMsgToChannel(m);
					//console.log(Config.Config.baseUrl + file.name)
					console.log("file extension = " + file.name.substring(file.name.lastIndexOf(".")) + " >>> " + Config.map.get(file.name.substring(file.name.lastIndexOf("."))));
					console.log("file:" , file)
					$("#file_upload").uploadify("settings", "formData", {"imei":Tools.getSessionId().substring(0,7), "mime":Config.map.get(file.name.substring(file.name.lastIndexOf("."))), "path":file.name});
					
					$("#error_msg").show();
				},
				"onDialogClose":function(filesSelected,filesQueued,queueLength){
					$("#filesss").jScrollPane();
				},
				"onUploadComplete":function(file){
					// var reader = new FileReader();
				  //      reader.readAsDataURL(file);
				//	console.log(reader)
				},
				"onUploadProgress":function(file,fileBytesLoaded,fileTotalBytes){
					
				},
				"onUploadSuccess":function(file,data,response){
				//	alert(file.toSource());
					//if(Config.Runtime.uploadType == 'image')
					console.log("success:" , arguments)
					switch(Config.Runtime.uploadType){
						case "image":
							break;
						default:
							break;
					}
					console.log("upload:img;" , file , data , response , Config.Runtime.fileType)
				},
				"onQueueComplete":function(){
					$("#error_msg").hide();
				}
			});
		},
		
		uploadImg: function(opts){
			//Tools.allMiddlePosition("#upload_container");
	
		/*	$.blockUI({
				'message':{},
				'bindEvents': false,
				'css':{"background":"#000"}
			});
		*/
		
		//	$("#upload_container").show();
			$('#file_upload').uploadify({
				"swf"  : Config.Config.baseUrl + "js/uploadify.swf",
				"uploader": Config.Config.baseUrl + "upload",  //"/server/upload", 			
				"fileTypeExts": opts.fileTypeExts,
				"fileTypeDesc": "请选择"+opts.fileTypeExts,
				"cancelImage" : "images/cancel.png",
				"removeTimeout": 0.1,
				"auto":false,
				"multi":false,
				"requeueErrors":false,
				//"queueID": "upload_queue",
				"width":30,
				"height":20,
				"buttonText":"添加文件",
				"multi":true,
				"formData":{"imei":"111", "mime":"image/jpg", "path":"/111111111/"},
				"onSelect": function(file){
				},
				"onUploadStart":function(file){
					var m = {};
					m.type = "sendFile";
					m.data = {"fileType":opts.fileType, "fileName":file.name};
					Tools.sendMsgToChannel(m);
					//console.log(Config.Config.baseUrl + file.name)
					console.log("file extension = " + file.name.substring(file.name.lastIndexOf(".")) + " >>> " + Config.map.get(file.name.substring(file.name.lastIndexOf("."))));
					console.log("file:" , file)
					$("#file_upload").uploadify("settings", "formData", {"imei":Tools.getSessionId().substring(0,7), "mime":Config.map.get(file.name.substring(file.name.lastIndexOf("."))), "path":file.name});
					
					$("#error_msg").show();
				},
				"onDialogClose":function(filesSelected,filesQueued,queueLength){
					$("#filesss").jScrollPane();
				},
				"onUploadComplete":function(file){
					// var reader = new FileReader();
				  //      reader.readAsDataURL(file);
				//	console.log(reader)
				},
				"onUploadProgress":function(file,fileBytesLoaded,fileTotalBytes){
					
				},
				"onUploadSuccess":function(file,data,response){
				//	alert(file.toSource());
					//if(Config.Runtime.uploadType == 'image')
					console.log("success:" , arguments)
					switch(Config.Runtime.uploadType){
						case "image":
							break;
						default:
							break;
					}
					console.log("upload:img;" , file , data , response , Config.Runtime.fileType)
				},
				"onQueueComplete":function(){
					$("#error_msg").hide();
				}
			});
		},
		
		getPageSize:function(){
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {	
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
				xScroll = document.body.scrollWidth;
				yScroll = document.body.scrollHeight;
			} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				xScroll = document.body.offsetWidth;
				yScroll = document.body.offsetHeight;
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {	// all except Explorer
				if(document.documentElement.clientWidth){
					windowWidth = document.documentElement.clientWidth; 
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) { // other Explorers
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}	
			// for small pages with total height less then height of the viewport
			if(yScroll < windowHeight){
				pageHeight = windowHeight;
			} else { 
				pageHeight = yScroll;
			}
			// for small pages with total width less then width of the viewport
			if(xScroll < windowWidth){	
				pageWidth = xScroll;		
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
			return arrayPageSize;
		},
		encodeMyUri:function(url){
			if(url.indexOf("?") != -1){
				url += "&random=" + (Math.random() + "").replace(",","");
			}else{
				url += "?random=" + (Math.random() + "").replace(",", "");
			}
			return encodeURI(url);
		},
		setTimeStamp:function(url){
			if(url.indexOf("?") != -1){
				url += "&random=" + (new Date().getTime()); 
			}else{
				url += "?random=" + (new Date().getTime());
			}
			return url;
		},
		encodePath:function(path){
			var p = "";
			var arrPath = path.split('@');
			if (path.indexOf("@") != -1) {
				for(i=0; i<arrPath.length-1; i++){
					p += encodeURIComponent(arrPath[i])+'@';
				}
			}else{
				p = encodeURIComponent(path);
			}
			return p;
		},
		/**
		 * sort()方法的比较方法，对象数组升序排列。 
		 */
		compareOjbectArray:function(propertyName){
			return function(o1, o2){
				var v1 = o1[propertyName];
				var v2 = o2[propertyName];
				if(v1 < v2){
					return -1;
				}else if(v1 > v2){
					return 1;
				}else{
					return 0;
				}
			};
		},
		compareArray:function(){
			if(v1 < v2){
				return -1;
			}else if(v1 > v2){
				return 1;
			}else{
				return 0;
			}
		},
		addEvt:function(obj, evt, fn){
			if(obj.attachEvent){
				obj.attachEvent('on' + evt, fn);
			}else if(obj.addEventListener){
				obj.addEventListener(evt, fn);
			}else{
				return false;
			}
		},
		closeWebPage:function(){
	        if (navigator.userAgent.indexOf("MSIE") > 0) {
	            if (navigator.userAgent.indexOf("MSIE 6.0") > 0){
	                window.opener = null; window.close();
	            }
	            else {
	                window.open('', '_top'); window.top.close();
	            }
	        }
	        else if (navigator.userAgent.indexOf("Firefox") > 0) {
	            window.location.href = 'about:blank '; //火狐默认状态非window.open的页面window.close是无效的
	            //window.history.go(-2);
	        }
	        else {
	            window.opener = null;    
	            window.open('', '_self', '');
	            window.close();
	        }
	    },
	    stringToJson:function(str){
	    	return eval("(" + str + ")");
	    },
	    stringToJson2:function(str){
	    	var j = (new Function("return " + str))();
	    	return j;
	    },
	    /* 使用JSON.parse需严格遵守JSON规范，如属性都需用引号引起来 , 不能处理复杂的json结构  */
	    stringToJson3:function(str){
	    	return JSON.parse(str);
	    },
	    /* 使用JSON.parse需严格遵守JSON规范，如属性都需用引号引起来 , 不能处理复杂的json结构
	     * chrome中，JSON.parse的第一个参数只能是字符串，不能是对象（包括new String方式也不支持） 
		 * 再回到上面给Object.prototype添加一个解析json的方法，如果要兼容所有浏览器，可以这么写：
	     */
	    stringToJson4:function(str){
	    	Object.prototype.parseJSON = function(){ 
	    		return JSON.parse(str.toString()); 
			};
	    	return str.parseJSON();
	    },
	    parseJson:function(str){
//	    	console.log("str typeof = " + typeof str);
	    	if(str !== "string"){
	    		str = str.toString();
	    	}
	    	if(window.JSON){
    			return JSON.parse(str);
    		}else{
    			return (new Function("return " + str))();
    		}
	    },
	    jsonToString:function(O){
			var S = [];
			var J = "";
			if(Object.prototype.toString.apply(O) === '[object Array]'){
				for (var i = 0; i < O.length; i++)
					S.push(this.jsonToString(O[i]));
				J = '[' + S.join(',') + ']';
			}
			else if(Object.prototype.toString.apply(O) === '[object Date]'){
				J = "new Date(" + O.getTime() + ")";
			}
			else if(Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]'){
				J = O.toString();
			}
			else if(Object.prototype.toString.apply(O) === '[object Object]'){
				for(var i in O){
					O[i] = typeof (O[i]) == 'string' ? '"' + O[i] + '"' : (typeof (O[i]) === 'object' ? this.jsonToString(O[i]) : O[i]);
					S.push(i + ':' + O[i]);
				}
				J = '{' + S.join(',') + '}';
			}
			return J;
	    },
	    jsonToString2:function(o) {
	        if(o == undefined){
	            return "";
	        }
	        var r = [];
	        if(typeof o == "string") 
	        	return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	        if(typeof o == "object"){
	            if(!o.sort){
	                for(var i in o)
	                    r.push("\"" + i + "\":" + this.jsonToString2(o[i]));
	                if(!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
	                    r.push("toString:" + o.toString.toString());
	                }
	                r = "{" + r.join() + "}";
	            }else{
	                for(var i = 0; i < o.length; i++)
	                    r.push(this.jsonToString2(o[i]));
	                r = "[" + r.join() + "]";
	            }
	            return r;
	        }
	        return o.toString().replace(/\"\:/g, '":""');
	    },
	    /* only gltIE8, chrome1+, FF3+ */
	    jsonToString3:function(j){
	    	return JSON.stringify(j);
	    },
	    Ajax:{
				send:function(type , url , callBack){
					$.ajax({
						type: type,
						url: url,
						success: callBack
	
						})
				}
			},
	    /* getElementsByClassName */
			
		guidGenerator: function(){
				var s4 = function(){
					return(((1+Math.random())*0x10000)|0).toString(16).substring(1);
				}
				return(s4() + s4() +"-" + s4() +"-" + s4() +"-" + s4() +"-" + s4() +"-" + s4()  + s4()  )
			},
		createEl:function(parent ,div , className){
			var dom = document.createElement(div);
				if(className){
					dom.className = className;
				}
				parent.appendChild(dom);
				return dom;
		},
		elSetStyle:function(el , rect){
			el.style.width = rect.width + "px";
			el.style.top = rect.top + "px";
			el.style.left = rect.left + "px";
			el.style.height = rect.height + "px";
		},
	    getElementsByClassName:function(searchClass, node, tag){
			if(document.getElementsByClassName){
				var nodes =  (node || document).getElementsByClassName(searchClass),result = [];
				for(var i=0 ;node = nodes[i++];){
					if(tag !== "*" && node.tagName === tag.toUpperCase()){
						result.push(node);
					}
				}
				return result;
			}else{
				node = node || document;
				tag = tag || "*";
				var classes = searchClass.split(" "),
					elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
					patterns = [],
					current,
					match;
				var i = classes.length;
				while(--i >= 0){
					patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
				}
				var j = elements.length;
				while(--j >= 0){
					current = elements[j];
					match = false;
					for(var k=0, kl=patterns.length; k<kl; k++){
						match = patterns[k].test(current.className);
						if(!match)
							break;
					}
					if(match)
						result.push(current);
				}
				return result;
			}
		},
		stopEvent:function(e){
			if (e.stopPropagation) {
				e.stopPropagation();
	        } else {
	        	e.cancelBubble = true;
	        }
	
	        if (e.preventDefault) {
	        	e.preventDefault();
	        } else {
	        	e.returnValue = false;
	        }
		},
		// data = "name=wml&age=999";
		getAjax:function(url, type, data){
			if (window.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				Tools.xmlhttp = new XMLHttpRequest;
				
				//针对某些特定版本的mozillar浏览器的bug进行修正。
				if (Tools.xmlhttp.overrideMimeType) {
					Tools.xmlhttp.overrideMimeType('text/xml');
				};
				
			} else if (window.ActiveXObject){
				// code for IE6, IE5
				Tools.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			};
			//2.注册回调函数
			//onreadystatechange是每次 readyState 属性改变的时候调用的事件句柄函数。
			Tools.xmlhttp.onreadystatechange = callback;
			
			//3.设置连接信息
			//初始化HTTP请求参数，但是并不发送请求。
			//第一个参数连接方式，第二是url地址,第三个true是异步连接，默认是异步
			Tools.xmlhttp.open(type,url+"?"+data,true);
			
			/*******************************************/
			/*如果是Tools.xmlhttp.open("GET","xhr.php",true);*/
			/*    Tools.xmlhttp.send('name=' +username);     */
			/*    不行的                               */
			/*******************************************/
			
			//使用post方式发送数据
			//Tools.xmlhttp.open("POST","xhr.php",true);
			//post需要自己设置http的请求头
			//Tools.xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			
			//4，发送数据，开始和服务器进行交互
			//发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
			//中如果true, send这句话会立即执行
			//如果是false（同步），send会在服务器数据回来才执行
			Tools.xmlhttp.send(null);
			//因为是get所以send中不需要内容
			//Tools.xmlhttp.send('name=' +username);
		},
		ajax:function(obj){
			$.ajax({
					type: obj.type,
					url: obj.url,
					data:obj.data,
					success: obj.callBack
	
					})
		},
		callback:function(){
			//alert(Tools.xmlhttp.readyState);
		//判断对象状态是交互完成，接收服务器返回的数据
			if (Tools.xmlhttp.readyState==4 && Tools.xmlhttp.status==200){
			//["dada","xiaoyin","liujie"]
			//纯文本的数据
			var responseText = Tools.xmlhttp.responseText;
			var divNode = document.getElementById('box');
			//6.将服务器的数据显示在客户端
			divNode.innerHTML = responseText;   
		}    
		},
		getSessionId:function(){
		var c_name = 'JSESSIONID';
		if(document.cookie.length>0){
			var c_start = document.cookie.indexOf(c_name + "=");
			if(c_start != -1){
				c_start = c_start + c_name.length +1;
				var c_end = document.cookie.indexOf(";", c_start);
				if(c_end == -1){
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		},
		encodeFullUrl: function(url){
			return encodeURI(url);
		},
		encodeUrl: function(url, p){
			return url+encodeURIComponent(p);
		},
		getPageHeight: function(){
			return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		},
		getPageWidth: function(){
			return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		},
		getH: function(obj){
			try{
				if($(obj).css("height") == undefined || $(obj).css("height") == "auto" ){
					var id = obj.replace("#","");
					return document.getElementById(id).offsetHeight;
				}else{
					return $(obj).css("height").replace("px", "");
				}
			}catch(e){
				return;
			}
		},
		getW : function(obj){
			try{
				if($(obj).css("width") == undefined || $(obj).css("width") == "auto" ){
					var id = obj.replace("#","");
					return document.getElementById(id).offsetWidth;
				}else{
					return $(obj).css("width").replace("px", "");
				}
			}catch(e){
				return;
			}
		},
		middlePosition : function(obj){
			$(obj).css({"left":(Tools.getPageWidth() - Tools.getW(obj)) / 2});
		},
		allMiddlePosition : function(obj){
			$(obj).css({"left":(Tools.getPageWidth() - Tools.getW(obj)) / 2});
			if(Tools.getPageHeight() - Tools.getH(obj) < 0){
				$(obj).css({"top":10});
			}else{
				$(obj).css({"top":(Tools.getPageHeight() - Tools.getH(obj)) / 2});
			}
		},
		getPosition: function(obj){
			var pos = [];
			pos.push((Tools.getPageWidth() - obj.wid) / 2);
			if(Tools.getPageHeight() - obj.hei < 0){
				pos.push(10);
			}else{
				pos.push((Tools.getPageHeight() - obj.hei) / 2);
			}
			return pos;
		},
		getDateTime: function(){
			var d = new Date();
			return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		},
		getTime: function(){
			var d = new Date();
			return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
		},
		setImgSize:function(opts, imgObj){
			var imgWidth = 0;
			var imgHeight = 0;
			var imgTop = 0;
			var imgLeft = 0;
			if(opts.pageWidth<=opts.maxSize || opts.pageHeight<=opts.maxSize){
				var si = opts.pageWidth<opts.pageHeight?opts.pageWidth:opts.pageHeight;
				opts.maxSize = si;
			}
			if(imgObj.width < opts.minSize && imgObj.height < opts.minSize){
				imgWidth = imgObj.width;
				imgHeight = imgObj.height;
				imgTop = (opts.minSize - imgObj.height)/2;
				imgLeft = (opts.minSize - imgObj.width)/2;
				return{"wid":imgWidth, "hei":imgHeight,"marginTop":imgTop, "marginLeft":imgLeft};
			}
			if (imgObj.width < opts.minSize && imgObj.height >= opts.minSize) {
				imgWidth = imgObj.width;
				imgHeight = imgObj.height;
				imgTop = 0;
				imgLeft = (opts.minSize - imgObj.width)/2;
				return{"wid":imgWidth, "hei":imgHeight,"marginTop":imgTop, "marginLeft":imgLeft};
			}
			if (imgObj.height < opts.minSize && imgObj.width > imgObj.height) {
				imgWidth = imgObj.width;
				imgHeight = imgObj.height;
				imgTop = (opts.minSize - imgObj.height)/2;
				imgLeft = 0;
				return{"wid":imgWidth, "hei":imgHeight,"marginTop":imgTop, "marginLeft":imgLeft};
			}
			if(imgObj.width >= opts.maxSize && imgObj.width >= imgObj.height){
				if(imgObj.width / imgObj.height > opts.pageWidth / opts.pageHeight){
					imgWidth = opts.maxSize;
					imgHeight = (opts.maxSize/imgObj.width) * imgObj.height;
					return {"wid":imgWidth, "hei":imgHeight,"marginTop":imgTop, "marginLeft":imgLeft};
				}else{
					imgHeight = opts.maxSize;
					imgWidth = (opts.maxSize/imgObj.height) * imgObj.width;
					return {"wid":imgWidth, "hei":imgHeight,"marginTop":imgTop, "marginLeft":imgLeft};
				}
			}else{
				if (imgObj.height >= (opts.maxSize - 0) && imgObj.width < imgObj.height && imgObj.width<30) {
					imgWidth = (opts.maxSize-0)/imgObj.height * imgObj.width;
					imgHeight = opts.maxSize-0;
					return {"wid":imgWidth, "hei":imgHeight,"marginTop":imgTop, "marginLeft":imgLeft+0};
				}
				if (imgObj.height >= (opts.maxSize-0) && imgObj.width < imgObj.height) {
					imgWidth = (opts.maxSize-0)/imgObj.height * imgObj.width;
					imgHeight = opts.maxSize-0;
					return {"wid":imgWidth, "hei":imgHeight,"marginTop":imgTop, "marginLeft":imgLeft};
				}else{
					return {"wid":imgObj.width, "hei":imgObj.height,"marginTop":imgTop, "marginLeft":imgLeft};
				}
			}
		},
		
		getStorageSize: function(size){
			if(size < 1024){
				return size + "B";
			}
			if(size < 1048576){
				return Math.round((size / 1024) * 100) / 100 + "KB";
			}
			if(size < 1073741824){
				return Math.round((size / 1048576) * 100) /100 + "MB";
			}
			if(size < 1099511627776){
				return Math.round((size / 1073741824) * 100) / 100 + "GB";
			}else{
				return Math.round((size / 1099511627776) * 100) / 100 + "TB";
			}
		},
		
		getStoragePercent: function(num, total){
			return Math.round(num / total * 10000) / 100.00  + "%";
		},
		
		scrollInit: function(id){
			var settings = {
					autoReinitialise: true
			};
			var pane = $("#" + id).jScrollPane();
			pane.jScrollPane(settings);
			return pane.data('jsp');
		},
		
		scrollTop: function(id){
			var pane = $("#" + id).jScrollPane();
			var api = pane.data('jsp');
			api.scrollTo(0, 0);
		},
		
		scrollBottom: function(id){
			var pane = $("#" + id).jScrollPane();
			var api = pane.data('jsp');
			api.scrollToBottom();
		}, 
		
		scrollTo: function(id, y){
			var pane = $("#" + id).jScrollPane();
			var api = pane.data('jsp');
			api.scrollTo(0, y);
		}, 
		
		scrollReinit: function(id){
			var pane = $("#" + id).jScrollPane();
			var api = pane.data('jsp');
			api.reinitialise();
		},
		
		scrollYisBottom: function(id, fn){
			$("#" + id).unbind('jsp-scroll-y').bind('jsp-scroll-y', function(event, scrollPositionY, isAtTop, isAtBottom){
//				console.log('Handle jsp-scroll-y', this,
//						'scrollPositionY=', scrollPositionY,
//						'isAtTop=', isAtTop,
//						'isAtBottom=', isAtBottom);
				
				if(isAtBottom){
					fn();
				}
			});			
		},
		
		scrollDestroy: function(id){
			var pane = $("#" + id).jScrollPane();
			var api = pane.data('jsp');
			api.destroy();
		}
	};
	return Tools;
})
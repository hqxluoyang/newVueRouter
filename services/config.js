/*
 * author michael wang
 * 2014.03.27
 */
define([], function(){
/********全局配置参数**********/
	var imgReady = (function () {
	    var list = [], intervalId = null,
	    // 用来执行队列
	    tick = function () {
	        var i = 0;
	        for (; i < list.length; i++) {
	            list[i].end ? list.splice(i--, 1) : list[i]();
	        };
	        !list.length && stop();
	    },
	    // 停止所有定时器队列
	    stop = function () {
	        clearInterval(intervalId);
	        intervalId = null;
	    };
	    return function (url, ready, load, error) {
	        var onready, width, height, newWidth, newHeight,
	            img = new Image();
	        img.src = url;
	        // 如果图片被缓存，则直接返回缓存数据
	        if (img.complete) {
	            ready.call(img);
	            load && load.call(img);
	            return;
	        };
	        width = img.width;
	        height = img.height;
	        // 加载错误后的事件
	        img.onerror = function () {
	            error && error.call(img);
	            onready.end = true;
	            img = img.onload = img.onerror = null;
	        };
	        // 图片尺寸就绪
	        onready = function () {
	            newWidth = img.width;
	            newHeight = img.height;
	            if (newWidth !== width || newHeight !== height ||
	                // 如果图片已经在其他地方加载可使用面积检测
	                newWidth * newHeight > 1024
	            ){
	                ready.call(img);
	                onready.end = true;
	            };
	        };
	        onready();
	        // 完全加载完毕的事件
	        img.onload = function () {
	            // onload在定时器时间差范围内可能比onready快
	            // 这里进行检查并保证onready优先执行
	            !onready.end && onready();
	            load && load.call(img);
	            // IE gif动画会循环执行onload，置空onload即可
	            img = img.onload = img.onerror = null;
	        };
	        // 加入队列中定期执行
	        if (!onready.end) {
	            list.push(onready);
	            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
	            if (intervalId === null) intervalId = setInterval(tick, 40);
	        };
	    };
	})()
	
	var Map = function(){
		this.container = new Object();
	}
	Map.prototype.put = function(key, value){
		this.container[key] = value;
	}
	Map.prototype.get = function(key){
		var value = key.toLowerCase();
		return this.container[value];
	}
	Map.prototype.keySet = function(){
		var keyset = new Array();
		var count = 0;
		for(var key in this.container){
			if(key == 'extend'){
				continue;
			}
			keyset[count] = key;
			count ++;
		}
		return keyset;
	}
	Map.prototype.size = function(){
		var count = 0;
		for(var key in this.container){
			if(key == 'extend'){
				continue;
			}
			count ++;
		}
		return count;
	}
	Map.prototype.remove = function(key){
		delete this.container[key];
	}
	Map.prototype.toString = function(){
		var str = "";
		for(var i=0, keys=this.keySet(), len=keys.length; i<len; i++){
			str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
		}
		return str;
	};
	var map=new Map();
	map.put(".png", "image/png");
	map.put(".gif", "image/gif");
	map.put(".jpg", "image/jpeg");
	map.put(".jpeg", "image/jpeg");
	map.put(".bmp", "image/bmp");
	map.put(".wbmp", "image/wbmp");
	//audio mime
	map.put(".mp3", "audio/mp3");
	map.put(".wav", "audio/wav");
	map.put(".ogg", "audio/x-ogg");
	map.put(".mid", "audio/mid");
	map.put(".midi", "audio/midi");
	map.put(".wma", "audio/wma");
	map.put(".aac", "audio/aac");
	map.put(".ra", "audio/ra");
	map.put(".amr", "audio/amr");
	map.put(".au", "audio/au");
	map.put(".aiff", "audio/aiff");
	map.put(".ogm", "audio/ogm");
	map.put(".m4a", "audio/m4a");
	map.put(".f4a", "audio/f4a");
	map.put(".flac", "audio/flac");
	map.put(".ape", "audio/x-ape");
	//video mime
	map.put(".mpeg", "video/mpeg");
	map.put(".rm", "video/rm");
	map.put(".rmvb", "video/rmvb");
	map.put(".avi", "video/avi");
	map.put(".wmv", "video/wmv");
	map.put(".mp4", "video/mp4");
	map.put(".3gp", "video/3gp");
	map.put(".m4v", "video/m4v");
	map.put(".flv", "video/flv");
	map.put(".fla", "video/fla");
	map.put(".f4v", "video/f4v");
	map.put(".mov", "video/mov");
	map.put(".mpg", "video/mpg");
	map.put(".asf", "video/asf");
	map.put(".rv", "video/rv");
	map.put(".mkv", "video/x-matroska");
	//package mime
	map.put(".jar", "application/java-archive");
	map.put(".jad", "text/vnd.sun.j2me.app-descriptor");
	//web browser mime
	map.put(".htm", "text/html");
	map.put(".html", "text/html");
	map.put(".php", "text/php");
	//text mime
	map.put(".txt", "text/plain");
	map.put(".csv", "text/csv");
	map.put(".xml", "text/xml");
	//contacts mime
	map.put(".vcf", "contacts/vcf");
	//android specific
	map.put(".apk", "application/vnd.android.package-archive");
	map.put(".lca", "application/vnd.android.package-archive");
	//office mime
	map.put(".doc", "application/msword");
	map.put(".docx", "application/msword");
	map.put(".ppt", "application/mspowerpointer");
	map.put(".pptx", "application/mspowerpointer");
	map.put(".xls", "application/msexcel");
	map.put(".xlsx", "application/msexcel");
	//ebook
	map.put(".pdf", "application/pdf");
	map.put(".epub", "application/epub+zip");
	//compress
	map.put(".zip", "compressor/zip");
	map.put(".rar", "compressor/rar");
	map.put(".gz", "application/gzip");
	//calendar
	map.put(".ics", "ics/calendar");
	//certificate
	map.put(".p12", "application/x-pkcs12");
	map.put(".cer", "application/x-x509-ca-cert");
	map.put(".crt", "application/x-x509-ca-cert");
	
	var musicType = {
			'.mp3': true,	
			'.wav': true,	
			'.x-ogg': true,	
			'.mid': true,	
			'.midi': true,	
			'.wma': true,	
			'.aac': true,	
			'.ra': true,	
			'.amr': true,	
			'.au': true,	
			'.aiff': true,	
			'.ogm': true,	
			'.m4a': true,	
			'.f4a': true,	
			'.flac': true,	
			'.ape': true	
	}
	
	var vMap = new Map();
	vMap.put(".mpeg", "video/mpeg");
	vMap.put(".rm", "video/rm");
	vMap.put(".rmvb", "video/rmvb");
	vMap.put(".avi", "video/avi");
	vMap.put(".wmv", "video/wmv");
	vMap.put(".mp4", "video/mp4");
	vMap.put(".3gp", "video/3gp");
	vMap.put(".m4v", "video/m4v");
	vMap.put(".flv", "video/flv");
	vMap.put(".fla", "video/fla");
	vMap.put(".f4v", "video/f4v");
	vMap.put(".mov", "video/mov");
	vMap.put(".MOV", "video/MOV");
	vMap.put(".mpg", "video/mpg");
	vMap.put(".asf", "video/asf");
	vMap.put(".rv", "video/rv");
	vMap.put(".mkv", "video/x-matroska");
	//console.log("vMap:" , vMap)
	
	var beha = {
			/******** home **********/
			"0000": "home",
			"0001": "home.image",
			"0002": "home.video",
			"0003": "home.music",
			"0004": "home.document",
			
			"0006": "home.app",
			"0007": "home.file",
			"0008": "home.sms",
			"0009": "home.contact",
			"0010": "home.sms.smsBackup",
			"0011": "home.sms.smsRestore",
			"0012": "home.contact.contactBackup",
			"0013": "home.contact.contactRestore",
			"0014": "home.screenShot",
			
			/*************** nav ***********************/
			"0100": "nav.logo",
			"0101": "nav.home",
			"0102": "nav.image",
			"0103": "nav.video",
			"0104": "nav.music",
			"0105": "nav.document",   
			"0106": "nav.sms",
			"0107": "nav.app",
			"0108": "nav.file",
			
			/********* image *************/
			"1000":	"image",
			"1001":	"image.phoneAlbum",
			"1002":	"image.phoneAlbum.timeApp",
			"1003":	"image.refresh",
			"1004": "image.upload",
			"1005": "image.library",
			"1006": "image.library.clickLibrary",
			"1007": "image.androidDesk",
			"1008": "image.saurik",
			"1009": "image.bigImg",
			"1010": "image.download",
			"1011": "image.delete",
			
			/********* video ******************/
			"2000": "video",
			"2001": "video.download",
			"2002": "video.play",
			"2003": "video.refresh",
			"2004": "video.delete",
			"2005": "video.selected",
			"2006": "video.upload",
			
			/********** music **********************/
			"3000": "music",
			"3001": "music.download",
			"3002": "music.refresh",
			"3003": "music.selected",
			"3004": "music.delete",
			"3005": "music.phoneMusic",
			"3006": "music.online",
			"3007": "music.upload",
			"3008": "music.play",
			
			/************* 文档 **************/
			"4000": "document",
			"4001": "document.upload",
			"4002": "document.batchDownload",
			"4003": "document.batchDelete",
			"4004": "document.refresh",
			"4005": "document.singleSelect",
			"4006": "document.multiSelect",
			"4007": "document.selectAll",
			"4008": "document.download",
			"4009": "document.delete",
			"4010": "document.preview",
			"4011": "document.SortByName",
			"4012": "document.sortBySize",
			"4013": "document.SortByTime",
			
			/************* 联系 **************/
			"5000": "sms",
			"5001": "sms.sms.NewMessage",
			"5002": "sms.sms.NewMessage.addContact",
			"5003": "sms.sms.NewMessage.send",
			"5004": "sms.sms.NewMessage.cancel",
			"5005": "sms.sms.batchDelete",
			"5006": "sms.sms.refresh",
			"5007": "sms.sms.singleSelect",
			"5008": "sms.sms.multiSelect",
			"5009": "sms.sms.selectAll",
			"5010": "sms.sms.send",
			"5011": "sms.sms.NewMessage.search",
			"5012": "sms.sms",
			
			"5100": "sms.contact",
			"5101": "sms.contact.newContact",
			"5102": "sms.contact.newContact.addIcon",
			"5103": "sms.contact.newContact.addMobile",
			"5104": "sms.contact.newContact.addEmail",
			"5105": "sms.contact.newContact.addQQ",
			"5106": "sms.contact.newContact.addAddress",
			"5107": "sms.contact.newContact.submit",
			"5108": "sms.contact.newContact.cancel",
			"5109": "sms.contact.batchDelete",
			"5110": "sms.contact.refresh",
			"5111": "sms.contact.singleSelect",
			"5112": "sms.contact.editContact",
			"5113": "sms.contact.multiSelect",
			"5114": "sms.contact.selectAll",
			"5115": "sms.contact.sortByChar",
			"5116": "sms.contact.fastANC.addIcon",
			"5117": "sms.contact.fastANC.addMobile",
			"5118": "sms.contact.fastANC.addEmail",
			"5119": "sms.contact.fastANC.submit",
			"5120": "sms.contact.fastANC.cancel",
			"5121": "sms.contact.fastANC.deleteMobile",
			"5122": "sms.contact.fastANC.deleteEmail",
			"5123": "sms.contact.newContact.deleteQQ",
			"5124": "sms.contact.newContact.deleteEmail",
			"5125": "sms.contact.newContact.deleteAddress",
			"5126": "sms.contact.newContact.deleteMobile",
			
			"5200": "sms.records",
			"5201": "sms.records.batchDelete",
			"5202": "sms.records.refresh",
			"5203": "sms.records.singleSelect",
			"5204": "sms.records.multiSelect",
			"5205": "sms.records.selectAll",
			"5206": "sms.records.addContact",
			"5207": "sms.records.callPhone",
			"5208": "sms.records.delete",
			"5209": "sms.records.allCalls",
			"5210": "sms.records.missedCalls",

			/***********app****************/
			"6000": "app",
			"6001": "app.phoneApp",
			"6002": "app.phoneApp.install",
			"6003": "app.phoneApp.download",
			"6004": "app.phoneApp.refresh",
			"6005": "app.online",
			"6006": "app.online.install",
			
			/*************file******************/
			"7000": "file",
			"7001":	"file.upload",
			"7002": "file.download",
			"7003": "file.refresh",
			"7004": "file.new",
			"7005": "file.reName",
			"7006": "file.cut",
			"7007": "file.copy",
			"7008": "file.paste",
			"7009": "file.delete",
			"7010": "file.search",
			"7011": "file.fileSort",
			"7012": "file.fileSort.newFile",
			"7013": "file.fileSort.bigFile",
			"7014": "file.fileSort.RAR",
			"7015": "file.fileSort.installFile",
			"7016": "file.SDCard",
			
			
			
			"": ""
	}
	
	var Config = {
			Runtime:{
				imei: "unknow",
				isDirect: false,											// 记录当前模块、当前操作(home/imgModule/musicModule/docModule)
				isDirectChannel:false,
				directChannelURL:undefined,
				curOperation: 'show',
				channelURL: '',
				channelstatus: "channel未连接",
				fileType: 'home',
				subModule: 'sms',
				uploadType:"image",
				channelV: "weline",
				isWepai: false
			},
			Config:{
				minWidth: '862',
				minHeight: '650',
				version: '1.0',
				baseUrl: services.baseurl,//(window.location.origin != undefined ? window.location.origin : (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port: ""))) + (window.location.pathname != undefined ? window.location.pathname : ""),
				directUpload:null
			},
			Module:{},
			map : map,
			extMap : Map,
			limitSize:10*1024*1024,
			imgReady:imgReady,
			downLoad:{},
			lang:'',
			loadBase64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY3jy5AkABVwCrcUBMd4AAAAASUVORK5CYII=",
			beha:beha,
			music:musicType,
			block:null,
			vMap:vMap,
			uploadpath:""
	}
	return Config;
});
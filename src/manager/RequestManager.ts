module manager {
	export class RequestManager {
		/**检测成功**/
		public static REQUEST_SUCC:number = 1;
		/**检测失败**/
		public static REQUEST_ERROR:number = 2;
		/**检测超时**/
		public static REQUEST_TIMEOUT:number = 3;
		
		private static _instance:RequestManager;
		private timer;
		private webURL:string = null;
		private interval:number = 5000;
		private timeOutInterval:number = 5000;
		private loader;
		private callBackDict = {};
		private timeOutTimer;
		private isNeedRandom:Boolean = false;
		private webpages = ["html","htm","php","jsp"];
		
		public constructor() {
		}
		
		public static get instance():RequestManager
		{
			if(RequestManager._instance==null){
				RequestManager._instance = new RequestManager();
			}
			return RequestManager._instance;
		}
		/**
		 * 初始化
		 * @param url 设置需要验证的网络地址
		 * @param requestInterval 请求间隔
		 * @param timeOutInterval 请求超时
		 */		
		public init(url:string,requestInterval:number=5000,timeOutInterval:number=5000):void
		{
			/*stop();
			this.webURL = url;
			isNeedRandom = false;
			this.timeOutInterval = timeOutInterval;
			if(interval!=requestInterval)
			{
				interval = requestInterval;
				if(timer)timer.delay = interval;
			}
			if(this.webURL)
			{
				var index:number = this.webURL.lastIndexOf(".");
				if(index>-1)
				{
					var fileFormat:string = this.webURL.substring(index+1,index+7);
					var isFinded:Boolean = false;
					for (var i:number = 0; i < webpages.length; i++) 
					{
						if(fileFormat.indexOf(webpages[i])!=-1)
						{
							/// 在网页列表中找到网页格式
							isFinded = true;
							break;
						}
					}
					if(isFinded==false)isNeedRandom = true;
				}
			}*/
		}
		/**
		 * 设置请求结果回调
		 * @param label
		 * @param fun(code:number)  code用于判断请求返回的结果
		 */		
		public addRequestCallBack(label,fun:Function):void
		{
			/*if(!callBackDict[label])callBackDict[label] = [];
			var funs:Array = callBackDict[label];
			if(funs.indexOf(fun)==-1)funs.push(fun);*/
		}
		/**
		 * 删除请求结果回调
		 * @param label
		 * @param fun
		 */		
		public removeRequestCallBack(label,fun:Function=null):void
		{
			/*if(!callBackDict[label])return;
			if(fun==null)delete callBackDict[label];
			else
			{
				var funs:Array = callBackDict[label];
				var index:number = funs.indexOf(fun);
				if(index>-1)funs.splice(index,1);
			}*/
		}
		/**
		 * 启动检测
		 */		
		public start():void
		{
			/*if(timer==null)
			{
				timer = JTimer.getTimer(interval);
				timer.addTimerCallback(onRequestWebURL);
				timer.name = "RequestManagerTimer";
			}
			timer.running==false&&timer.start();*/
		}
		/**
		 * 停止检测 
		 */		
		public stop():void
		{
			/*timer&&timer.running&&timer.stop();
			stopTimeOutTimer();*/
		}
		private onRequestWebURL():void
		{
			/*if(loader==null)
			{
				loader = new URLLoader();
				loader.addEventListener(IOErrorEvent.IO_ERROR,onLoadError);
				loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR,onLoadError);
				loader.addEventListener(ProgressEvent.PROGRESS,onProgress);
				loader.addEventListener(Event.COMPLETE,onLoaderComplete);
			}
			stop();// 先停止定时检测
			var tempURL:string = isNeedRandom?(webURL+"?"+new Date().time):webURL;
			loader.load(new URLRequest(tempURL));
			startTimeOutTimer();*/
		}
		private onLoadError(evt:Event):void
		{
			/*start();// 重新检测
			stopTimeOutTimer();
			excuteRequestCallBack(REQUEST_ERROR);*/
		}
		private onProgress(evt:ProgressEvent):void
		{
			/*if(evt.bytesLoaded<evt.bytesTotal)
			{
				loader.close();
				onLoaderComplete(evt);
			}*/
		}
		private onLoaderComplete(evt:Event):void
		{
			/*start();// 重新检测
			stopTimeOutTimer();
			excuteRequestCallBack(REQUEST_SUCC);*/
		}
		private excuteRequestCallBack(code:number):void
		{
			/*for(var label:Object in callBackDict) 
			{
				var funs:Array = callBackDict[label];
				for (var i:number = 0; i < funs.length; i++) 
				{
					if(funs[i]!=null)
						funs[i](code);
				}
			}*/
		}
		private startTimeOutTimer():void
		{
			/*if(timeOutTimer==null)
			{
				timeOutTimer = JTimer.getTimer(timeOutInterval);
				timeOutTimer.addTimerCallback(onTimeOut);
				timeOutTimer.name = "RequestManagerTimeOutTimer";
			}
			timeOutTimer.delay = timeOutInterval;
			timeOutTimer.start();*/
		}
		private onTimeOut():void
		{
			/*start();// 重新检测
			stopTimeOutTimer();
			excuteRequestCallBack(REQUEST_TIMEOUT);*/
		}
		private stopTimeOutTimer():void
		{
			/*if(timeOutTimer&&timeOutTimer.running)
			{
				timeOutTimer.stop();
				timeOutTimer.reset();
			}*/
		}
	}
}
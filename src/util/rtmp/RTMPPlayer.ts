module util.rtmp {
	export class RTMPPlayer {
		private m_connection				:	NetConnection;					//连接对象
		private m_stream					:	NetStream;						//流数据管
		private m_video						:	egret.Video;							//视频容器
		private m_stageVideo				:	StageVideo;						//显卡视讯
		private m_sServer					:	string;							//服务路径
		private m_sStreamName				:	string;							//流数据名
		private m_sSharedSecuret			:	string;							//共享密钥
		private m_spParent					:	egret.Sprite;							//父类容器
		private m_bPause					:	Boolean;						//暂停状态
		private m_nBufferTime				:	Number;							//缓冲时间
		
		public fHideLoading					:	Function;						//隐藏加载
		public fShowLoading					:	Function;						//显示加载
		public fConnectFailed				:	Function;						//连接失败
		public fConnectSuccess				:	Function;						//连接成功
		public fTrace						:	Function;						//显示加载
	//	private	var m_timer						:	Timer;							//计时工具
		
		public uVideoWidth					:	number;							//视讯尺寸
		public uVideoHieght					:	number;							//视讯尺寸
		private m_iInitWidth				:	number;							//初始宽度
		private m_iInitHeight				:	number;							//初始高度
		
		private m_nVolume					:	Number = 1;						//視訊音量
		public bClear						:	Boolean;						//停止视讯时 是否清除最后的画面
		public iVideoConnectStatus			:	number = 0;						//視訊連線狀態
		
		private played						:	Boolean;						//播放状态
		
		/**視訊連線狀態*/
		public static iConnectClose			:	number		=	0;					//找步道串流視訊位置
		public static iStreamNotFound		:	number		=	1;					//找步道串流視訊位置
		public static iRejected				:	number		=	2;					//連線拒絕
		public static iVideoConnectFailed	:	number		=	3;					//視訊連接失敗
		public static iVideoPlayFailed		:	number		=	4;					//視訊播放失敗
		public static iVideoPlaySuccess		:	number		=	5;					//視訊播放成功
		
		private m_bStageVideoAvailable		:	Boolean;
		public stageVideoIndex				:	number;
		private m_stage						:	egret.Stage;
		
		public constructor(_stage:egret.Stage=null, _stageVideoIndex:number=-1, _bAvailability:boolean=false) {
			this.m_stage = _stage;
			this.stageVideoIndex = _stageVideoIndex;
			this.m_bStageVideoAvailable = _bAvailability;
//			if(m_stage && m_stage.hasEventListener(StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY)==false){
//				m_stage.addEventListener(StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY, onStageVideoState);
//			}
			
//			m_timer = new Timer(1000,1);
//			m_timer.addEventListener(TimerEvent.TIMER_COMPLETE, timerCompleteHandler);
		}
		
		public onStageVideoState(event:StageVideoAvailabilityEvent):void       
		{
			if(this.stageVideoIndex<0){
				return;
			}
			var _bStatus : Boolean = Boolean(event.availability == this.StageVideoAvailability.AVAILABLE);
			
			if(this.m_bStageVideoAvailable!=_bStatus){
				
				this.m_bStageVideoAvailable = _bStatus;
				
				//stage video 状态变化时，需要重新选择使用stagevideo还是video
				if(this.m_bStageVideoAvailable){
					//不可用变为可用，使用stagevideo
					this.destroyVideo();
					this.m_stageVideo = this.m_stage.stageVideos[this.stageVideoIndex];
//					if(m_stageVideo && m_stageVideo.hasEventListener(StageVideoEvent.RENDER_STATE)==false){
//						m_stageVideo.addEventListener(StageVideoEvent.RENDER_STATE, stageVideoStateChange);
//					}else{
//						stageVideoResize();
//					}
					console.log(this,"RTMPPlayer 变更StageVideo ：" + this.m_stage.stageVideos.length);
				}else{
					//可用变为不可用，使用video
					this.destroyStageVideo();
					this.destroyVideo();
					this.m_video= new egret.Video();
					this.m_video.smoothing = true;
					this.m_spParent.addChild(this.m_video);
					console.log(this,"RTMPPlayer 变更Video ：" +this.m_stage.stageVideos.length);
				}
				
				if(this.played){
					this.play(this.m_sServer, this.m_sStreamName, this.m_sSharedSecuret, this.m_nBufferTime);
				}
			}
		}

		
		public destroy():void{
//			if(m_timer){
//				m_timer.stop();
//				m_timer.removeEventListener(TimerEvent.TIMER_COMPLETE, timerCompleteHandler);
//				m_timer = null;
//			}
			if(this.m_connection){
				this.m_connection.close();
				this.m_connection.removeEventListener(NetStatusEvent.NET_STATUS, netConnectionStatusHandler);
				this.m_connection.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
				this.m_connection = null;
			}
			if(this.m_stream){
				this.m_stream.close();
				this.m_stream.removeEventListener(NetStatusEvent.NET_STATUS, netStreamStatusHandler);
				this.m_stream = null;
			}
			
			this.destroyVideo();
			this.destroyStageVideo();
			
			if(this.m_spParent){
				this.m_spParent = null;
			}
			
			if(this.fHideLoading != null){
				this.fHideLoading = null;
			}
			if(this.fShowLoading != null){
				this.fShowLoading = null;
			}
			
			if (this.fConnectSuccess!=null){
				this.fConnectSuccess=null;
			}
			if (this.fConnectFailed!=null){
				this.fConnectFailed=null;
			}
			if (this.fTrace!=null){
				this.fTrace=null;
			}
			this.m_stage = null;
		}
		
		private destroyVideo():void{
			if(this.m_video){
				this.m_spParent.removeChild(this.m_video);
				this.m_video = null;
			}
		}
		private destroyStageVideo():void{
			if(this.m_stageVideo){
//				m_stageVideo.removeEventListener(StageVideoEvent.RENDER_STATE, stageVideoStateChange);
				this.m_stageVideo = null;
			}
		}
		
		get connected():boolean{
			if(this.m_connection){
				return this.m_connection.connected
			}
			return false;
		}
		
		
		/**
		 *设置stageVideoIndex 
		 * @param index
		 * 
		 */
		public setVideoIndex(index:number):void{
			this.stageVideoIndex = index;
			if(index<0 || this.m_bStageVideoAvailable==false) {
				return;
			}
			
			if (this.stageVideoIndex>-1 && this.m_bStageVideoAvailable && this.m_stageVideo != this.m_stage.stageVideos[this.stageVideoIndex]){
				this.m_stageVideo = this.m_stage.stageVideos[this.stageVideoIndex];
			}
		}
		
		
		
		/**
		 * 
		 * @param _sServer			服务路径
		 * @param _sTream			流数据名
		 * @param _sTea				共享密钥
		 * @param _nBufferTime		缓冲时间
		 * 
		 */		
		public play(_sServer:String, _sStreamName:String, _sTea:String, _nBufferTime:Number=0.1):void{
//			console.log("|--->>播放视频号："+stageVideoIndex)
			this.played = true;
			if(this.m_bPause){
				if(this.m_stream){
					this.m_stream.resume();
				}
			}else{
				this.m_sServer = _sServer;
				this.m_sStreamName = _sStreamName;
				this.m_sSharedSecuret = _sTea;
				this.m_nBufferTime = _nBufferTime;
				this.m_connection.connect(this.m_sServer);
			}
		}
		public stop():void{
			this.played = false;
			if(this.m_stream){
				this.m_stream.close();
				this.m_bPause = false;
				if (this.bClear){
					if(this.m_video){
						this.m_video.clear();
					}
					
				}
			}
			if(this.m_stageVideo){
//				console.log("|---停止播放视频号："+stageVideoIndex+" port:"+m_stageVideo.viewPort)
			}
			
			if (this.m_connection){
				this.m_connection.close();
			}
		}
		public pause():void{
			this.played = false;
			if(this.m_stream){
				this.m_bPause = true;
				this.m_stream.pause();
			}
		}
		public resize(_uWidth:number, _uHeight:number):void{
			
			var _w : number;
			var _h : number;
			
			if((this.uVideoWidth/this.uVideoHieght)>(_uWidth/_uHeight)){
				_w = _uWidth;
				_h = <number>(this.uVideoHieght * _uWidth / this.uVideoWidth);
			}else if((this.uVideoWidth/this.uVideoHieght)<(_uWidth/_uHeight)){
				_h = _uHeight;
				_w = <number>( this.uVideoWidth * _uHeight / this.uVideoHieght );
			}else{
				_w = _uWidth;
				_h = _uHeight;
			}
			if(this.m_video){
				this.m_video.width = _w;
				this.m_video.height = _h;
			}
			
		}
		public resizeAlignCenter(_uWidth:number, _uHeight:number):void{
			if(this.m_iInitWidth<this.m_iInitHeight){
				if(this.m_video){
					this.m_video.x = <number>((this.m_iInitWidth-this.m_video.width) * 0.5);
				}
				if(this.m_stageVideo){
					this.m_stageVideo.pan = new egret.Point(<number>((this.m_iInitWidth-_uWidth) * 0.5));
				}
			}else{
				if(this.m_video){
					this.m_video.y = <number>((this.m_iInitHeight - _uHeight) * 0.5);
				}
				if(this.m_stageVideo){
					this.m_stageVideo.pan = new egret.Point(0, <number>((this.m_iInitHeight - _uHeight) * 0.5));
				}
			}
		}
		public initialize(_parent:egret.Sprite, _iInitWidth:number, _iInitHeight:number):void{
			this.m_spParent = _parent;
			this.m_iInitWidth = _iInitWidth;
			this.m_iInitHeight = _iInitHeight;
			
			if(this.m_spParent==null){
			//	console.log(this,"-- player init error! --");
				return;
			}
			if(this.m_connection==null){
				this.m_connection = new NetConnection();
				this.m_connection.addEventListener(NetStatusEvent.NET_STATUS, netConnectionStatusHandler);
				this.m_connection.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			}
			if(this.m_bStageVideoAvailable==false){
			//	console.log(this,"RTMPPlayer Video 初始 ");
				this.m_video = new egret.Video();
				this.m_video.smoothing = true;
				this.m_spParent.addChild(this.m_video);
			}else if(this.stageVideoIndex>-1){
			//	console.log(this,"RTMPPlayer StageVideo初始 " +m_stage.stageVideos.length);
				this.m_stageVideo = this.m_stage.stageVideos[this.stageVideoIndex];
//				if(m_stageVideo && m_stageVideo.hasEventListener(StageVideoEvent.RENDER_STATE)==false){
//					m_stageVideo.addEventListener(StageVideoEvent.RENDER_STATE, stageVideoStateChange);
//				}else{
//					stageVideoResize();
//				}
			}
			
		}
		private stageVideoStateChange(event:StageVideoEvent):void       
		{          
			var status:String = event.status;       
		//	console.log("stageVideoStateChange:------------------",status);
			this.stageVideoResize();       
		}
		
		public stageVideoResize():void       
		{
			if(this.m_spParent==null){
				return;
			}
			if(this.m_stageVideo){
				var point : egret.Point = this.m_spParent.parent.localToGlobal(new egret.Point(this.m_spParent.x, this.m_spParent.y));
				this.m_stageVideo.viewPort = new egret.Rectangle(point.x<0?0:point.x,point.y<0?0:point.y, this.m_spParent.width, this.m_spParent.height);
	//			console.log(this,"setm_stageVideo.viewPort:w:"+m_spParent.width+" >> h:" + m_spParent.height);
			}
		}
		
		public setStageVideo(_x:number, _y:number, _w:number, _h:number):void{
			if(this.m_stageVideo){
				this.m_stageVideo.viewPort = new egret.Rectangle(_x, _y, _w, _h);      
		//		console.log(this,"setm_stageVideo.viewPort:w:"+_w+" >> h:" + _h);
			}
		}
		
		public setZoom(_point:egret.Point):void{
			if(this.m_stageVideo){
				this.m_stageVideo.zoom = _point;
			}
		}
		
		public setPan(_point:egret.Point):void{
			if(this.m_stageVideo){
				this.m_stageVideo.pan = _point;
			}
		}
		
		
		
		get video():egret.Video
		{
			return this.m_video;
		}
		
		set video(value:egret.Video)
		{
			this.m_video = value;
		}
		
		
		public zoomIn():void{
			this.m_video.scaleX=2;
			this.m_video.scaleY=2;
		}
		
		public zoomOut():void{
			this.m_video.scaleX=1;
			this.m_video.scaleY=1;
		}
		
		
		
		get iMaxBytePerSecond():number{
			if( this.m_connection && this.m_connection.connected ){
				if(this.m_stream && this.m_stream.info){
					return Math.round(this.m_stream.info.maxBytesPerSecond  / 1024);
				}
			}
			return 0;
		}
		
		/**
		 * 清除視頻畫面
		 */
		public clearVideoFull():void {
			if( this.m_video ){
				this.m_video.clear();
			}
		}
		
		protected netStreamStatusHandler(evt:NetStatusEvent):void{
//			console.log(this,"netStreamStatusHandler_evt.info.code_"+evt.info.code);
			if(this.fconsole.log != null){
				this.fconsole.log(evt.info.code);
			}
			switch(evt.info.code){
				case "NetStream.Play.StreamNotFound":
					this.played = false;
//					console.log("StageVideo:"+stageVideoIndex+"  "+evt.info.code);
//					console.log("Stream not found: " + m_sServer+m_sStream);
//					console.log(this,"Stream not found: " + m_sServer + "/"+m_sStream);
					if(this.fConnectFailed!=null){
						this.fConnectFailed(RTMPPlayer.iStreamNotFound);
					}
					this.iVideoConnectStatus = RTMPPlayer.iStreamNotFound;
					break;
				case "NetStream.Play.Start":
//					console.log("StageVideo:"+stageVideoIndex+"  "+evt.info.code);
//					console.log("开始播放视频号："+stageVideoIndex)
					if(this.fConnectSuccess!=null){
						this.fConnectSuccess();
					}
					break;
				case "NetStream.Play.Reset":
//					console.log("StageVideo:"+stageVideoIndex+"  "+evt.info.code);
					break;
				case "NetStream.Play.Stop":
//					console.log("StageVideo:"+stageVideoIndex+"  "+evt.info.code);
					break;
				case "NetStream.Pause.Notify":
					break;
				case "NetStream.Buffer.Empty":
//					m_timer.start();
					break;
				case "NetStream.Buffer.Full":
//					m_timer.stop();
//					m_timer.reset();
					if(this.fHideLoading != null){
						this.fHideLoading();
					}
					this.iVideoConnectStatus = RTMPPlayer.iVideoPlaySuccess;
					break;
				
				case "NetStream.Play.Failed":
//					console.log("StageVideo:"+stageVideoIndex+"  "+evt.info.code);
					this.played = false;
					if(this.fConnectFailed!=null){
						this.fConnectFailed(RTMPPlayer.iVideoPlayFailed);
					}
					this.iVideoConnectStatus = RTMPPlayer.iVideoPlayFailed;
					break;
			}
		}
		protected netConnectionStatusHandler(evt:NetStatusEvent):void
		{
			if(this.fconsole.log != null){
				this.fconsole.log(evt.info.code);
			}
			console.log(this,"netConnectionStatusHandler_evt.info.code_"+evt.info.code);
//			console.log("视讯连接-"+stageVideoIndex+"  "+evt.info.code);
			switch(evt.info.code){
				case "NetConnection.Connect.Success":
//					console.log(this,"NetConnection.Connect.Success	"+m_sServer);
					
					if (evt.info.secureToken != undefined) {
//						console.log("sss::"+evt.info.secureToken);
						var sTea:String = TEA.decrypt(evt.info.secureToken, this.m_sSharedSecuret);
						this.m_connection.call("secureTokenResponse", null, sTea);
					}
					if(this. m_connection ){
						this.connectStream();
					}
					if(this.fConnectSuccess!=null){
						this.fConnectSuccess();
					}
					break;
				
				case "NetConnection.Connect.Rejected":
					
					if(this.fConnectFailed!=null){
						this.fConnectFailed(RTMPPlayer.iRejected);
					}
					this.iVideoConnectStatus = RTMPPlayer.iRejected;
					break;
				
				case "NetConnection.Connect.Closed":
//					console.log(this,"NetConnection.Connect.Closed");
					if(this.fConnectFailed!=null){
						this.fConnectFailed(RTMPPlayer.iConnectClose);
					}
					this.iVideoConnectStatus = RTMPPlayer.iConnectClose;
					break;
				
				case "NetConnection.Connect.Failed":
					if(this.fConnectFailed!=null){
						this.fConnectFailed(RTMPPlayer.iVideoConnectFailed);
					}
					this.iVideoConnectStatus = RTMPPlayer.iVideoConnectFailed;
					break;
				
				case "NetConnection.Connect.AppShutdown"://正在关闭指定的应用程序。
					break;
				
				case "NetConnection.Connect.InvalidApp"://连接时指定的应用程序名无效。
					break;
				
				case "NetConnection.Call.BadVersion"://不能识别的格式编码	
					break;
			}
		}
		
		protected securityErrorHandler(evt:Event):void
		{
			console.log(this,"securityErrorHandler: " + evt);
		}
		
		private connectStream():void {
			if(this.m_stream){
				this.m_stream.close();
				this.m_stream.removeEventListener(NetStatusEvent.NET_STATUS, netStreamStatusHandler);
				this.m_stream = null;
			}
			this.m_stream = new NetStream(this.m_connection);
			this.m_stream.addEventListener(NetStatusEvent.NET_STATUS, netStreamStatusHandler);
			var _oCustomClient : any = {};
			_oCustomClient.onMetaData = this.onMetaData;
			_oCustomClient.onCuePoint = this.onCuePoint;
			_oCustomClient.onPlayStatus = this.onPlayStatus;
			this.m_stream.client = _oCustomClient;
			if(this.m_bStageVideoAvailable){
				this.m_stageVideo.attachNetStream(this.m_stream);
//				console.log("连接成功播放视频号："+stageVideoIndex+" port:"+m_stageVideo.viewPort)
				
			}else{
				this.m_video.attachNetStream(this.m_stream);
			}
			this.m_stream.bufferTime = this.m_nBufferTime;
			this.m_stream.play(this.m_sStreamName);
			this.setVolume( this.m_nVolume );
//			m_spParent.addChild(m_video);
		}
		
		private onMetaData(info):void { 
		//	console.log("metadata: duration=" + info.duration + " width=" + info.width + " height=" + info.height + " framerate=" + info.framerate);
			this.uVideoWidth = info.width;
			this.uVideoHieght = info.height;
//			resize(info.width, info.height);
		}
		private onCuePoint(info):void {
			console.log("cuepoint: time=" + info.time + " name=" + info.name + " type=" + info.type);
		}
		private onPlayStatus(info):void{
			console.log("onPlayStatus", info);
		}
		
		protected timerCompleteHandler(event:egret.TimerEvent):void
		{
			if(this.fShowLoading != null){
				this.fShowLoading();
			}
		}
		
		public setVolume( vol:Number , panning:Number = 0):void {
			this.m_nVolume = vol;
//			console.log(this,"准备设置现场声音音量。。。"+ String(m_nVolume) + "this.video.name:" +this.video.name);
			if( this.m_stream ){
				if( this.m_connection &&  this.m_connection.connected ){
					this.m_stream.soundTransform = new SoundTransform(vol , panning );
				//	console.log(this,"音量："+String(vol));
				}
			}	
		}
		
	}
}
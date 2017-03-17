module lobby.view.lives {
	export class LiveVideoGame extends BLiveVideo{
		protected var m_mcVideo			:	MovieClip;							//视讯容器
		protected var m_btnTextClose	:	TextButton;							//关闭按钮
		protected var m_loading			:	MovieClip;							//加载图标
		public 	var mcAsset				:	MovieClip;
		protected var m_tfWarn			:	TextField;							//连接失效文本
		protected var m_format			:	TextFormat;
		protected var m_parent			:	MovieClip;							//父类容器
		
		public	var sServer				:	String;
		public var uX				:	uint=0;
		public var uY				:	uint=0;
		public 	var uWidth				:	uint;
		public 	var uHeight				:	uint;
		public	var sFailedConnectType	:	String;
		public var centerPoint			:  Point;								//文本 loading位置
		public var fontSize				:   int =18;
		public var channelX				:  int = 0;						//频道选择偏移X
		private var bisMachine			:	Boolean;
		public constructor(_uWidth:uint, _uHeight:uint, _uX:uint=0,_uY:uint=0,_isMachine:Boolean = false) {
			super();
			this.uWidth=_uWidth;
			this.uHeight = _uHeight;
			this.uX=_uX;
			this.uY=_uY;
			this.bisMachine = _isMachine;
			init();
		}
		protected function init():void{
			mcAsset = new MovieClip();
//			mcAsset.graphics.beginFill(0x333333);
//			mcAsset.graphics.drawRect(0, 0, uWidth, uHeight);
//			mcAsset.graphics.endFill();
			
			m_mcVideo = new MovieClip();
			m_mcVideo.mouseEnabled=m_mcVideo.mouseChildren=false;
			mcAsset.addChild(m_mcVideo);
			m_mcVideo.graphics.beginFill(0x000000,0.1);
			m_mcVideo.graphics.drawRect(0,0,uWidth,uHeight);
			m_mcVideo.graphics.endFill();
			initializeRTMPPlayer()
		}
		
		override public function destroy():void{
//			super.destroy();
			if(m_btnTextClose){
				mcAsset.removeChild(m_btnTextClose);
				m_btnTextClose.destroy();
				m_btnTextClose = null;
			}
			
			if(m_loading){
				m_loading.stop();
				if(m_loading.parent){
					m_loading.parent.removeChild(m_loading);
				}
				m_loading = null;
			}
			
			
			if(m_tfWarn){
				if(mcAsset){
					mcAsset.removeChild(m_tfWarn);
				}
				m_tfWarn = null;
			}
			
			if(m_rtmpPlayer){
				LobbyData.getInstance().removeRtmpPlayer(m_rtmpPlayer);
				
				m_rtmpPlayer.destroy();
				m_rtmpPlayer = null;
			}
			
			if(m_mcVideo){
				mcAsset.removeChild(m_mcVideo);
				m_mcVideo = null;
			}
			if(centerPoint){
				centerPoint=null;
			}
			mcAsset=null;
			
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
		}
		
		public function setup(_server:String,_steams:Array):void{
			this.sServer = _server;
		}
		
		public function setupServer(_server:String,_steamApp:String):void{
			this.sServer = _server;
			this.m_sStream = _steamApp;
		}
		
		public function initializeRTMPPlayer():void{
			m_rtmpPlayer = new RTMPPlayer(LobbyManager.getInstance().stage, 0, LobbyManager.getInstance().bStageVideoAvailable);
			LobbyData.getInstance().addRtmpPlayer(m_rtmpPlayer);
			m_rtmpPlayer.initialize( m_mcVideo, uWidth, uHeight);
			
			m_rtmpPlayer.fHideLoading = hideLoding; 
			m_rtmpPlayer.fConnectFailed = connectFailed;
			
			
			
			m_rtmpPlayer.resize(uWidth,uHeight);
			var _bStatus : Boolean = SharedObjectManager.getLiveOnOff();
			m_rtmpPlayer.setVolume(_bStatus?SharedObjectManager.getLiveVolume():0);
			
			m_loading = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"LoadingLiveAsset");
			
			
			m_rtmpPlayer.fConnectSuccess = function():void{
				if(m_tfWarn){
					m_tfWarn.visible = false;
				}
				LobbyManager.getInstance().hideChannel();
				
				uCount = 0;
				if(bisMachine){
					m_rtmpPlayer.setStageVideo(uX,uY,uWidth,uHeight);
					setTimeout(function():void{
						m_rtmpPlayer.resize(uWidth,uHeight);
					},5);
				}else{
					m_rtmpPlayer.setStageVideo(uX,uY,uWidth,uHeight);
				}
			};
		
		}
		
		
		
		
//		public function get curStream():String{
//			return streams[iStreamIndex];
//		}
		
		public function play():void{
			if(m_loading.parent==null){
				mcAsset.addChild(m_loading);
				
			}
			setLoadingPosition();
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
			showLoading();
			clearView();
			if(sServer!=null && m_sStream!=null && sServer!="" && m_sStream!=""){
				hash(sServer, m_sStream);
			//	Log.getInstance().log(this,"播放游戏视讯:"+sServer+"/"+m_sStream);
			//	trace("游戏视频地址"+sServer+"/"+m_sStream)
				m_rtmpPlayer.play(sServer, m_sHash, m_sSharedSecuret);
			}
			sFailedConnectType = null;
			TimeManager.getInstance().addFun(loadVideoTimeOut,5000);
			m_rtmpPlayer.iVideoConnectStatus = 0;
		}
		

		
		public function stop():void{
			if(m_rtmpPlayer){
				m_rtmpPlayer.stop();
				hideLoding();
			}
		
		}
		
		
		override public function refresh():void{
			stop();
			play();
		}
		/**
		 * 清除視頻畫面
		 */
		public function clearVideoFull():void {
			m_rtmpPlayer.clearVideoFull();
		}
		
		
		public function showLoading():void{
			if(m_loading){
				m_loading.gotoAndPlay(1);
				m_loading.visible = true;
			}
			
			if(m_tfWarn){
				m_tfWarn.visible = false;
			}

		}
		
		protected function loadVideoTimeOut():void {
		//	Log.getInstance().log(this, "視訊連接狀態::視訊連接逾時");
			stop();
			sFailedConnectType = Language.sLiveError;
			initWorn();
			m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
			
			uCount++;
			if(uCount<3){
				play();
			}else{
//				var str:String = LobbyManager.getInstance().getLanguageString( Language.sLiveError );
//				LobbyManager.getInstance().showDialog_2(str,false,true);
				LobbyManager.getInstance().showChannel(true,channelX);
				m_tfWarn.visible = true;
			}
		}
		
		public function hideLoding():void{
			if(m_loading){
				m_loading.gotoAndStop(1);
				m_loading.visible = false;
			}
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
		}
		
		protected function initWorn():void {
			if(!m_tfWarn){
				m_tfWarn = new TextField();
				//m_tfWarn.width=400;
				m_tfWarn.selectable=false;
				m_tfWarn.mouseEnabled = false;
				m_tfWarn.multiline=true;
			//	m_tfWarn.width=250;
				if (m_format==null){
					m_format = new TextFormat("Arial",fontSize,0xFFFFFF);
					m_format.align=TextFormatAlign.CENTER;
					m_tfWarn.autoSize = TextFieldAutoSize.CENTER;
					m_tfWarn.defaultTextFormat=m_format;
				}
				
				if(mcAsset){
					mcAsset.addChild(m_tfWarn);
				}
				if (centerPoint){
					m_tfWarn.x = centerPoint.x;
					m_tfWarn.y = centerPoint.y;
				}else if( m_loading ){
					m_tfWarn.x = m_loading.x;
					m_tfWarn.y = m_loading.y;
				}
//				m_tfWarn.text="XXXXXXXXXX"
				m_tfWarn.visible = false;
			}
						
		}
		
	
		
		
		protected function connectFailed(_iType:int=1):void
		{
			hideLoding();
			initWorn();
			
		//	Log.getInstance().log(this, "視訊連接狀態::" + _iType);
			switch(_iType){
				case RTMPPlayer.iStreamNotFound:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
					sFailedConnectType = Language.sLiveError;
					break;
				case RTMPPlayer.iRejected:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
					sFailedConnectType = Language.sLiveError;
					break;
				case RTMPPlayer.iVideoConnectFailed:
				case RTMPPlayer.iVideoPlayFailed:
				case RTMPPlayer.iConnectClose:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString( Language.sLiveError );	
					sFailedConnectType = Language.sLiveError;
					break;
			}
			
//			var str:String = LobbyManager.getInstance().getLanguageString( Language.sLiveError );
//			LobbyManager.getInstance().showDialog_2(str,false,true);
			
			if(!m_tfWarn.visible){
				if(LobbyManager.getInstance().bClickResolution){
					LobbyManager.getInstance().bClickResolution = false;
				}else{
					m_tfWarn.visible = true;
					LobbyManager.getInstance().showChannel(false,channelX);
				}
			}
		}
		public function onChangeLanguage():void {
			if(m_tfWarn && sFailedConnectType){
				m_tfWarn.text = LobbyManager.getInstance().getLanguageString( sFailedConnectType );	
			}
			if(m_loading){
				m_loading.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sLiveVideo);
			}
		}
		
		
		
		public function resize( uWidth:uint ,uHeight:uint ):void {
			
//			if( mcAsset ){
//				mcAsset.graphics.clear();
//				mcAsset.graphics.beginFill(0x333333);
//				mcAsset.graphics.drawRect(0, 0, uWidth, uHeight);
//				mcAsset.graphics.endFill();	
//			}
			
			m_rtmpPlayer.uVideoWidth = 0;
			m_rtmpPlayer.uVideoHieght = 0;
			m_rtmpPlayer.resize( uWidth , uHeight );
			
			setLoadingPosition();
			
		}
		
		protected function setLoadingPosition():void{
			if(centerPoint){
				m_loading.x = centerPoint.x-50;
				m_loading.y = centerPoint.y-23;
			}else if(m_loading){
				m_loading.x = int(uWidth * 0.5 - 67);
				m_loading.y = int(uHeight * 0.5 - 47);
			}
			/*if (m_tfWarn){
				if (centerPoint){
					m_tfWarn.x = centerPoint.x;
					m_tfWarn.y = centerPoint.y;
				}else if( m_loading ){
					m_tfWarn.x = m_loading.x;
					m_tfWarn.y = m_loading.y;
				}
			}*/
			
		}
		
	}
}
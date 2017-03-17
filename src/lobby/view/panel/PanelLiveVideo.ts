module lobby.view.panel {
	export class PanelLiveVideo extends PanelWindow{
		private var m_bg				:	BitmapScale9Grid;
		private var m_rtmpPlayer		:	RTMPPlayer;							//播放视讯
//		private var m_mcVideo			:	MovieClip;							//视讯容器
		private var m_btnClose			:	SingleButtonMC;						//关闭按钮
		private var m_btnRefresh		:	SingleButtonMC;						//刷新按钮
		private var m_loading			:	*;									//加载图标
		private var m_sSharedSecuret	:	String;								//共享密钥
		private var m_sStream			:	String;								//媒体名称
		private var m_tfWorn			:	TextField;							//连接失效
		private var m_nVolume			:	Number;								//音量
		
		private var m_sServer			:	String;								//传入参数
		private var m_sStreamName		:	String;								//传入参数
		private var sFailedConnectType	:	String;
		
		private var uCount				:	uint;								//重连次数
		private var m_bPanoramaNull		:	Boolean		=	false;				//全景視訊數據為空
		
		public constructor( _uWidth:uint, _uHeight:uint ) {
		
			super();
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Live_Full_Asset");
//			m_mcAsset.graphics.beginFill(0x666666);
//			m_mcAsset.graphics.drawRect(0, 0, _uWidth, _uHeight);
//			m_mcAsset.graphics.endFill();
			this.addChild(m_mcAsset);
			
			m_bg = new BitmapScale9Grid(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Window_Bg_Asset")as BitmapData , 1, 12, 24, 12, 30);
			m_mcAsset.addChildAt(m_bg,0);
			m_bg.setSize(1300, 790);
			m_bg.x = -650;
			m_bg.y = -390;
			
			nAssetWidth = 1298;
			nAssetHeight = 776;
			
//			m_mcVideo = new MovieClip();
//			m_mcAsset.addChild(m_mcVideo);
//			m_mcVideo.x = -640;
//			m_mcVideo.y = -335;
			
			m_mcHot = m_mcAsset.mc_hot;
//			m_mcAsset.addChild(m_mcHot);
//			m_mcHot.graphics.beginFill(0x000000);
//			m_mcHot.graphics.drawRect(2,2,_uWidth,20);
//			m_mcHot.graphics.endFill();
			
			m_btnClose = new SingleButtonMC(m_mcAsset.mc_close,function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hideLiveVideo();
			});
			
			m_btnRefresh = new SingleButtonMC( m_mcAsset.mc_refresh, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_rtmpPlayer.stop();
				play();
			});
			m_btnRefresh.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Refresh),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_refresh.x+15,m_mcAsset.mc_refresh.y+30)));
			};
			m_btnRefresh.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_nVolume = LobbyManager.getInstance().nLiveVolume;
			
			
			m_loading = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"LoadingLiveAsset");
			m_mcAsset.addChild(m_loading);
			m_loading.x = -67;//int( m_mcAsset.width * 0.5 - 67 );
			m_loading.y = -47;//int(m_mcAsset.height * 0.5 - 47);
			
			
			onChangeLanguage();
		}
		
		override public function destroy():void{
			
			if(m_bg){
				if(m_bg.parent){
					m_bg.parent.removeChild(m_bg);
				}
				m_bg.dispose();
				m_bg = null;
			}
			
			if(m_btnClose){
				m_btnClose.destroy();
				m_btnClose = null;
			}
			
			if(m_btnRefresh){
				m_btnRefresh.destroy();
				m_btnRefresh = null;
			}
			
			if(m_loading){
				m_mcAsset.removeChild(m_loading);
				m_loading = null;
			}
			
			if(m_tfWorn){
				if(m_tfWorn.parent){
					m_tfWorn.parent.removeChild(m_tfWorn);
				}
				m_tfWorn = null;
			}
			
			if(m_rtmpPlayer){
				m_rtmpPlayer.destroy();
				m_rtmpPlayer = null;
			}
			
//			if(m_mcVideo){
//				m_mcAsset.removeChild(m_mcVideo);
//				m_mcVideo = null;
//			}
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
			super.destroy();
		}
		
		public function initializeRTMPPlayer(_sServer:String="rtmp://192.168.201.211:1935/live_v2_origin", _sStream:String="tb025@1280x720"):void{
			m_rtmpPlayer = new RTMPPlayer();
			m_rtmpPlayer.initialize( m_mcAsset.mc_0, 1280, 720);
			m_rtmpPlayer.resize(1280,720);
			m_rtmpPlayer.resizeAlignCenter(1280, 720);
			m_rtmpPlayer.fHideLoading = hideLoding; 
			m_rtmpPlayer.fConnectFailed = connectFailed;
			var _bStatus : Boolean = SharedObjectManager.getLiveOnOff();
			m_rtmpPlayer.setVolume(_bStatus?SharedObjectManager.getLiveVolume():0);
			
			m_rtmpPlayer.fConnectSuccess = function():void{
				uCount = 0;
			}
			m_sServer = _sServer;
			m_sStreamName = _sStream;
			play();
		}
		
		public function get iMaxBytePerSecond():int{
			return m_rtmpPlayer.iMaxBytePerSecond;
		}
		public function setData():void{
			//			LobbyData.getInstance().lobbyInfo.panoramaVec = new Vector.<PanoramaStruct>(); 測試代碼
			if( LobbyData.getInstance().lobbyInfo.panoramaVec.length > 0 ){
				var panoramaStruct : PanoramaStruct = LobbyData.getInstance().lobbyInfo.currentPanoramaStruct;
				if(panoramaStruct==null){
					notOpen();
					return;
				}
				//				panoramaStruct= LobbyData.getInstance().lobbyInfo.panoramaVec[0] as PanoramaStruct;
				if(panoramaStruct.StreamUrl.indexOf("rtmp://")==-1){
					m_sServer = "rtmp://" + panoramaStruct.StreamUrl + "/" + panoramaStruct.StreamAppName;
				}else{
					m_sServer = panoramaStruct.StreamUrl + "/" + panoramaStruct.StreamAppName;
				}
				m_sStreamName = panoramaStruct.StreamName;
				
//				m_loading.x = int(m_mcAsset.width*0.5 - 67);
//				m_loading.y = int(m_mcAsset.height*0.5 - 47);
				play();	
				m_bPanoramaNull = false;
			}
			else {//例外處裡
				notOpen();
			}
			
		}
		private function notOpen():void{
			if(!m_tfWorn){
				m_tfWorn = new TextField();
				m_tfWorn.autoSize = TextFieldAutoSize.LEFT;
				m_tfWorn.defaultTextFormat = new TextFormat(null,20,0xFFFFFF,true);
				if(m_loading && m_loading.parent){
					m_loading.parent.addChild(m_tfWorn);
				}
			}		
			m_tfWorn.text = LobbyManager.getInstance().getLanguageString( Language.sLiveVideoPanoramaDataError );	//全景視訊數據為空
			m_tfWorn.x = -int(m_tfWorn.width * 0.5);
			m_tfWorn.y = -int(m_tfWorn.height * 0.5);			
			hideLoding();
			m_bPanoramaNull = true;
		}
		private function play():void{
			
			if(m_sServer==null || m_sStreamName==null){
				notOpen();
				return;
			}
			
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
			showLoading();
			
			hash(m_sServer, m_sStreamName);
			
			m_rtmpPlayer.play(m_sServer, m_sStream, m_sSharedSecuret);
//			RTMPPlayer.getInstance().play(_txtServer.label.text, _txtStream.label.text, m_sSharedSecuret);
			sFailedConnectType = null;
			TimeManager.getInstance().addFun(loadVideoTimeOut,5000);	
			m_rtmpPlayer.iVideoConnectStatus = 0;					
		}
		
		protected function loadVideoTimeOut():void {
			Log.getInstance().log(this, "視訊連接狀態::視訊連接逾時");
			if( m_mcAsset ){
				hideLoding();
				stop();
				sFailedConnectType = Language.sVideoConnectFailed;
				initWorn();
				m_tfWorn.text = LobbyManager.getInstance().getLanguageString(  Language.sVideoConnectFailed );	
				setLoadingPostition();	
				m_tfWorn.visible = true;
			}
			
			uCount++;
			if(uCount<3){
				play();
			}
		}		
		
		private function hash(_sServer:String, _sStream:String):void{
			m_sSharedSecuret = "Aa123456Aa";	//stage.loaderInfo.parameters["sharedSecuret"];
			var _sParameterPrefix : String = "wowzatoken";	//stage.loaderInfo.parameters["parameterPrefix"];
			var _uEndtime : uint = 1544267500;			//stage.loaderInfo.parameters["endtime"];
			var _uStarttime : uint = 0;					//stage.loaderInfo.parameters["starttime"];
			var _sHash : String = _sServer.slice(_sServer.lastIndexOf("/")+1) + "/" + _sStream + "?" + m_sSharedSecuret + "&" + _sParameterPrefix + "endtime=" + String(_uEndtime) + "&" + _sParameterPrefix + "starttime=" + String(_uStarttime);
			var _SHA256 : SHA256 = new SHA256();
			var data : ByteArray = Hex.toArray(Hex.fromString(_sHash));
			var _sHashValue : ByteArray = _SHA256.hash(data);
			var _usableHash	:String	= Base64.encodeByteArray(_sHashValue);
			trace("base64.encode:",_usableHash);
			var _add : RegExp = /\+/g;
			var _slash : RegExp = /\//g;
			//RegExp /a/是要替换的字符，g全部有关字符串都将被替换 
			_usableHash = _usableHash.replace(_add, '-'); 
			trace('提示：+替换-之后的字符串为: ' + _usableHash); 
			_usableHash = _usableHash.replace(_slash, '_'); 
			trace('提示：\\替换_之后的字符串为: ' + _usableHash);
			m_sStream = _sStream+"?"+_sParameterPrefix+"endtime="+String(_uEndtime)+"&"+_sParameterPrefix+"starttime="+String(_uStarttime)+"&"+_sParameterPrefix+"hash="+_usableHash;
		}
		
		private function showLoading():void{
			
			if(m_loading){
				m_rtmpPlayer.clearVideoFull();
				m_loading.gotoAndPlay(1);
				m_loading.visible = true;
			}
			
			if(m_tfWorn){
				m_tfWorn.visible = false;
			}
		}
		private function hideLoding():void{
			if(m_loading){
				m_loading.gotoAndStop(1);
				m_loading.visible = false;
			}
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
		}
		
		protected function initWorn():void
		{
			if(!m_tfWorn && m_mcAsset){
				m_tfWorn = new TextField();
				m_tfWorn.autoSize = TextFieldAutoSize.LEFT;
				m_tfWorn.defaultTextFormat = new TextFormat(null,20,0xFFFFFF,true);
				m_mcAsset.mc_0.addChild(m_tfWorn);
				m_tfWorn.text = LobbyManager.getInstance().getLanguageString(Language.sVideoConnectFailed);
				if(m_loading){
					m_tfWorn.x = m_loading.x;
					m_tfWorn.y = m_loading.y;
				}
			}
		}			
		
		private function connectFailed(_iType:int=1):void
		{
			Log.getInstance().log(this, "視訊連接狀態::" + _iType);
			hideLoding();
			initWorn();
			if(m_mcAsset && m_mcAsset.mc_0){

				m_tfWorn.visible = true;
				
				switch(_iType){
					case RTMPPlayer.iStreamNotFound:
						m_tfWorn.text = LobbyManager.getInstance().getLanguageString(  Language.sVideoConnectFailed );	
						sFailedConnectType = Language.sVideoConnectFailed;
						break;
					case RTMPPlayer.iRejected:
						m_tfWorn.text = LobbyManager.getInstance().getLanguageString(  Language.sVideoConnectFailed );	
						sFailedConnectType = Language.sVideoConnectFailed;
						break;
					case RTMPPlayer.iVideoConnectFailed:
					case RTMPPlayer.iVideoPlayFailed:
						m_tfWorn.text = LobbyManager.getInstance().getLanguageString( Language.sVideoConnectFailed );	
						sFailedConnectType = Language.sVideoConnectFailed;
						break;
				}
				
			}
			
			
			setLoadingPostition();					
			
		}
		
		/**
		 * 設置音量
		 */
		public function setVolume( _nVol:Number , _nPannging:Number = 0 ):void {
			if( m_rtmpPlayer ){
				m_rtmpPlayer.setVolume( _nVol  , _nPannging );
			}
		}
		
		
		override public function onChangeLanguage():void{
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);// LobbyManager.getInstance().getLanguageString(Language.sLive);
			
			if(m_loading){
				m_loading.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sLiveVideo);
			}
			if( m_tfWorn && sFailedConnectType ){
				m_tfWorn.text = LobbyManager.getInstance().getLanguageString( sFailedConnectType );	
			}
			
		}
		
		private function setLoadingPostition():void {
			if( m_tfWorn && m_tfWorn.parent ){
				m_tfWorn.x = (m_tfWorn.parent.width-m_tfWorn.width) >> 1;
				m_tfWorn.y = (m_tfWorn.parent.height-m_tfWorn.height) >> 1;	
			}
			
		}	
		public function stop():void{
			if(m_rtmpPlayer){
				m_rtmpPlayer.stop();
			}
		}		
		
	}
}
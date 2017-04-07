module lobby.view.panel {
	export class PanelLiveVideo extends PanelWindow{
		private m_bg				;
		private m_RTMPPlayer		:	util.rtmp.RTMPPlayer;							//播放视讯
//		private m_mcVideo			:	MovieClip;							//视讯容器
		private m_btnRefresh		:	ui.button.SingleButtonMC;						//刷新按钮
		private m_loading			;									//加载图标
		private m_sSharedSecuret	:	string;								//共享密钥
		private m_sStream			:	string;								//媒体名称
		private m_tfWorn			;							//连接失效
		private m_nVolume			:	number;								//音量
		
		private m_sServer			:	string;								//传入参数
		private m_sStreamName		:	string;								//传入参数
		private sFailedConnectType	:	string;
		
		private uCount				:	number;								//重连次数
		private m_bPanoramaNull		:	boolean		=	false;				//全景視訊數據為空
		
		public constructor( _uWidth:number, _uHeight:number ) {
		
			super();
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Live_Full_Asset");
//			this.m_mcAsset.graphics.beginFill(0x666666);
//			this.m_mcAsset.graphics.drawRect(0, 0, _uWidth, _uHeight);
//			this.m_mcAsset.graphics.endFill();
			this.addChild(this.m_mcAsset);
			
			this.m_bg = new BitmapScale9Grid(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Window_Bg_Asset") , 1, 12, 24, 12, 30);
			this.m_mcAsset.addChildAt(this.m_bg,0);
			this.m_bg.setSize(1300, 790);
			this.m_bg.x = -650;
			this.m_bg.y = -390;
			
			this.nAssetWidth = 1298;
			this.nAssetHeight = 776;
			
//			m_mcVideo = new MovieClip();
//			this.m_mcAsset.addChild(m_mcVideo);
//			m_mcVideo.x = -640;
//			m_mcVideo.y = -335;
			
			this.m_mcHot = this.m_mcAsset.mc_hot;
//			this.m_mcAsset.addChild(m_mcHot);
//			m_mcHot.graphics.beginFill(0x000000);
//			m_mcHot.graphics.drawRect(2,2,_uWidth,20);
//			m_mcHot.graphics.endFill();
			
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close,function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hideLiveVideo();
			});
			
			this.m_btnRefresh = new ui.button.SingleButtonMC( this.m_mcAsset.mc_refresh, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_RTMPPlayer.stop();
				this.play();
			});
			this.m_btnRefresh.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Refresh),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_refresh.x+15,this.m_mcAsset.mc_refresh.y+30)));
			};
			this.m_btnRefresh.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_nVolume = manager.LobbyManager.getInstance().nLiveVolume;
			
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
			this.m_mcAsset.addChild(this.m_loading);
			this.m_loading.x = -67;//int( this.m_mcAsset.width * 0.5 - 67 );
			this.m_loading.y = -47;//int(this.m_mcAsset.height * 0.5 - 47);
			
			
			this.onChangeLanguage();
		}
		
		 public destroy():void{
			if(this.m_bg){
				if(this.m_bg.parent){
					this.m_bg.parent.removeChild(this.m_bg);
				}
				this.m_bg.dispose();
				this.m_bg = null;
			}
			
			if(this.m_btnRefresh){
				this.m_btnRefresh.destroy();
				this.m_btnRefresh = null;
			}
			
			if(this.m_loading){
				this.m_mcAsset.removeChild(this.m_loading);
				this.m_loading = null;
			}
			
			if(this.m_tfWorn){
				if(this.m_tfWorn.parent){
					this.m_tfWorn.parent.removeChild(this.m_tfWorn);
				}
				this.m_tfWorn = null;
			}
			
			if(this.m_RTMPPlayer){
				this.m_RTMPPlayer.destroy();
				this.m_RTMPPlayer = null;
			}
			
//			if(m_mcVideo){
//				this.m_mcAsset.removeChild(m_mcVideo);
//				m_mcVideo = null;
//			}
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
			super.destroy();
		}
		
		public initializeRTMPPlayer(_sServer:string="rtmp://192.168.201.211:1935/live_v2_origin", _sStream:string="tb025@1280x720"):void{
			this.m_RTMPPlayer = new util.rtmp.RTMPPlayer();
			this.m_RTMPPlayer.initialize( this.m_mcAsset.mc_0, 1280, 720);
			this.m_RTMPPlayer.resize(1280,720);
			this.m_RTMPPlayer.resizeAlignCenter(1280, 720);
			this.m_RTMPPlayer.fHideLoading = this.hideLoding; 
			this.m_RTMPPlayer.fConnectFailed = this.connectFailed;
			var _bStatus :  boolean = manager.SharedObjectManager.getLiveOnOff();
			this.m_RTMPPlayer.setVolume(_bStatus?manager.SharedObjectManager.getLiveVolume():0);
			
			this.m_RTMPPlayer.fConnectSuccess = function():void{
				this.uCount = 0;
			}
			this.m_sServer = _sServer;
			this.m_sStreamName = _sStream;
			this.play();
		}
		
		get iMaxBytePerSecond():number{
			return this.m_RTMPPlayer.iMaxBytePerSecond;
		}
		public setData():void{
			//			model.LobbyData.getInstance().lobbyInfo.panoramaVec = new <PanoramaStruct>(); 測試代碼
			if( model.LobbyData.getInstance().lobbyInfo.panoramaVec.length > 0 ){
				var panoramaStruct  = model.LobbyData.getInstance().lobbyInfo.currentPanoramaStruct;
				if(panoramaStruct==null){
					this.notOpen();
					return;
				}
				//				panoramaStruct= model.LobbyData.getInstance().lobbyInfo.panoramaVec[0] as PanoramaStruct;
				if(panoramaStruct.StreamUrl.indexOf("rtmp://")==-1){
					this.m_sServer = "rtmp://" + panoramaStruct.StreamUrl + "/" + panoramaStruct.StreamAppName;
				}else{
					this.m_sServer = panoramaStruct.StreamUrl + "/" + panoramaStruct.StreamAppName;
				}
				this.m_sStreamName = panoramaStruct.StreamName;
				
//				this.m_loading.x = int(this.m_mcAsset.width*0.5 - 67);
//				this.m_loading.y = int(this.m_mcAsset.height*0.5 - 47);
				this.play();	
				this.m_bPanoramaNull = false;
			}
			else {//例外處裡
				this.notOpen();
			}
			
		}
		private notOpen():void{
			if(!this.m_tfWorn){
				this.m_tfWorn = new egret.TextField();
				// this.m_tfWorn.autoSize = TextFieldAutoSize.LEFT;
				// this.m_tfWorn.defaultTextFormat = new TextFormat(null,20,0xFFFFFF,true);
				if(this.m_loading && this.m_loading.parent){
					this.m_loading.parent.addChild(this.m_tfWorn);
				}
			}		
			this.m_tfWorn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveVideoPanoramaDataError );	//全景視訊數據為空
			this.m_tfWorn.x = -(this.m_tfWorn.width * 0.5);
			this.m_tfWorn.y = -(this.m_tfWorn.height * 0.5);			
			this.hideLoding();
			this.m_bPanoramaNull = true;
		}
		private play():void{
			
			if(this.m_sServer==null || this.m_sStreamName==null){
				this.notOpen();
				return;
			}
			
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
			this.showLoading();
			
			this.hash(this.m_sServer, this.m_sStreamName);
			
			this.m_RTMPPlayer.play(this.m_sServer, this.m_sStream, this.m_sSharedSecuret);
//			util.rtmp.RTMPPlayer.getInstance().play(_txtServer.label.text, _txtStream.label.text, this.m_sSharedSecuret);
			this.sFailedConnectType = null;
			manager.TimeManager.getInstance().addFun(this.loadVideoTimeOut,5000);	
			this.m_RTMPPlayer.iVideoConnectStatus = 0;					
		}
		
		protected loadVideoTimeOut():void {
			console.log(this, "視訊連接狀態::視訊連接逾時");
			if( this.m_mcAsset ){
				this.hideLoding();
				this.stop();
				this.sFailedConnectType = language.Language.sVideoConnectFailed;
				this.initWorn();
				this.m_tfWorn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sVideoConnectFailed );	
				this.setLoadingPostition();	
				this.m_tfWorn.visible = true;
			}
			
			this.uCount++;
			if(this.uCount<3){
				this.play();
			}
		}		
		
		private hash(_sServer:string, _sStream:string):void{
			this.m_sSharedSecuret = "Aa123456Aa";	//stage.loaderInfo.parameters["sharedSecuret"];
			var _sParameterPrefix : String = "wowzatoken";	//stage.loaderInfo.parameters["parameterPrefix"];
			var _uEndtime : number = 1544267500;			//stage.loaderInfo.parameters["endtime"];
			var _uStarttime : number = 0;					//stage.loaderInfo.parameters["starttime"];
			var _sHash : string = _sServer.slice(_sServer.lastIndexOf("/")+1) + "/" + _sStream + "?" + this.m_sSharedSecuret + "&" + _sParameterPrefix + "endtime=" + String(_uEndtime) + "&" + _sParameterPrefix + "starttime=" + String(_uStarttime);
			var _SHA256  = new util.SHA256();
			var data  = util.Hex.toArray(util.Hex.fromString(_sHash));
			var _sHashValue : egret.ByteArray = _SHA256.hash(data);
			var _usableHash	:string	= util.Base64.encodeByteArray(_sHashValue);
			console.log("base64.encode:",_usableHash);
			var _add : RegExp = /\+/g;
			var _slash : RegExp = /\//g;
			//RegExp /a/是要替换的字符，g全部有关字符串都将被替换 
			_usableHash = _usableHash.replace(_add, '-'); 
			console.log('提示：+替换-之后的字符串为: ' + _usableHash); 
			_usableHash = _usableHash.replace(_slash, '_'); 
			console.log('提示：\\替换_之后的字符串为: ' + _usableHash);
			this.m_sStream = _sStream+"?"+_sParameterPrefix+"endtime="+String(_uEndtime)+"&"+_sParameterPrefix+"starttime="+String(_uStarttime)+"&"+_sParameterPrefix+"hash="+_usableHash;
		}
		
		private showLoading():void{
			
			if(this.m_loading){
				this.m_RTMPPlayer.clearVideoFull();
				this.m_loading.gotoAndPlay(1);
				this.m_loading.visible = true;
			}
			
			if(this.m_tfWorn){
				this.m_tfWorn.visible = false;
			}
		}
		private hideLoding():void{
			if(this.m_loading){
				this.m_loading.gotoAndStop(1);
				this.m_loading.visible = false;
			}
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
		}
		
		protected initWorn():void
		{
			if(!this.m_tfWorn && this.m_mcAsset){
				this.m_tfWorn = new egret.TextField();
				// this.m_tfWorn.autoSize = TextFieldAutoSize.LEFT;
				// this.m_tfWorn.defaultTextFormat = new TextFormat(null,20,0xFFFFFF,true);
				this.m_mcAsset.mc_0.addChild(this.m_tfWorn);
				this.m_tfWorn.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sVideoConnectFailed);
				if(this.m_loading){
					this.m_tfWorn.x = this.m_loading.x;
					this.m_tfWorn.y = this.m_loading.y;
				}
			}
		}			
		
		private connectFailed(_iType:number=1):void
		{
			console.log(this, "視訊連接狀態::" + _iType);
			this.hideLoding();
			this.initWorn();
			if(this.m_mcAsset && this.m_mcAsset.mc_0){

				this.m_tfWorn.visible = true;
				
				switch(_iType){
					case util.rtmp.RTMPPlayer.iStreamNotFound:
						this.m_tfWorn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sVideoConnectFailed );	
						this.sFailedConnectType = language.Language.sVideoConnectFailed;
						break;
					case util.rtmp.RTMPPlayer.iRejected:
						this.m_tfWorn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sVideoConnectFailed );	
						this.sFailedConnectType = language.Language.sVideoConnectFailed;
						break;
					case util.rtmp.RTMPPlayer.iVideoConnectFailed:
					case util.rtmp.RTMPPlayer.iVideoPlayFailed:
						this.m_tfWorn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sVideoConnectFailed );	
						this.sFailedConnectType = language.Language.sVideoConnectFailed;
						break;
				}
				
			}
			
			
			this.setLoadingPostition();					
			
		}
		
		/**
		 * 設置音量
		 */
		public setVolume( _nVol:number , _nPannging:number = 0 ):void {
			if( this.m_RTMPPlayer ){
				this.m_RTMPPlayer.setVolume( _nVol  , _nPannging );
			}
		}
		
		
		 public onChangeLanguage():void{
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);// manager.LobbyManager.getInstance().getLanguageString(language.Language.sLive);
			
			if(this.m_loading){
				this.m_loading.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sLiveVideo);
			}
			if( this.m_tfWorn && this.sFailedConnectType ){
				this.m_tfWorn.text = manager.LobbyManager.getInstance().getLanguageString( this.sFailedConnectType );	
			}
			
		}
		
		private setLoadingPostition():void {
			if( this.m_tfWorn && this.m_tfWorn.parent ){
				this.m_tfWorn.x = (this.m_tfWorn.parent.width-this.m_tfWorn.width) >> 1;
				this.m_tfWorn.y = (this.m_tfWorn.parent.height-this.m_tfWorn.height) >> 1;	
			}
			
		}	
		public stop():void{
			if(this.m_RTMPPlayer){
				this.m_RTMPPlayer.stop();
			}
		}		
		
	}
}
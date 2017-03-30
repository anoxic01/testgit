module lobby.view.lives {
	export class LiveVideo extends BLiveVideo {

		private m_btnRefresh		:	SingleButtonMC;						//刷新视讯
		private m_btnFull			:	SingleButtonMC;						//放大视讯
		private m_btnOnOff			:	MovieClip;							//显示隐藏
		private m_loading;									//加载图标
		
		private m_bControl			:	 boolean		=	true;				//显示状态
		private m_parent			:	MovieClip;							//父类容器
		
		private m_tfWarn			:	TextField;							//连接失效
		public 	var bIsPlaying			:	 boolean		=	false;				//播放狀態
		
		private m_bPanoramaNull		:	 boolean		=	false;				//全景視訊數據為空
		public	var sFailedConnectType	:	String;
		public bAddToStage			:	 boolean;							//是否添加到舞台
		private m_bSetData			:	 boolean;							//是否读取到数据
		
		public constructor( _mcParent:MovieClip) {
			super();

			m_parent = _mcParent;
			
			m_loading = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"LoadingLiveAsset");
			m_parent.addChild(m_loading);
			
			
			m_btnRefresh = new SingleButtonMC( m_parent.getChildByName("mc_refresh")as MovieClip, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				TipManager.getInstance().hide();
				LobbyManager.getInstance().hideAllPanel();
				m_rtmpPlayer.stop();
				play();
			});
			m_btnRefresh.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Refresh),TipManager.UP,m_parent.localToGlobal(new Point(m_parent.mc_refresh.x+15,m_parent.mc_refresh.y+30)));
			};
			m_btnRefresh.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_btnFull = new SingleButtonMC( m_parent.getChildByName("mc_scale")as MovieClip, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sChangePage);
				TipManager.getInstance().hide();
				LobbyManager.getInstance().hideAllPanel();
				LobbyManager.getInstance().showLiveVideo( m_rtmpPlayer.uVideoWidth, m_rtmpPlayer.uVideoHieght, m_sServer, m_sStream );
			});
			m_btnFull.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Video_ZoomIn),TipManager.UP,m_parent.localToGlobal(new Point(m_parent.mc_scale.x+11,m_parent.mc_scale.y+20)),1);
			};
			m_btnFull.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_btnOnOff =  m_parent.getChildByName("mc_control")as MovieClip;
			m_btnOnOff.buttonMode = true;
			m_btnOnOff.addEventListener(MouseEvent.CLICK, showOrHideHandler);
			m_btnOnOff.visible = false;
			
			onChangeLanguage();
		}
		
		public onAddToStage():void{
			bAddToStage = true;
			
			m_rtmpPlayer = new RTMPPlayer(LobbyManager.getInstance().stage,0,LobbyManager.getInstance().bStageVideoAvailable);
//			m_rtmpPlayer = new RTMPPlayer();
			LobbyData.getInstance().addRtmpPlayer(m_rtmpPlayer);
			Log.getInstance().log(this,">>> m_parent.mc_video.width:"+m_parent.mc_video.width+"--- m_parent.mc_video.height:"+m_parent.mc_video.height);
			m_rtmpPlayer.initialize( m_parent.mc_video, m_parent.mc_video.width, m_parent.mc_video.height);
			m_rtmpPlayer.fHideLoading = hideLoding;
			m_rtmpPlayer.fConnectFailed = connectFailed;
			m_rtmpPlayer.resizeAlignCenter(m_parent.width, m_parent.height);
			m_rtmpPlayer.fConnectSuccess = function():void{
				if(m_tfWarn){
					m_tfWarn.visible = false;
				}
				uCount = 0;
				m_rtmpPlayer.setStageVideo(1494,46,426,240);
				setTimeout(function():void{
					m_rtmpPlayer.resize(426,240);
				},5);
			};
			
			if(m_bSetData){
				setData();
			}
		}
		
		 public destroy():void{
			
			if(m_tfWarn){
				if(m_tfWarn.parent){
					m_tfWarn.parent.removeChild(m_tfWarn);
				}
				m_tfWarn = null;
			}
			if(m_loading){
				if(m_loading.parent){
					m_loading.parent.removeChild(m_loading);
				}
				m_loading = null;
			}
			
			if(m_btnFull){
				m_btnFull.destroy();
				m_btnFull = null;
			}
			if(m_btnRefresh){
				m_btnRefresh.destroy();
				m_btnRefresh = null;
			}
			if(m_btnOnOff){
				m_btnOnOff.removeEventListener(MouseEvent.CLICK, showOrHideHandler);
				m_btnOnOff = null;
			}
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
			super.destroy();
		}
		
		public setData():void{
			m_bSetData = true;
			
			if(bAddToStage==false){
				return;
			}
//			LobbyData.getInstance().lobbyInfo.panoramaVec = new <PanoramaStruct>(); 測試代碼
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
				m_sStream = panoramaStruct.StreamName;
				
				m_loading.x = int(m_parent.width*0.5 - 67);
				m_loading.y = int(m_parent.height*0.5 - 47);
				play();	
				m_bPanoramaNull = false;
			}
			else {//例外處裡
				notOpen();
			}

		}
		
		public play():void{
			if(LobbyManager.getInstance().exitLevel!=Define.EXIT_LOBBY){
				return;
			}
			if(m_sServer==null || m_sStream==null){
				notOpen();
				return;
			}
			
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
			showLoading();
			
			hash(m_sServer, m_sStream);
			
			if(m_rtmpPlayer){
				m_rtmpPlayer.play(m_sServer, m_sHash, m_sSharedSecuret);
//				var _bStatus :  boolean = SharedObjectManager.getLiveOnOff();
				m_rtmpPlayer.setVolume(0);//(_bStatus?SharedObjectManager.getLiveVolume():0);
				m_rtmpPlayer.iVideoConnectStatus = 0;	
			}
			
//			RTMPPlayer.getInstance().play(_txtServer.label.text, _txtStream.label.text, m_sSharedSecuret);
			bIsPlaying = true;
			sFailedConnectType = null;
			TimeManager.getInstance().addFun(loadVideoTimeOut,5000);		
			
		}
		
		protected loadVideoTimeOut():void {
			Log.getInstance().log(this, "視訊連接狀態::視訊連接逾時");
			hideLoding();
			stop();
			sFailedConnectType = Language.sLiveError;
			initWorn();
			m_rtmpPlayer.iVideoConnectStatus = 0;
			setLoadingPostition();
			m_tfWarn.visible = true;
			
			uCount++;
			if(uCount<3){
				play();
			}
		}
		
		private notOpen():void{
			if(!m_tfWarn){
				m_tfWarn = new TextField();
				m_tfWarn.autoSize = TextFieldAutoSize.LEFT;
				m_tfWarn.defaultTextFormat = new TextFormat(null,18,0xFFFFFF,true);
				if(m_loading && m_loading.parent){
					m_loading.parent.addChild(m_tfWarn);
				}
			}		
			m_tfWarn.text = LobbyManager.getInstance().getLanguageString( Language.sLiveVideoPanoramaDataError );	//全景視訊數據為空
			m_tfWarn.x = (m_parent.width-m_tfWarn.width) >> 1;
			m_tfWarn.y = (m_parent.height-m_tfWarn.height) >> 1;			
			hideLoding();
			m_bPanoramaNull = true;
		}
		
		protected initWorn():void
		{
			if(!m_tfWarn){
				m_tfWarn = new TextField();
				m_tfWarn.autoSize = TextFieldAutoSize.CENTER;
				m_tfWarn.selectable=false;
				m_tfWarn.mouseEnabled = false;
				m_tfWarn.multiline=true;
				m_tfWarn.defaultTextFormat = new TextFormat(null,14,0xFFFFFF,null,null,null,null,null,TextFormatAlign.CENTER);
				if(m_loading && m_loading.parent){
					m_loading.parent.addChild(m_tfWarn);
				}
				m_tfWarn.text = LobbyManager.getInstance().getLanguageString(Language.sLiveVideo);
			}
		}
		
		public stop():void{
			if(m_rtmpPlayer){
				m_rtmpPlayer.stop();
			}
			bIsPlaying = false;
		}
		
		public onChangeLanguage():void{
			if(m_loading){
				m_loading.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sLiveVideo);
			}
			if( m_bPanoramaNull  && m_tfWarn ){
				m_tfWarn.text = LobbyManager.getInstance().getLanguageString( Language.sLiveVideoPanoramaDataError );	//全景視訊數據為空
				setLoadingPostition();
			}else if(m_tfWarn && sFailedConnectType){
				m_tfWarn.text = LobbyManager.getInstance().getLanguageString( sFailedConnectType );	
				setLoadingPostition();
			}			
		}
			
		private showLoading():void{
			m_loading.gotoAndPlay(1);
			m_loading.visible = true;
			clearView();
			if(m_tfWarn){
				m_tfWarn.visible = false;
			}
			
		}
		private hideLoding():void{
			m_loading.gotoAndStop(1);
			m_loading.visible = false;
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
		}
		
		private connectFailed(_iType:number=1):void
		{
			hideLoding();
			initWorn();
			m_tfWarn.visible = true;
			Log.getInstance().log(this, "視訊連接狀態::" + _iType);
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
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString( Language.sLiveError );	
					sFailedConnectType = Language.sLiveError;
					break;
			}			
			
			setLoadingPostition();	
			
		}
		
		
		private showOrHideHandler(evt:MouseEvent):void{
			
			if(m_bControl){
				m_rtmpPlayer.stop();
				LobbyManager.getInstance().lobbyView.advertisement.resize(m_parent.x+m_parent.width-35, 140);
				TweenLite.to(m_parent, Define.SPEED, {x:m_parent.x+m_parent.width-35});
//				TweenUtil.moveToX(m_parent,50,30,10,m_parent.x+m_parent.width-35,0.75);
			}else{
				play();
				LobbyManager.getInstance().lobbyView.advertisement.resize(m_parent.x-m_parent.width+35, 140);
				TweenLite.to(m_parent, Define.SPEED, {x:m_parent.x-m_parent.width+35});
//				TweenUtil.moveToX(m_parent,50,30,10,m_parent.x-m_parent.width+35,0.75);
			}
			
			m_bControl = !m_bControl;
			
		}
		
		private setLoadingPostition():void {
			if( m_tfWarn ){
				m_tfWarn.x = (426-m_tfWarn.width) >> 1//(m_parent.width-m_tfWorn.width) >> 1;
				m_tfWarn.y = (m_parent.height-m_tfWarn.height) >> 1;	
			}
		}
		
		
		public toGame():void{
			stop();
			
			if(m_rtmpPlayer){
				m_rtmpPlayer.setStageVideo(1494,-500,426,240);
			}
			
		}
		public toLobby():void{
			if(m_rtmpPlayer){
				m_rtmpPlayer.setStageVideo(1494,46,426,240);
			}
			play();
		}
		
	}
}
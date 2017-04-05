module lobby.view.lives {
	export class LiveVideo extends BLiveVideo {

		private m_btnRefresh		:	ui.button.SingleButtonMC;						//刷新视讯
		private m_btnFull			:	ui.button.SingleButtonMC;						//放大视讯
		private m_btnOnOff			;							//显示隐藏
		private m_loading;									//加载图标
		
		private m_bControl			:	boolean		=	true;				//显示状态
		private m_parent			;							//父类容器
		
		private m_tfWarn			:	egret.TextField;							//连接失效
		public 	bIsPlaying			:	boolean		=	false;				//播放狀態
		
		private m_bPanoramaNull		:	boolean		=	false;				//全景視訊數據為空
		public	sFailedConnectType	:	string;
		public bAddToStage			:	boolean;							//是否添加到舞台
		private m_bSetData			:	boolean;							//是否读取到数据
		
		public constructor( _mcParent:egret.MovieClip) {
			super();

			this.m_parent = _mcParent;
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
			this.m_parent.addChild(this.m_loading);
			
			
			this.m_btnRefresh = new ui.button.SingleButtonMC( this.m_parent.getChildByName("mc_refresh")as egret.MovieClip, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.TipManager.getInstance().hide();
				manager.LobbyManager.getInstance().hideAllPanel();
				this.m_RTMPPlayer.stop();
				this.play();
			});
			this.m_btnRefresh.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Refresh),manager.TipManager.UP,this.m_parent.localToGlobal(new egret.Point(this.m_parent.mc_refresh.x+15,this.m_parent.mc_refresh.y+30)));
			};
			this.m_btnRefresh.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_btnFull = new ui.button.SingleButtonMC( this.m_parent.getChildByName("mc_scale")as egret.MovieClip, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
				manager.TipManager.getInstance().hide();
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.LobbyManager.getInstance().showLiveVideo( this.m_RTMPPlayer.uVideoWidth, this.m_RTMPPlayer.uVideoHieght, this.m_sServer, this.m_sStream );
			});
			this.m_btnFull.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_ZoomIn),manager.TipManager.UP,this.m_parent.localToGlobal(new egret.Point(this.m_parent.mc_scale.x+11,this.m_parent.mc_scale.y+20)),1);
			};
			this.m_btnFull.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_btnOnOff =  this.m_parent.getChildByName("mc_control")as egret.MovieClip;
			this.m_btnOnOff.buttonMode = true;
			this.m_btnOnOff.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showOrHideHandler, this);
			this.m_btnOnOff.visible = false;
			
			this.onChangeLanguage();
		}
		
		public onAddToStage():void{
			this.bAddToStage = true;
			
			this.m_RTMPPlayer = new util.rtmp.RTMPPlayer(manager.LobbyManager.getInstance().stage,0,manager.LobbyManager.getInstance().bStageVideoAvailable);
//			this.m_RTMPPlayer = new util.rtmp.RTMPPlayer();
			model.LobbyData.getInstance().addRtmpPlayer(this.m_RTMPPlayer);
			console.log(this,">>> this.m_parent.mc_video.width:"+this.m_parent.mc_video.width+"--- this.m_parent.mc_video.height:"+this.m_parent.mc_video.height);
			this.m_RTMPPlayer.initialize( this.m_parent.mc_video, this.m_parent.mc_video.width, this.m_parent.mc_video.height);
			this.m_RTMPPlayer.fHideLoading = this.hideLoding;
			this.m_RTMPPlayer.fConnectFailed = this.connectFailed;
			this.m_RTMPPlayer.resizeAlignCenter(this.m_parent.width, this.m_parent.height);
			this.m_RTMPPlayer.fConnectSuccess = function():void{
				if(this.m_tfWarn){
					this.m_tfWarn.visible = false;
				}
				this.uCount = 0;
				this.m_RTMPPlayer.setStageVideo(1494,46,426,240);
				setTimeout(function():void{
					this.m_RTMPPlayer.resize(426,240);
				},5);
			};
			
			if(this.m_bSetData){
				this.setData();
			}
		}
		
		 public destroy():void{
			
			if(this.m_tfWarn){
				if(this.m_tfWarn.parent){
					this.m_tfWarn.parent.removeChild(this.m_tfWarn);
				}
				this.m_tfWarn = null;
			}
			if(this.m_loading){
				if(this.m_loading.parent){
					this.m_loading.parent.removeChild(this.m_loading);
				}
				this.m_loading = null;
			}
			
			if(this.m_btnFull){
				this.m_btnFull.destroy();
				this.m_btnFull = null;
			}
			if(this.m_btnRefresh){
				this.m_btnRefresh.destroy();
				this.m_btnRefresh = null;
			}
			if(this.m_btnOnOff){
				this.m_btnOnOff.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showOrHideHandler, this);
				this.m_btnOnOff = null;
			}
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
			super.destroy();
		}
		
		public setData():void{
			this.m_bSetData = true;
			
			if(this.bAddToStage==false){
				return;
			}
//			model.LobbyData.getInstance().lobbyInfo.panoramaVec = new <PanoramaStruct>(); 測試代碼
			if( model.LobbyData.getInstance().lobbyInfo.panoramaVec.length > 0 ){
				var panoramaStruct : model.struct.PanoramaStruct = model.LobbyData.getInstance().lobbyInfo.currentPanoramaStruct;
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
				this.m_sStream = panoramaStruct.StreamName;
				
				this.m_loading.x = <number>(this.m_parent.width*0.5 - 67);
				this.m_loading.y = <number>(this.m_parent.height*0.5 - 47);
				this.play();	
				this.m_bPanoramaNull = false;
			}
			else {//例外處裡
				this.notOpen();
			}

		}
		
		public play():void{
			if(manager.LobbyManager.getInstance().exitLevel!=define.Define.EXIT_LOBBY){
				return;
			}
			if(this.m_sServer==null || this.m_sStream==null){
				this.notOpen();
				return;
			}
			
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
			this.showLoading();
			
			this.hash(this.m_sServer, this.m_sStream);
			
			if(this.m_RTMPPlayer){
				this.m_RTMPPlayer.play(this.m_sServer, this.m_sHash, this.m_sSharedSecuret);
//				var _bStatus :  boolean = SharedObjectManager.getLiveOnOff();
				this.m_RTMPPlayer.setVolume(0);//(_bStatus?SharedObjectManager.getLiveVolume():0);
				this.m_RTMPPlayer.iVideoConnectStatus = 0;	
			}
			
//			util.rtmp.RTMPPlayer.getInstance().play(_txtServer.label.text, _txtStream.label.text, this.m_sSharedSecuret);
			this.bIsPlaying = true;
			this.sFailedConnectType = null;
			manager.TimeManager.getInstance().addFun(this.loadVideoTimeOut,5000);		
			
		}
		
		protected loadVideoTimeOut():void {
			console.log(this, "視訊連接狀態::視訊連接逾時");
			this.hideLoding();
			this.stop();
			this.sFailedConnectType = language.Language.sLiveError;
			this.initWorn();
			this.m_RTMPPlayer.iVideoConnectStatus = 0;
			this.setLoadingPostition();
			this.m_tfWarn.visible = true;
			
			this.uCount++;
			if(this.uCount<3){
				this.play();
			}
		}
		
		private notOpen():void{
			if(!this.m_tfWarn){
				this.m_tfWarn = new egret.TextField();
				// this.m_tfWarn.autoSize = TextFieldAutoSize.LEFT;
				// this.m_tfWarn.defaultTextFormat = new TextFormat(null,18,0xFFFFFF,true);
				if(this.m_loading && this.m_loading.parent){
					this.m_loading.parent.addChild(this.m_tfWarn);
				}
			}		
			this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveVideoPanoramaDataError );	//全景視訊數據為空
			this.m_tfWarn.x = (this.m_parent.width-this.m_tfWarn.width) >> 1;
			this.m_tfWarn.y = (this.m_parent.height-this.m_tfWarn.height) >> 1;			
			this.hideLoding();
			this.m_bPanoramaNull = true;
		}
		
		protected initWorn():void
		{
			if(!this.m_tfWarn){
				this.m_tfWarn = new egret.TextField();
				// this.m_tfWarn.autoSize = TextFieldAutoSize.CENTER;
				// this.m_tfWarn.selectable=false;
				this.m_tfWarn.touchEnabled = false;
				this.m_tfWarn.multiline=true;
				// this.m_tfWarn.defaultTextFormat = new TextFormat(null,14,0xFFFFFF,null,null,null,null,null,TextFormatAlign.CENTER);
				if(this.m_loading && this.m_loading.parent){
					this.m_loading.parent.addChild(this.m_tfWarn);
				}
				this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sLiveVideo);
			}
		}
		
		public stop():void{
			if(this.m_RTMPPlayer){
				this.m_RTMPPlayer.stop();
			}
			this.bIsPlaying = false;
		}
		
		public onChangeLanguage():void{
			if(this.m_loading){
				this.m_loading.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sLiveVideo);
			}
			if( this.m_bPanoramaNull  && this.m_tfWarn ){
				this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveVideoPanoramaDataError );	//全景視訊數據為空
				this.setLoadingPostition();
			}else if(this.m_tfWarn && this.sFailedConnectType){
				this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( this.sFailedConnectType );	
				this.setLoadingPostition();
			}			
		}
			
		private showLoading():void{
			this.m_loading.gotoAndPlay(1);
			this.m_loading.visible = true;
			this.clearView();
			if(this.m_tfWarn){
				this.m_tfWarn.visible = false;
			}
			
		}
		private hideLoding():void{
			this.m_loading.gotoAndStop(1);
			this.m_loading.visible = false;
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
		}
		
		private connectFailed(_iType:number=1):void
		{
			this.hideLoding();
			this.initWorn();
			this.m_tfWarn.visible = true;
			console.log(this, "視訊連接狀態::" + _iType);
			switch(_iType){
				case util.rtmp.RTMPPlayer.iStreamNotFound:
					this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sLiveError );	
					this.sFailedConnectType = language.Language.sLiveError;
					break;
				case util.rtmp.RTMPPlayer.iRejected:
					this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sLiveError );	
					this.sFailedConnectType = language.Language.sLiveError;
					break;
				case util.rtmp.RTMPPlayer.iVideoConnectFailed:
				case util.rtmp.RTMPPlayer.iVideoPlayFailed:
					this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveError );	
					this.sFailedConnectType = language.Language.sLiveError;
					break;
			}			
			
			this.setLoadingPostition();	
			
		}
		
		
		private showOrHideHandler(evt:MouseEvent):void{
			
			if(this.m_bControl){
				this.m_RTMPPlayer.stop();
				manager.LobbyManager.getInstance().lobbyView.advertisement.resize(this.m_parent.x+this.m_parent.width-35, 140);
				TweenLite.to(this.m_parent, define.Define.SPEED, {x:this.m_parent.x+this.m_parent.width-35});
//				TweenUtil.moveToX(this.m_parent,50,30,10,this.m_parent.x+this.m_parent.width-35,0.75);
			}else{
				this.play();
				manager.LobbyManager.getInstance().lobbyView.advertisement.resize(this.m_parent.x-this.m_parent.width+35, 140);
				TweenLite.to(this.m_parent, define.Define.SPEED, {x:this.m_parent.x-this.m_parent.width+35});
//				TweenUtil.moveToX(this.m_parent,50,30,10,this.m_parent.x-this.m_parent.width+35,0.75);
			}
			
			this.m_bControl = !this.m_bControl;
			
		}
		
		private setLoadingPostition():void {
			if( this.m_tfWarn ){
				this.m_tfWarn.x = (426-this.m_tfWarn.width) >> 1//(this.m_parent.width-m_tfWorn.width) >> 1;
				this.m_tfWarn.y = (this.m_parent.height-this.m_tfWarn.height) >> 1;	
			}
		}
		
		
		public toGame():void{
			this.stop();
			
			if(this.m_RTMPPlayer){
				this.m_RTMPPlayer.setStageVideo(1494,-500,426,240);
			}
			
		}
		public toLobby():void{
			if(this.m_RTMPPlayer){
				this.m_RTMPPlayer.setStageVideo(1494,46,426,240);
			}
			this.play();
		}
		
	}
}
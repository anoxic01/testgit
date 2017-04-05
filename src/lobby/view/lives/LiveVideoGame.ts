module lobby.view.lives {
	export class LiveVideoGame extends BLiveVideo{
		protected m_mcVideo			;							//视讯容器
		protected m_btnTextClose	;							//关闭按钮
		protected m_loading			;							//加载图标
		public 	mcAsset				;
		protected m_tfWarn			;							//连接失效文本
		protected m_format			;
		protected m_parent			;							//父类容器
		
		public sServer				:	string;
		public uX					:	number=0;
		public uY					:	number=0;
		public  uWidth				:	number;
		public  uHeight				:	number;
		public sFailedConnectType	:	string;
		public centerPoint			;								//文本 loading位置
		public fontSize				:   number =18;
		public channelX				:   number = 0;						//频道选择偏移X
		private bisMachine			:	boolean;
		public constructor(_uWidth:number, _uHeight:number, _uX:number=0,_uY:number=0,_isMachine: boolean = false) {
			super();
			this.uWidth=_uWidth;
			this.uHeight = _uHeight;
			this.uX=_uX;
			this.uY=_uY;
			this.bisMachine = _isMachine;
			this.init();
		}
		protected init():void{
			this.mcAsset = new egret.MovieClip();
//			this.mcAsset.graphics.beginFill(0x333333);
//			this.mcAsset.graphics.drawRect(0, 0, uWidth, uHeight);
//			this.mcAsset.graphics.endFill();
			
			this.m_mcVideo = new egret.MovieClip();
			this.m_mcVideo.mouseEnabled=this.m_mcVideo.mouseChildren=false;
			this.mcAsset.addChild(this.m_mcVideo);
			this.m_mcVideo.graphics.beginFill(0x000000,0.1);
			this.m_mcVideo.graphics.drawRect(0,0,this.uWidth,this.uHeight);
			this.m_mcVideo.graphics.endFill();
			this.initializeRTMPPlayer()
		}
		
		 public destroy():void{
//			super.destroy();
			if(this.m_btnTextClose){
				this.mcAsset.removeChild(this.m_btnTextClose);
				this.m_btnTextClose.destroy();
				this.m_btnTextClose = null;
			}
			
			if(this.m_loading){
				this.m_loading.stop();
				if(this.m_loading.parent){
					this.m_loading.parent.removeChild(this.m_loading);
				}
				this.m_loading = null;
			}
			
			
			if(this.m_tfWarn){
				if(this.mcAsset){
					this.mcAsset.removeChild(this.m_tfWarn);
				}
				this.m_tfWarn = null;
			}
			
			if(this.m_RTMPPlayer){
				model.LobbyData.getInstance().removeRtmpPlayer(this.m_RTMPPlayer);
				
				this.m_RTMPPlayer.destroy();
				this.m_RTMPPlayer = null;
			}
			
			if(this.m_mcVideo){
				this.mcAsset.removeChild(this.m_mcVideo);
				this.m_mcVideo = null;
			}
			if(this.centerPoint){
				this.centerPoint=null;
			}
			this.mcAsset=null;
			
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
		}
		
		public setup(_server:string,_steams:any[]):void{
			this.sServer = _server;
		}
		
		public setupServer(_server:string,_steamApp:string):void{
			this.sServer = _server;
			this.m_sStream = _steamApp;
		}
		
		public initializeRTMPPlayer():void{
			this.m_RTMPPlayer = new util.rtmp.RTMPPlayer(manager.LobbyManager.getInstance().stage, 0, manager.LobbyManager.getInstance().bStageVideoAvailable);
			model.LobbyData.getInstance().addRtmpPlayer(this.m_RTMPPlayer);
			this.m_RTMPPlayer.initialize( this.m_mcVideo, this.uWidth, this.uHeight);
			
			this.m_RTMPPlayer.fHideLoading = this.hideLoding; 
			this.m_RTMPPlayer.fConnectFailed = this.connectFailed;
			
			
			
			this.m_RTMPPlayer.resize(this.uWidth,this.uHeight);
		 	var _bStatus = manager.SharedObjectManager.getLiveOnOff();
			this.m_RTMPPlayer.setVolume(_bStatus?manager.SharedObjectManager.getLiveVolume():0);
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
			
			
			this.m_RTMPPlayer.fConnectSuccess = function():void{
				if(this.m_tfWarn){
					this.m_tfWarn.visible = false;
				}
				manager.LobbyManager.getInstance().hideChannel();
				
				this.uCount = 0;
				if(this.bisMachine){
					this.m_RTMPPlayer.setStageVideo(this.uX,this.uY,this.uWidth,this.uHeight);
					setTimeout(function():void{
						this.m_RTMPPlayer.resize(this.uWidth,this.uHeight);
					},5);
				}else{
					this.m_RTMPPlayer.setStageVideo(this.uX,this.uY,this.uWidth,this.uHeight);
				}
			};
		
		}
		
		
		
		
//		get curStream():string{
//			return streams[iStreamIndex];
//		}
		
		public play():void{
			if(this.m_loading.parent==null){
				this.mcAsset.addChild(this.m_loading);
				
			}
			this.setLoadingPosition();
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
			this.showLoading();
			this.clearView();
			if(this.sServer!=null && this.m_sStream!=null && this.sServer!="" && this.m_sStream!=""){
				this.hash(this.sServer, this.m_sStream);
			//	console.log(this,"播放游戏视讯:"+sServer+"/"+m_sStream);
			//	console.log("游戏视频地址"+sServer+"/"+m_sStream)
				this.m_RTMPPlayer.play(this.sServer, this.m_sHash, this.m_sSharedSecuret);
			}
			this.sFailedConnectType = null;
			manager.TimeManager.getInstance().addFun(this.loadVideoTimeOut,5000);
			this.m_RTMPPlayer.iVideoConnectStatus = 0;
		}
		

		
		public stop():void{
			if(this.m_RTMPPlayer){
				this.m_RTMPPlayer.stop();
				this.hideLoding();
			}
		
		}
		
		
		 public refresh():void{
			this.stop();
			this.play();
		}
		/**
		 * 清除視頻畫面
		 */
		public clearVideoFull():void {
			this.m_RTMPPlayer.clearVideoFull();
		}
		
		
		public showLoading():void{
			if(this.m_loading){
				this.m_loading.gotoAndPlay(1);
				this.m_loading.visible = true;
			}
			
			if(this.m_tfWarn){
				this.m_tfWarn.visible = false;
			}

		}
		
		protected loadVideoTimeOut():void {
		//	console.log(this, "視訊連接狀態::視訊連接逾時");
			this.stop();
			this.sFailedConnectType = language.Language.sLiveError;
			this.initWorn();
			this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sLiveError );	
			
			this.uCount++;
			if(this.uCount<3){
				this.play();
			}else{
//			 str:string = manager.LobbyManager.getInstance().getLanguageString( Language.sLiveError );
//				manager.LobbyManager.getInstance().showDialog_2(str,false,true);
				manager.LobbyManager.getInstance().showChannel(true,this.channelX);
				this.m_tfWarn.visible = true;
			}
		}
		
		public hideLoding():void{
			if(this.m_loading){
				this.m_loading.gotoAndStop(1);
				this.m_loading.visible = false;
			}
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
		}
		
		protected initWorn():void {
			if(!this.m_tfWarn){
				this.m_tfWarn = new egret.TextField();
				//this.m_tfWarn.width=400;
				this.m_tfWarn.selectable=false;
				this.m_tfWarn.mouseEnabled = false;
				this.m_tfWarn.multiline=true;
			//	this.m_tfWarn.width=250;
				// if this.(m_format==null){
				// 	this.m_format = new TextFormat("Arial",fontSize,0xFFFFFF);
				// 	this.m_format.align=TextFormatAlign.CENTER;
				// 	this.m_tfWarn.autoSize = TextFieldAutoSize.CENTER;
				// 	this.m_tfWarn.defaultTextFormat=m_format;
				// }
				
				if(this.mcAsset){
					this.mcAsset.addChild(this.m_tfWarn);
				}
				if (this.centerPoint){
					this.m_tfWarn.x = this.centerPoint.x;
					this.m_tfWarn.y = this.centerPoint.y;
				}else if( this.m_loading ){
					this.m_tfWarn.x = this.m_loading.x;
					this.m_tfWarn.y = this.m_loading.y;
				}
//				this.m_tfWarn.text="XXXXXXXXXX"
				this.m_tfWarn.visible = false;
			}
						
		}
		
	
		
		
		protected connectFailed(_iType:number=1):void
		{
			this.hideLoding();
			this.initWorn();
			
		//	console.log(this, "視訊連接狀態::" + _iType);
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
				case util.rtmp.RTMPPlayer.iConnectClose:
					this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveError );	
					this.sFailedConnectType = language.Language.sLiveError;
					break;
			}
			
//		 str:string = manager.LobbyManager.getInstance().getLanguageString( Language.sLiveError );
//			manager.LobbyManager.getInstance().showDialog_2(str,false,true);
			
			if(!this.m_tfWarn.visible){
				if(manager.LobbyManager.getInstance().bClickResolution){
					manager.LobbyManager.getInstance().bClickResolution = false;
				}else{
					this.m_tfWarn.visible = true;
					manager.LobbyManager.getInstance().showChannel(false,this.channelX);
				}
			}
		}
		public onChangeLanguage():void {
			if(this.m_tfWarn && this.sFailedConnectType){
				this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( this.sFailedConnectType );	
			}
			if(this.m_loading){
				this.m_loading.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sLiveVideo);
			}
		}
		
		
		
		public resize( uWidth:number ,uHeight:number ):void {
			
//			if( this.mcAsset ){
//				this.mcAsset.graphics.clear();
//				this.mcAsset.graphics.beginFill(0x333333);
//				this.mcAsset.graphics.drawRect(0, 0, uWidth, uHeight);
//				this.mcAsset.graphics.endFill();	
//			}
			
			this.m_RTMPPlayer.uVideoWidth = 0;
			this.m_RTMPPlayer.uVideoHieght = 0;
			this.m_RTMPPlayer.resize( uWidth , uHeight );
			
			this.setLoadingPosition();
			
		}
		
		protected setLoadingPosition():void{
			if(this.centerPoint){
				this.m_loading.x = this.centerPoint.x-50;
				this.m_loading.y = this.centerPoint.y-23;
			}else if(this.m_loading){
				this.m_loading.x = (this.uWidth * 0.5 - 67);
				this.m_loading.y = (this.uHeight * 0.5 - 47);
			}
			/*if (this.m_tfWarn){
				if (this.centerPoint){
					this.m_tfWarn.x = this.centerPoint.x;
					this.m_tfWarn.y = this.centerPoint.y;
				}else if( this.m_loading ){
					this.m_tfWarn.x = this.m_loading.x;
					this.m_tfWarn.y = this.m_loading.y;
				}
			}*/
			
		}
		
	}
}
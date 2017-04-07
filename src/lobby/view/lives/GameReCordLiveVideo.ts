module lobby.view.lives {
	export class GameReCordLiveVideo extends LiveVideoGame{
		
		private m_btnRefresh		:	ui.button.SingleButtonMC;				//刷新视讯
		private m_btnZoomIn			:	ui.button.SingleButtonMC;				//放大视讯
		private m_btnZoomOut		:	ui.button.SingleButtonMC;				//缩小视讯
		public btnBack				:	ui.button.SingleButtonMC;				//关闭视讯
		private m_btnOnOff			:	ui.button.SingleButtonMC;				//显示隐藏
		private m_mask				;
		
		public zoomPt				;						//放大到的点
		public bTween				:	boolean;					//放大缩小动画中
		public nScaleBig			:	number = 2;					//放大參數
		
		public constructor(_mcParent, _uWidth:number, _uHeight:number) {

			super(_uWidth, _uHeight);
			
			this.mcAsset = _mcParent;
			
			super(_mcParent.width,_mcParent.height);
			this.m_mask= new egret.Sprite();
			this.m_mask.graphics.beginFill(0x999999);
			this.m_mask.graphics.drawRect(0, 0, this.uWidth, this.uHeight);
			this.m_mask.graphics.endFill()
			this.mcAsset.addChild(this.m_mask);
			this.mcAsset.mask=this.m_mask;
			this.zoomPt = new egret.Point();
			this.zoomPt.x = 216;
			this.zoomPt.y = 134;
			
			/*var mc1:MovieClip=_mcParent.getChildByName("mc_1")as MovieClip;
			this.m_btnRefresh = new ui.button.SingleButtonMC(mc1, function(event:MouseEvent):void{
				TipManager.getInstance().hide();
				this.m_RTMPPlayer.stop();
				play();
			});
			this.m_btnRefresh.fOnOver = function():void{
				TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Refresh),TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_1.x+15,_mcParent.mc_1.y)));
			};
			this.m_btnRefresh.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			var mc2:MovieClip=_mcParent.getChildByName("mc_2")as MovieClip;
			this.m_btnZoomIn = new ui.button.SingleButtonMC(mc2, function(event:MouseEvent):void{
				TipManager.getInstance().hide();
				//放大
				//this.m_RTMPPlayer.zoomIn();
				zoomIn();
			});
			this.m_btnZoomIn.fOnOver = function():void{
				TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_ZoomIn),TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_2.x+9,_mcParent.mc_2.y)));
			};
			this.m_btnZoomIn.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			var mc3:MovieClip=_mcParent.getChildByName("mc_3")as MovieClip;
			if (mc3){
				//缩小
				this.m_btnZoomOut = new ui.button.SingleButtonMC(mc3, function(event:MouseEvent):void{
					TipManager.getInstance().hide();
					zoomOut();
				});
				this.m_btnZoomOut.fOnOver = function():void{
					TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_ZoomOut),TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_3.x+9,_mcParent.mc_3.y)));
				};
				this.m_btnZoomOut.fOnOut = function():void{
					TipManager.getInstance().hide();
				};
			}
			
			var mc4:MovieClip=_mcParent.getChildByName("mc_4")as MovieClip;
			if (mc4){
				this.btnBack = new ui.button.SingleButtonMC(mc4, function(event:MouseEvent):void{
					
				});
				this.btnBack.fOnOver = function():void{
					TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_Close),TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_4.x+15,_mcParent.mc_4.y)));
				};
				this.btnBack.fOnOut = function():void{
					TipManager.getInstance().hide();
				};
			}
			
			*/
			//mc1.visible=mc2.visible=false;
			
			
			this.hideLoding();
		}
		
		 public initializeRTMPPlayer():void{
			this.m_RTMPPlayer = new util.rtmp.RTMPPlayer();
			model.LobbyData.getInstance().addRtmpPlayer(this.m_RTMPPlayer);
			this.m_RTMPPlayer.initialize( this.m_mcVideo, this.uWidth, this.uHeight);
			
			this.m_RTMPPlayer.fHideLoading = this.hideLoding; 
			this.m_RTMPPlayer.fConnectFailed = this.connectFailed;
			
			this.m_RTMPPlayer.resize(this.uWidth,this.uHeight);
			var _bStatus  = manager.SharedObjectManager.getLiveOnOff();
			this.m_RTMPPlayer.setVolume(_bStatus?manager.SharedObjectManager.getLiveVolume():0);
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
			this.mcAsset.addChild(this.m_loading);
			this.m_loading.x =  this.mcAsset.width * 0.5 - 67;
			this.m_loading.y = this.mcAsset.height * 0.5 - 47;
			this.centerPoint = new egret.Point( this.mcAsset.width * 0.5 ,this.mcAsset.height * 0.5);
			this.m_RTMPPlayer.fConnectSuccess = function():void{
				if(this.m_tfWarn){
					this.m_tfWarn.visible = false;
				}
				this.uCount = 0;
			};
		}
		
		 protected init():void{
			
			this.m_mcVideo = new egret.MovieClip();
			
			
			this.mcAsset.addChild(this.m_mcVideo);
			this.initializeRTMPPlayer()
			this.m_mcVideo.graphics.beginFill(0x666666);
			this.m_mcVideo.graphics.drawRect(0, 0, this.uWidth, this.uHeight);
			this.m_mcVideo.graphics.endFill();
			this.m_RTMPPlayer.resizeAlignCenter(this.uWidth, this.uHeight);
		}
		
		
		public zoomIn(_onComplete) : void
		{
			if (this.bTween)return;
			var xx:number= -this.zoomPt.x;
			var yy:number= -this.zoomPt.y;
			
			egret.Tween.get(this.m_mcVideo).to({x:xx, y:yy, scaleX:this.nScaleBig, scaleY:this.nScaleBig}, define.GameDefine.TWEEN_SPEED).call(function():void{
				this.bTween=false;
				if(_onComplete!=null){
					_onComplete();
				}
			});
			this.bTween = true;
			return;
		}
		
		public zoomOut(_onComplete:Function) : void
		{
			if (this.bTween)return;
			var xx:number= 0;
			var yy:number= 0;
			
			egret.Tween.get(this.m_mcVideo).to({x:xx, y:yy, scaleX:1, scaleY:1}, define.GameDefine.TWEEN_SPEED).call(function():void{
				this.bTween=false
				if(_onComplete!=null){
					_onComplete();
				}
			});
			this.bTween = true;
			return;
		}
		
		public normal():void {
			this.m_mcVideo.x = 0;
			this.m_mcVideo.y = 0;
			this.m_mcVideo.scaleX = 1;
			this.m_mcVideo.scaleY = 1;
			
			var _bStatus  = manager.SharedObjectManager.getLiveOnOff();
			this.m_RTMPPlayer.setVolume(_bStatus?manager.SharedObjectManager.getLiveVolume():0);
		}
		
		 protected connectFailed(_iType:number=1):void
		{
			this.hideLoding();
			this.initWorn();
			
			console.log(this, "視訊連接狀態::" + _iType);
			switch(_iType){
				case util.rtmp.RTMPPlayer.iStreamNotFound:
					this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sLiveError );	
//					sFailedConnectType = language.Language.sLiveError_1;
					break;
				case util.rtmp.RTMPPlayer.iRejected:
					this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sLiveError );	
//					sFailedConnectType = language.Language.sLiveError_1;
					break;
				case util.rtmp.RTMPPlayer.iVideoConnectFailed:
				case util.rtmp.RTMPPlayer.iVideoPlayFailed:
					this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveError);	
//					sFailedConnectType = language.Language.sLiveError_1;
					break;
			}
			
			//			var str:string = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveError );
			//			manager.LobbyManager.getInstance().showDialog_2(str,false,true);
			
			if(!this.m_tfWarn.visible){
//				manager.LobbyManager.getInstance().showChannel(false);
				this.m_tfWarn.visible = true;
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
//				var str:string = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveError );
//				manager.LobbyManager.getInstance().showDialog_2(str,false,true);
//				manager.LobbyManager.getInstance().showChannel(true,channelX);
				this.m_tfWarn.visible = true;
			}
		}
		
		
		
		
	}
}
module lobby.view.lives {
	export class MLiveVideo extends LiveVideoGame{
		private m_btnRefresh		:	ui.button.SingleButtonMC;				//刷新视讯
		private m_btnZoomIn			:	ui.button.SingleButtonMC;				//放大视讯
		private m_btnZoomOut		:	ui.button.SingleButtonMC;				//缩小视讯
		public btnBack				:	ui.button.SingleButtonMC;				//关闭视讯
		private m_btnOnOff			:	ui.button.SingleButtonMC;				//显示隐藏
		private m_mask				;
		
		public zoomPt				;						//放大到的点
		public bTween				:	 boolean;					//放大缩小动画中
		public constructor(_mcParent, _uWidth:number, _uHeight:number) {
			
			super(_uWidth,_uHeight);

			this.mcAsset = _mcParent;
			
			super(_mcParent.width,_mcParent.height);
			this.m_mask= new egret.Sprite();
			this.m_mask.graphics.beginFill(0x999999);
		//	this.m_mask.graphics.drawRect(0, 0, uWidth, uHeight);
			this.m_mask.graphics.drawRect(0, 0, this.uWidth, this.uHeight);
			this.m_mask.graphics.endFill()
			this.mcAsset.addChild(this.m_mask);
			this.mcAsset.mask=this.m_mask;
			
			this.fontSize=14;
			
			this.zoomPt = new egret.Point();
			this.zoomPt.x = 210;
			this.zoomPt.y = 120;
			
			var mc1=_mcParent.getChildByName("mc_1");
			this.m_btnRefresh = new ui.button.SingleButtonMC(mc1, function(event:MouseEvent):void{
				manager.TipManager.getInstance().hide();
				this.m_RTMPPlayer.stop();
				this.play();
			});
			this.m_btnRefresh.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Refresh),manager.TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_1.x+15,_mcParent.mc_1.y)));
			};
			this.m_btnRefresh.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			/*
			去掉放大功能
			var mc2:MovieClip=_mcParent.getChildByName("mc_2")as MovieClip;
			mc2.visible=false;
			this.m_btnZoomIn = new ui.button.SingleButtonMC(mc2, function(event:MouseEvent):void{
				manager.TipManager.getInstance().hide();
				
				//放大
				//m_RTMPPlayer.zoomIn();
				zoomIn();
			});
			this.m_btnZoomIn.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_ZoomIn),manager.TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_2.x+9,_mcParent.mc_2.y)));
			};
			this.m_btnZoomIn.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			var mc3:MovieClip=_mcParent.getChildByName("mc_3")as MovieClip;
			if (mc3){
				mc3.visible=false;
				//缩小
				this.m_btnZoomOut = new ui.button.SingleButtonMC(mc3, function(event:MouseEvent):void{
					manager.TipManager.getInstance().hide();
					zoomOut();
				});
				this.m_btnZoomOut.fOnOver = function():void{
					manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_ZoomOut),manager.TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_3.x+9,_mcParent.mc_3.y)));
				};
				this.m_btnZoomOut.fOnOut = function():void{
					manager.TipManager.getInstance().hide();
				};
			}*/
				
			var mc4=_mcParent.getChildByName("mc_4");
			if (mc4){
				this.btnBack = new ui.button.SingleButtonMC(mc4, function(event:MouseEvent):void{
					
				});
				this.btnBack.fOnOver = function():void{
					manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_Close),manager.TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_4.x+15,_mcParent.mc_4.y)));
				};
				this.btnBack.fOnOut = function():void{
					manager.TipManager.getInstance().hide();
				};
			}
			
			
			//mc1.visible=mc2.visible=false;
			//this.m_btnZoomOut.enabled = false;
			
			this.hideLoding();
			this.setVolume(0);
		}
		
		 public initializeRTMPPlayer():void{
			this.m_RTMPPlayer = new util.rtmp.RTMPPlayer();
			this.m_RTMPPlayer.initialize( this.m_mcVideo, this.uWidth, this.uHeight);
			
			this.m_RTMPPlayer.fHideLoading = this.hideLoding; 
			this.m_RTMPPlayer.fConnectFailed = this.connectFailed;
			
			this.m_RTMPPlayer.resize(this.uWidth,this.uHeight);
			var _bStatus  = manager.SharedObjectManager.getLiveOnOff();
			this.m_RTMPPlayer.setVolume(_bStatus?manager.SharedObjectManager.getLiveVolume():0);
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
//			m_mcVideo.addChild(m_loading);
//			m_loading.x = int( this.mcAsset.width * 0.5 - 100);
//			m_loading.y = int(this.mcAsset.height * 0.5 - 20);
//			
			this.m_RTMPPlayer.fConnectSuccess = function():void{
				if(this.m_tfWarn){
					this.m_tfWarn.visible = false;
				}
				this.uCount = 0;
				this.m_RTMPPlayer.setStageVideo(0,0,1920,1080);
			};
		}
		
		 protected init():void{
			this.m_mcVideo = new egret.MovieClip();
			this.mcAsset.addChildAt(this.m_mcVideo,1);
			this.initializeRTMPPlayer();
			this.m_RTMPPlayer.bClear = true;
			this.m_mcVideo.graphics.beginFill(0x550000,0);
			this.m_mcVideo.graphics.drawRect(0, 0, this.uWidth, this.uHeight);
			this.m_mcVideo.graphics.endFill();
			this.m_RTMPPlayer.resizeAlignCenter(this.uWidth, this.uHeight);
		}
		
		
		
		 protected loadVideoTimeOut():void {
			console.log(this, "視訊連接狀態::視訊連接逾時");
			this.stop();
			this.sFailedConnectType = language.Language.sLiveError;
			this.initWorn();
			this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sLiveError );	
			this.m_tfWarn.visible = true;
			
			this.uCount++;
			if(this.uCount<3){
				this.play();
			}
		}
		

		
		
		 protected connectFailed(_iType:number=1):void
		{
			this.hideLoding();
			this.initWorn();
			
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
			
			
			this.m_tfWarn.visible = true;
			
		}
	
		
		
		public zoomIn() : void
		{
			if (this.bTween)return;
			var xx:number= -this.zoomPt.x;
			var yy:number= -this.zoomPt.y;
			
			this.m_btnZoomIn.enabled=false;
			this.m_btnZoomOut.enabled = false;
			
			egret.Tween.get(this.m_mcVideo).to({x:xx, y:yy, scaleX:2, scaleY:2}, define.GameDefine.TWEEN_SPEED).call(function():void{
				this.bTween=false;
				if(this.m_btnZoomOut){
					this.m_btnZoomOut.enabled = true;
				}
			});
			this.bTween = true;
			return;
		}

		public zoomOut() : void
		{
			if (this.bTween)return;
			var xx:number= 0;
			var yy:number= 0;
			this.m_btnZoomIn.enabled=false;
			this.m_btnZoomOut.enabled = false;
			
			egret.Tween.get(this.m_mcVideo).to({x:xx, y:yy, scaleX:1, scaleY:1}, define.GameDefine.TWEEN_SPEED).call(function():void{
				this.bTween=false
				if(this.m_btnZoomIn){
					this.m_btnZoomIn.enabled=true;
				}
			});
			this.bTween = true;
			return;
		}
		
		
		
	}
}
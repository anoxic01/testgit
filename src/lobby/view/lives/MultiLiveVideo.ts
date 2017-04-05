module lobby.view.lives {
	export class MultiLiveVideo extends LiveVideoGame{
		private m_btnRefresh		:	ui.button.SingleButtonMC;				//刷新视讯
		private m_btnZoomIn			:	ui.button.SingleButtonMC;				//放大视讯
		private m_btnZoomOut		:	ui.button.SingleButtonMC;				//缩小视讯
		public btnBack				:	ui.button.SingleButtonMC;				//关闭视讯
		
		public zoomPt				;						//放大到的点
		public bTween				:	 boolean;					//放大缩小动画中
		
		public offset				;
		public viewPort				;
		public bClosed				:	 boolean;
		public tableId				:	number;						//主要测试用
		public constructor(_mcParent, _uWidth:number, _uHeight:number) {

			super(_uWidth, _uHeight);

			this.mcAsset = _mcParent;
			this.bClosed=true;
		//	super(_mcParent.width,_mcParent.height);
			super(_uWidth,_uHeight);
//			m_mask= new Sprite();
//			m_mask.graphics.beginFill(0x999999);
//		//	m_mask.graphics.drawRect(0, 0, uWidth, uHeight);
//			m_mask.graphics.drawRect(0, 0, uWidth, uHeight);
//			m_mask.graphics.endFill()
//			this.mcAsset.addChild(m_mask);
//			this.mcAsset.mask=m_mask;
			
			this.fontSize=14;
			
//			this.zoomPt = new Point();
//			this.zoomPt.x = 210;
//			this.zoomPt.y = 120;
			this.mcAsset.mc_bg.mouseEnabled=this.mcAsset.mc_bg.mouseChildren=false;
			var mc1=_mcParent.getChildByName("mc_1");
			this.m_btnRefresh = new ui.button.SingleButtonMC(mc1, function(event:MouseEvent):void{
				manager.TipManager.getInstance().hide();
				this.refresh();
			});
			this.m_btnRefresh.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Refresh),manager.TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_1.x+15,_mcParent.mc_1.y+10)));
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
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_ZoomIn),manager.TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_2.x+9,_mcParent.mc_2.y)));
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
					manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_ZoomOut),manager.TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_3.x+9,_mcParent.mc_3.y)));
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
					manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Video_Close),manager.TipManager.DOWN,_mcParent.localToGlobal(new egret.Point(_mcParent.mc_4.x+15,_mcParent.mc_4.y+10)));
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
		
		 public destroy():void{
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
			if(this.m_btnRefresh){
				this.m_btnRefresh.destroy();
				this.m_btnRefresh=null;
			}
			if(this.m_btnZoomIn){
				this.m_btnZoomIn.destroy();
				this.m_btnZoomIn=null;
			}
			if(this.m_btnZoomOut){
				this.m_btnZoomOut.destroy();
				this.m_btnZoomOut=null;
			}
			if(this.btnBack){
				this.btnBack.destroy();
				this.btnBack=null;
			}
			if (this.m_RTMPPlayer){
				this.m_RTMPPlayer.stop();
				
			}
			super.destroy();
			
		}
		
		 public initializeRTMPPlayer():void{
	//		m_RTMPPlayer = new util.rtmp.RTMPPlayer();
			this.m_RTMPPlayer = new util.rtmp.RTMPPlayer(manager.LobbyManager.getInstance().stage,-1, manager.LobbyManager.getInstance().bStageVideoAvailable);
			model.LobbyData.getInstance().addRtmpPlayer(this.m_RTMPPlayer);
			this.m_RTMPPlayer.initialize( this.m_mcVideo, this.uWidth, this.uHeight);
			this.m_RTMPPlayer.bClear = true;
			
			this.m_RTMPPlayer.fHideLoading = this.hideLoding; 
			this.m_RTMPPlayer.fConnectFailed = this.connectFailed;
			this.m_RTMPPlayer.fTrace = this.traceHandler;
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
				this.mcAsset.mc_bg.visible=false;
				this.mcAsset.visible=true;
				this.bClosed=false;
				this.uCount = 0;
				
//				console.log("视讯坐标："+pt)
				if(this.viewPort){
				
					this.m_RTMPPlayer.setStageVideo(this.viewPort.x,this.viewPort.y,this.viewPort.width,this.viewPort.height);
				}else{
					var pt = this.mcAsset.localToGlobal(new egret.Point(0,0));
					if(this.offset){
						pt.this.offset(this.offset.x,this.offset.y);
					}
					this.m_RTMPPlayer.setStageVideo(this.viewPort.x,this.viewPort.y,this.viewPort.width,this.viewPort.height);
					
				}
				
			
				//m_RTMPPlayer.setStageVideo(pt.x,pt.y,uWidth,uHeight);
			};
		}
		
		public setZoomPan(_zoomPt, _panPt=null):void{
			if(_zoomPt){
				this.m_RTMPPlayer.setZoom(_zoomPt);
			}
			if(_panPt){
				this.m_RTMPPlayer.setPan(_panPt);
			}
		}
		
		 protected init():void{
		
			this.m_mcVideo = new egret.MovieClip();
			this.m_mcVideo.mouseEnabled=this.m_mcVideo.mouseChildren=false;
			this.initializeRTMPPlayer();
//			m_RTMPPlayer.bClear = true;
		
			this.mcAsset.addChildAt(this.m_mcVideo,1);
//			m_mcVideo.graphics.beginFill(0x550000,0);
//			m_mcVideo.graphics.drawRect(0, 0, uWidth, uHeight);
//			m_mcVideo.graphics.endFill();
		//	m_RTMPPlayer.resizeAlignCenter(uWidth,uHeight);
		}
		
		
		
		 protected loadVideoTimeOut():void {
			//console.log(this, "視訊連接狀態::視訊連接逾時");
			console.log("視訊連接狀態::視訊連接逾時"+this.m_RTMPPlayer.stageVideoIndex)
			this.stop();
			this.sFailedConnectType = language.Language.sLiveError;
			this.initWorn();
			this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString(  language.Language.sLiveError );	
			this.m_tfWarn.visible = true;
		}
		
		protected traceHandler(str:String):void
		{
			if(this.tableId == 8 ){
				console.log(this,this.tableId+"桌视讯情况："+str);
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
				case util.rtmp.RTMPPlayer.iConnectClose:
					if(this.bClosed==false){
						this.m_tfWarn.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sLiveError );	
						this.sFailedConnectType = language.Language.sLiveError;
					}
					
					break;
				
			}
			
			
			this.m_tfWarn.visible = true;
			this.mcAsset.mc_bg.visible=true;
			this.mcAsset.visible=true;
			
		}
		
		public setVideoIndex(index:number):void{
			if (manager.LobbyManager.getInstance().bStageVideoAvailable && this.m_RTMPPlayer ){
				this.m_RTMPPlayer.setVideoIndex(index);
				
			}
		}
		
		public getVideoIndex():number{
			if (this.m_RTMPPlayer){
				return this.m_RTMPPlayer.stageVideoIndex;
				
			}
			return -1;
		}
		
		 public refresh():void{
			this.stop();
			this.setVideoIndex(this.m_RTMPPlayer.stageVideoIndex);
			this.play();
		}
		
		 public play():void{
			if(this.m_loading.parent==null){
				this.mcAsset.addChild(this.m_loading);
			}
			this.setLoadingPosition();
			this.mcAsset.mc_bg.visible=false;
			this.mcAsset.visible=true;
			this.bClosed=false;
			manager.TimeManager.getInstance().removeFun(this.loadVideoTimeOut);
			this.showLoading();
			this.clearView();
			if(this.sServer!=null && this.m_sStream!=null && this.sServer!="" && this.m_sStream!=""){
				this.hash(this.sServer, this.m_sStream);
//				console.log(this,"播放游戏视讯:"+sServer+"/"+m_sStream);
			//	console.log("游戏视频地址"+sServer+"/"+m_sStream)
			//	console.log("游戏视频编号"+m_RTMPPlayer.stageVideoIndex)
				
				this.m_RTMPPlayer.play(this.sServer, this.m_sHash, this.m_sSharedSecuret);
			}
			this.sFailedConnectType = null;
			manager.TimeManager.getInstance().addFun(this.loadVideoTimeOut,10000);
			this.m_RTMPPlayer.iVideoConnectStatus = 0;
		}
		
		 public stop():void{
			
			this.bClosed=true;
			this.m_RTMPPlayer.stop();
			this.hideLoding();
			if (this.m_tfWarn){
				this.m_tfWarn.visible=false;
			}
			this.mcAsset.mc_bg.visible=true;
			this.mcAsset.visible=true;
		}
		
		
		public zoomIn() : void
		{
			if (this.bTween)return;
			var xx:Number= -this.zoomPt.x;
			var yy:Number= -this.zoomPt.y;
			var ww:Number
			var hh:Number
			this.m_btnZoomIn.enabled=false;
			this.m_btnZoomOut.enabled = false;
			TweenLite.to(this.m_mcVideo, define.GameDefine.TWEEN_SPEED, {x:xx, y:yy, scaleX:2, scaleY:2,onComplete:function():void{
				this.bTween=false;
				if(this.m_btnZoomOut){
					this.m_btnZoomOut.enabled = true;
				}
			}});
			this.bTween = true;
			return;
		}

		public zoomOut() : void
		{
			if (this.bTween)return;
			var xx:Number= 0;
			var yy:Number= 0;
			var ww:Number
			var hh:Number
			this.m_btnZoomIn.enabled=false;
			this.m_btnZoomOut.enabled = false;
			TweenLite.to(this.m_mcVideo, define.GameDefine.TWEEN_SPEED, {x:xx, y:yy, scaleX:1, scaleY:1,onComplete:function():void{
				this.bTween=false
				if(this.m_btnZoomIn){
					this.m_btnZoomIn.enabled=true;
				}
			}});
			this.bTween = true;
			return;
		}
		
		
	}
}
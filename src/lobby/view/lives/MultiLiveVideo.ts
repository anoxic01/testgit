module lobby.view.lives {
	export class MultiLiveVideo extends LiveVideoGame{
		private m_btnRefresh		:	ui.button.SingleButtonMC;				//刷新视讯
		private m_btnZoomIn			:	ui.button.SingleButtonMC;				//放大视讯
		private m_btnZoomOut		:	ui.button.SingleButtonMC;				//缩小视讯
		public btnBack				:	ui.button.SingleButtonMC;				//关闭视讯
		
		public zoomPt				:	Point;						//放大到的点
		public bTween				:	 boolean;					//放大缩小动画中
		
		public offset				:	Point;
		public viewPort				:	Rectangle;
		public bClosed				:	 boolean;
		public tableId				:	number;						//主要测试用
		public constructor(_mcParent:MovieClip,_uWidth:number, _uHeight:number) {
			mcAsset = _mcParent;
			bClosed=true;
		//	super(_mcParent.width,_mcParent.height);
			super(_uWidth,_uHeight);
//			m_mask= new Sprite();
//			m_mask.graphics.beginFill(0x999999);
//		//	m_mask.graphics.drawRect(0, 0, uWidth, uHeight);
//			m_mask.graphics.drawRect(0, 0, uWidth, uHeight);
//			m_mask.graphics.endFill()
//			mcAsset.addChild(m_mask);
//			mcAsset.mask=m_mask;
			
			fontSize=14;
			
//			zoomPt = new Point();
//			zoomPt.x = 210;
//			zoomPt.y = 120;
			this.mcAsset.mc_bg.mouseEnabled=this.mcAsset.mc_bg.mouseChildren=false;
			var mc1:MovieClip=_mcParent.getChildByName("mc_1")as MovieClip;
			m_btnRefresh = new ui.button.SingleButtonMC(mc1, function(event:MouseEvent):void{
				TipManager.getInstance().hide();
				refresh();
			});
			m_btnRefresh.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Refresh),TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_1.x+15,_mcParent.mc_1.y+10)));
			};
			m_btnRefresh.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			/*
			去掉放大功能
			var mc2:MovieClip=_mcParent.getChildByName("mc_2")as MovieClip;
			mc2.visible=false;
			m_btnZoomIn = new ui.button.SingleButtonMC(mc2, function(event:MouseEvent):void{
				TipManager.getInstance().hide();
				
				//放大
				//m_util.rtmp.RTMPPlayer.zoomIn();
				zoomIn();
			});
			m_btnZoomIn.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Video_ZoomIn),TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_2.x+9,_mcParent.mc_2.y)));
			};
			m_btnZoomIn.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			var mc3:MovieClip=_mcParent.getChildByName("mc_3")as MovieClip;
			if (mc3){
				mc3.visible=false;
				//缩小
				m_btnZoomOut = new ui.button.SingleButtonMC(mc3, function(event:MouseEvent):void{
					TipManager.getInstance().hide();
					zoomOut();
				});
				m_btnZoomOut.fOnOver = function():void{
					TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Video_ZoomOut),TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_3.x+9,_mcParent.mc_3.y)));
				};
				m_btnZoomOut.fOnOut = function():void{
					TipManager.getInstance().hide();
				};
			}*/
				
			var mc4:MovieClip=_mcParent.getChildByName("mc_4")as MovieClip;
			if (mc4){
				btnBack = new ui.button.SingleButtonMC(mc4, function(event:MouseEvent):void{
					
				});
				btnBack.fOnOver = function():void{
					TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Video_Close),TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_4.x+15,_mcParent.mc_4.y+10)));
				};
				btnBack.fOnOut = function():void{
					TipManager.getInstance().hide();
				};
			}
			
			
			//mc1.visible=mc2.visible=false;
			//m_btnZoomOut.enabled = false;
			
			hideLoding();
			setVolume(0);
		}
		
		 public destroy():void{
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
			if(m_btnRefresh){
				m_btnRefresh.destroy();
				m_btnRefresh=null;
			}
			if(m_btnZoomIn){
				m_btnZoomIn.destroy();
				m_btnZoomIn=null;
			}
			if(m_btnZoomOut){
				m_btnZoomOut.destroy();
				m_btnZoomOut=null;
			}
			if(btnBack){
				btnBack.destroy();
				btnBack=null;
			}
			if (m_util.rtmp.RTMPPlayer){
				m_util.rtmp.RTMPPlayer.stop();
				
			}
			super.destroy();
			
		}
		
		 public initializeutil.rtmp.RTMPPlayer():void{
	//		m_util.rtmp.RTMPPlayer = new util.rtmp.RTMPPlayer();
			m_util.rtmp.RTMPPlayer = new util.rtmp.RTMPPlayer(LobbyManager.getInstance().stage,-1, LobbyManager.getInstance().bStageVideoAvailable);
			LobbyData.getInstance().addutil.rtmp.RTMPPlayer(m_util.rtmp.RTMPPlayer);
			m_util.rtmp.RTMPPlayer.initialize( m_mcVideo, uWidth, uHeight);
			m_util.rtmp.RTMPPlayer.bClear = true;
			
			m_util.rtmp.RTMPPlayer.fHideLoading = hideLoding; 
			m_util.rtmp.RTMPPlayer.fConnectFailed = connectFailed;
			m_util.rtmp.RTMPPlayer.fTrace = traceHandler;
			m_util.rtmp.RTMPPlayer.resize(uWidth,uHeight);
			var _bStatus :  boolean = SharedObjectManager.getLiveOnOff();
			m_util.rtmp.RTMPPlayer.setVolume(_bStatus?SharedObjectManager.getLiveVolume():0);
			
			m_loading = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"LoadingLiveAsset");
//			m_mcVideo.addChild(m_loading);
//			m_loading.x = int( mcAsset.width * 0.5 - 100);
//			m_loading.y = int(mcAsset.height * 0.5 - 20);
//			
			m_util.rtmp.RTMPPlayer.fConnectSuccess = function():void{
				if(m_tfWarn){
					m_tfWarn.visible = false;
				}
				mcAsset.mc_bg.visible=false;
				mcAsset.visible=true;
				bClosed=false;
				uCount = 0;
				
//				console.log("视讯坐标："+pt)
				if(viewPort){
				
					m_util.rtmp.RTMPPlayer.setStageVideo(viewPort.x,viewPort.y,viewPort.width,viewPort.height);
				}else{
					var pt:Point = mcAsset.localToGlobal(new Point(0,0));
					if(offset){
						pt.offset(offset.x,offset.y);
					}
					m_util.rtmp.RTMPPlayer.setStageVideo(viewPort.x,viewPort.y,viewPort.width,viewPort.height);
					
				}
				
			
				//m_util.rtmp.RTMPPlayer.setStageVideo(pt.x,pt.y,uWidth,uHeight);
			};
		}
		
		public setZoomPan(_zoomPt:Point,_panPt:Point=null):void{
			if(_zoomPt){
				m_util.rtmp.RTMPPlayer.setZoom(_zoomPt);
			}
			if(_panPt){
				m_util.rtmp.RTMPPlayer.setPan(_panPt);
			}
		}
		
		 protected init():void{
		
			m_mcVideo = new MovieClip();
			m_mcVideo.mouseEnabled=m_mcVideo.mouseChildren=false;
			initializeutil.rtmp.RTMPPlayer();
//			m_util.rtmp.RTMPPlayer.bClear = true;
		
			mcAsset.addChildAt(m_mcVideo,1);
//			m_mcVideo.graphics.beginFill(0x550000,0);
//			m_mcVideo.graphics.drawRect(0, 0, uWidth, uHeight);
//			m_mcVideo.graphics.endFill();
		//	m_util.rtmp.RTMPPlayer.resizeAlignCenter(uWidth,uHeight);
		}
		
		
		
		 protected loadVideoTimeOut():void {
			//Log.getInstance().log(this, "視訊連接狀態::視訊連接逾時");
			console.log("視訊連接狀態::視訊連接逾時"+m_util.rtmp.RTMPPlayer.stageVideoIndex)
			stop();
			sFailedConnectType = Language.sLiveError;
			initWorn();
			m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
			m_tfWarn.visible = true;
		}
		
		protected traceHandler(str:String):void
		{
			if(tableId == 8 ){
				Log.getInstance().log(this,tableId+"桌视讯情况："+str);
			}
		}
		
		
		 protected connectFailed(_iType:number=1):void
		{
			hideLoding();
			initWorn();
			
			switch(_iType){
				case util.rtmp.RTMPPlayer.iStreamNotFound:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
					sFailedConnectType = Language.sLiveError;
					break;
				case util.rtmp.RTMPPlayer.iRejected:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
					sFailedConnectType = Language.sLiveError;
					break;
				case util.rtmp.RTMPPlayer.iVideoConnectFailed:
				case util.rtmp.RTMPPlayer.iVideoPlayFailed:
				case util.rtmp.RTMPPlayer.iConnectClose:
					if(bClosed==false){
						m_tfWarn.text = LobbyManager.getInstance().getLanguageString( Language.sLiveError );	
						sFailedConnectType = Language.sLiveError;
					}
					
					break;
				
			}
			
			
			m_tfWarn.visible = true;
			mcAsset.mc_bg.visible=true;
			mcAsset.visible=true;
			
		}
		
		public setVideoIndex(index:number):void{
			if (LobbyManager.getInstance().bStageVideoAvailable && m_util.rtmp.RTMPPlayer ){
				m_util.rtmp.RTMPPlayer.setVideoIndex(index);
				
			}
		}
		
		public getVideoIndex():number{
			if (m_util.rtmp.RTMPPlayer){
				return m_util.rtmp.RTMPPlayer.stageVideoIndex;
				
			}
			return -1;
		}
		
		 public refresh():void{
			stop();
			setVideoIndex(m_util.rtmp.RTMPPlayer.stageVideoIndex);
			play();
		}
		
		 public play():void{
			if(m_loading.parent==null){
				mcAsset.addChild(m_loading);
			}
			setLoadingPosition();
			mcAsset.mc_bg.visible=false;
			mcAsset.visible=true;
			bClosed=false;
			TimeManager.getInstance().removeFun(loadVideoTimeOut);
			showLoading();
			clearView();
			if(sServer!=null && m_sStream!=null && sServer!="" && m_sStream!=""){
				hash(sServer, m_sStream);
//				Log.getInstance().log(this,"播放游戏视讯:"+sServer+"/"+m_sStream);
			//	console.log("游戏视频地址"+sServer+"/"+m_sStream)
			//	console.log("游戏视频编号"+m_util.rtmp.RTMPPlayer.stageVideoIndex)
				
				m_util.rtmp.RTMPPlayer.play(sServer, m_sHash, m_sSharedSecuret);
			}
			sFailedConnectType = null;
			TimeManager.getInstance().addFun(loadVideoTimeOut,10000);
			m_util.rtmp.RTMPPlayer.iVideoConnectStatus = 0;
		}
		
		 public stop():void{
			
			bClosed=true;
			m_util.rtmp.RTMPPlayer.stop();
			hideLoding();
			if (m_tfWarn){
				m_tfWarn.visible=false;
			}
			mcAsset.mc_bg.visible=true;
			mcAsset.visible=true;
		}
		
		
		public zoomIn() : void
		{
			if (bTween)return;
			var xx:Number= -zoomPt.x;
			var yy:Number= -zoomPt.y;
			var ww:Number
			var hh:Number
			m_btnZoomIn.enabled=false;
			m_btnZoomOut.enabled = false;
			TweenLite.to(m_mcVideo, GameDefine.TWEEN_SPEED, {x:xx, y:yy, scaleX:2, scaleY:2,onComplete:function():void{
				bTween=false;
				if(m_btnZoomOut){
					m_btnZoomOut.enabled = true;
				}
			}});
			bTween = true;
			return;
		}

		public zoomOut() : void
		{
			if (bTween)return;
			var xx:Number= 0;
			var yy:Number= 0;
			var ww:Number
			var hh:Number
			m_btnZoomIn.enabled=false;
			m_btnZoomOut.enabled = false;
			TweenLite.to(m_mcVideo, GameDefine.TWEEN_SPEED, {x:xx, y:yy, scaleX:1, scaleY:1,onComplete:function():void{
				bTween=false
				if(m_btnZoomIn){
					m_btnZoomIn.enabled=true;
				}
			}});
			bTween = true;
			return;
		}
		
		
	}
}
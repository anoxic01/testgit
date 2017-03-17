module lobby.view.lives {
	export class GameReCordLiveVideo extends LiveVideoGame{
		
		private var m_btnRefresh		:	SingleButtonMC;				//刷新视讯
		private var m_btnZoomIn			:	SingleButtonMC;				//放大视讯
		private var m_btnZoomOut		:	SingleButtonMC;				//缩小视讯
		public var btnBack				:	SingleButtonMC;				//关闭视讯
		private var m_btnOnOff			:	SingleButtonMC;				//显示隐藏
		private var m_mask				:	Sprite;
		
		public var zoomPt				:	Point;						//放大到的点
		public var bTween				:	Boolean;					//放大缩小动画中
		public var nScaleBig			:	Number = 2;					//放大參數
		
		public constructor(_mcParent:MovieClip,_uWidth:uint, _uHeight:uint) {
			
			mcAsset = _mcParent;
			
			super(_mcParent.width,_mcParent.height);
			m_mask= new Sprite();
			m_mask.graphics.beginFill(0x999999);
			m_mask.graphics.drawRect(0, 0, uWidth, uHeight);
			m_mask.graphics.endFill()
			mcAsset.addChild(m_mask);
			mcAsset.mask=m_mask;
			zoomPt = new Point();
			zoomPt.x = 216;
			zoomPt.y = 134;
			
			/*var mc1:MovieClip=_mcParent.getChildByName("mc_1")as MovieClip;
			m_btnRefresh = new SingleButtonMC(mc1, function(event:MouseEvent):void{
				TipManager.getInstance().hide();
				m_rtmpPlayer.stop();
				play();
			});
			m_btnRefresh.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Refresh),TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_1.x+15,_mcParent.mc_1.y)));
			};
			m_btnRefresh.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			var mc2:MovieClip=_mcParent.getChildByName("mc_2")as MovieClip;
			m_btnZoomIn = new SingleButtonMC(mc2, function(event:MouseEvent):void{
				TipManager.getInstance().hide();
				//放大
				//m_rtmpPlayer.zoomIn();
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
				//缩小
				m_btnZoomOut = new SingleButtonMC(mc3, function(event:MouseEvent):void{
					TipManager.getInstance().hide();
					zoomOut();
				});
				m_btnZoomOut.fOnOver = function():void{
					TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Video_ZoomOut),TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_3.x+9,_mcParent.mc_3.y)));
				};
				m_btnZoomOut.fOnOut = function():void{
					TipManager.getInstance().hide();
				};
			}
			
			var mc4:MovieClip=_mcParent.getChildByName("mc_4")as MovieClip;
			if (mc4){
				btnBack = new SingleButtonMC(mc4, function(event:MouseEvent):void{
					
				});
				btnBack.fOnOver = function():void{
					TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Video_Close),TipManager.DOWN,_mcParent.localToGlobal(new Point(_mcParent.mc_4.x+15,_mcParent.mc_4.y)));
				};
				btnBack.fOnOut = function():void{
					TipManager.getInstance().hide();
				};
			}
			
			*/
			//mc1.visible=mc2.visible=false;
			
			
			hideLoding();
		}
		
		override public function initializeRTMPPlayer():void{
			m_rtmpPlayer = new RTMPPlayer();
			LobbyData.getInstance().addRtmpPlayer(m_rtmpPlayer);
			m_rtmpPlayer.initialize( m_mcVideo, uWidth, uHeight);
			
			m_rtmpPlayer.fHideLoading = hideLoding; 
			m_rtmpPlayer.fConnectFailed = connectFailed;
			
			m_rtmpPlayer.resize(uWidth,uHeight);
			var _bStatus : Boolean = SharedObjectManager.getLiveOnOff();
			m_rtmpPlayer.setVolume(_bStatus?SharedObjectManager.getLiveVolume():0);
			
			m_loading = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"LoadingLiveAsset");
			mcAsset.addChild(m_loading);
			m_loading.x = int( mcAsset.width * 0.5 - 67);
			m_loading.y = int(mcAsset.height * 0.5 - 47);
			centerPoint = new Point( mcAsset.width * 0.5 ,mcAsset.height * 0.5);
			m_rtmpPlayer.fConnectSuccess = function():void{
				if(m_tfWarn){
					m_tfWarn.visible = false;
				}
				uCount = 0;
			};
		}
		
		override protected function init():void{
			
			m_mcVideo = new MovieClip();
			
			
			mcAsset.addChild(m_mcVideo);
			initializeRTMPPlayer()
			m_mcVideo.graphics.beginFill(0x666666);
			m_mcVideo.graphics.drawRect(0, 0, uWidth, uHeight);
			m_mcVideo.graphics.endFill();
			m_rtmpPlayer.resizeAlignCenter(uWidth,uHeight);
		}
		
		
		public function zoomIn(_onComplete:Function) : void
		{
			if (bTween)return;
			var xx:Number= -zoomPt.x;
			var yy:Number= -zoomPt.y;
			var ww:Number
			var hh:Number

			TweenLite.to(m_mcVideo, GameDefine.TWEEN_SPEED, {x:xx, y:yy, scaleX:nScaleBig, scaleY:nScaleBig,onComplete:function():void{
				bTween=false;
				if(_onComplete!=null){
					_onComplete();
				}
			}});
			bTween = true;
			return;
		}
		
		public function zoomOut(_onComplete:Function) : void
		{
			if (bTween)return;
			var xx:Number= 0;
			var yy:Number= 0;
			var ww:Number
			var hh:Number

			TweenLite.to(m_mcVideo, GameDefine.TWEEN_SPEED, {x:xx, y:yy, scaleX:1, scaleY:1,onComplete:function():void{
				bTween=false
				if(_onComplete!=null){
					_onComplete();
				}
			}});
			bTween = true;
			return;
		}
		
		public function normal():void {
			m_mcVideo.x = 0;
			m_mcVideo.y = 0;
			m_mcVideo.scaleX = 1;
			m_mcVideo.scaleY = 1;
			
			var _bStatus : Boolean = SharedObjectManager.getLiveOnOff();
			m_rtmpPlayer.setVolume(_bStatus?SharedObjectManager.getLiveVolume():0);
		}
		
		override protected function connectFailed(_iType:int=1):void
		{
			hideLoding();
			initWorn();
			
			Log.getInstance().log(this, "視訊連接狀態::" + _iType);
			switch(_iType){
				case RTMPPlayer.iStreamNotFound:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
//					sFailedConnectType = Language.sLiveError_1;
					break;
				case RTMPPlayer.iRejected:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString(  Language.sLiveError );	
//					sFailedConnectType = Language.sLiveError_1;
					break;
				case RTMPPlayer.iVideoConnectFailed:
				case RTMPPlayer.iVideoPlayFailed:
					m_tfWarn.text = LobbyManager.getInstance().getLanguageString( Language.sLiveError);	
//					sFailedConnectType = Language.sLiveError_1;
					break;
			}
			
			//			var str:String = LobbyManager.getInstance().getLanguageString( Language.sLiveError );
			//			LobbyManager.getInstance().showDialog_2(str,false,true);
			
			if(!m_tfWarn.visible){
//				LobbyManager.getInstance().showChannel(false);
				m_tfWarn.visible = true;
			}
		}
		
		
		override protected function loadVideoTimeOut():void {
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
//				LobbyManager.getInstance().showChannel(true,channelX);
				m_tfWarn.visible = true;
			}
		}
		
		
		
		
	}
}
module lobby.view.panel {
	export class PanelDialog_2 extends PanelWindow{
//		private var m_bg		:	BitmapScale9Grid;
		
		private var m_btnOk		:	SingleButtonMC;
		private var m_btnNo		:	SingleButtonMC;
		private var m_fOk		:	Function;
		private var m_btnRetry	:	SingleButtonMC;
		
		private var m_bShowMask	:	Boolean;
		
		public var fDestroyRun	:	Function;
		
		public constructor($bShake:Boolean=false , bShowMask	:Boolean = false , bSingleMode:Boolean = false, _fOk:Function=null , _fRetry:Function = null ) {
		
			super($bShake);
			m_bShowMask = bShowMask;
			m_fOk = _fOk;
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Dialog_Asset_2");
			this.addChild(m_mcAsset);
			m_mcAsset.tf_0.mouseEnabled=false;
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(342, 220);
//			m_bg.x = -171;
//			m_bg.y = -102;
			
			nAssetWidth = m_mcAsset.width;
			nAssetHeight = m_mcAsset.height;
			
			m_mcHot = m_mcAsset.mc_hot;
						
			m_btnOk = new SingleButtonMC(m_mcAsset.mc_ok, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				if(m_fOk!=null){
					m_fOk();
				}
//				LobbyManager.getInstance().uWindowIndex--;
//				PopupManager.getInstance().close(dialog);
				close();
			});
//			m_btnOk.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			m_btnNo = new SingleButtonMC(m_mcAsset.mc_close, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				LobbyManager.getInstance().uWindowIndex--;
//				PopupManager.getInstance().close(dialog);
				close();
				if( fDestroyRun != null ){
					fDestroyRun();
				}				
			});
//			m_btnNo.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			m_btnRetry = new SingleButtonMC( m_mcAsset.mc_retry, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				if(_fRetry!=null){
					_fRetry();
				}
//				LobbyManager.getInstance().uWindowIndex--;
//				PopupManager.getInstance().close(dialog);
				close();
			});
//			m_btnRetry.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			
			m_btnClose = new SingleButtonMC(m_mcAsset.mc_close, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				//				PopupManager.getInstance().close(dialog);
				close();
				if(fDestroyRun!=null){
					fDestroyRun();
				}
			});
//			m_btnClose.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			if( bSingleMode ) {
				m_btnRetry.visible = false;
				m_btnOk.mcAsset.x = -47;
			}
			
			onChangeLanguage();
		}
		
		override public function destroy():void{
			
			if(m_fOk != null){
				m_fOk = null;
			}
					
			//			if(m_bg){
			//				if(m_bg.parent){
			//					m_bg.parent.removeChild(m_bg);
			//				}
			//				m_bg = null;
			//			}
			
			if(m_btnOk){
				m_btnOk.destroy();
				m_btnOk = null;
			}
			if(m_btnNo){
				m_btnNo.destroy();
				m_btnNo = null;
			}
			
			if( m_btnRetry ){
				m_btnRetry.destroy();
				m_btnRetry = null;
			}			
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			

			
			super.destroy();
			
		}
		
		private function close():void{
			
			var dialog : PanelDialog_2 = this;
			TweenLite.to(dialog, Define.SPEED, {scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
				LobbyManager.getInstance().uWindowIndex--;
				
				LobbyManager.getInstance().uDialogCount--;
				if(LobbyManager.getInstance().uDialogCount==0){
					
					LobbyManager.getInstance().lobbyView.spWarn.graphics.clear();
				}
				
				if(dialog){
					if(dialog.parent){
						dialog.parent.removeChild(dialog);
					}
					dialog.destroy();
					dialog = null;
				}
			}});
		}
		
		public function text( _sValue:String ):void{
			m_mcAsset.tf_0.text = _sValue;
			m_mcAsset.tf_0.y = (m_mcAsset.height - (m_mcAsset.tf_0 as TextField).textHeight)/2 -105 ;
			m_mcAsset.tf_0.x = (m_mcAsset.width - (m_mcAsset.tf_0 as TextField).textWidth)/2 - m_mcAsset.width/2
		}
		
		override public function onChangeLanguage():void{
			m_btnOk.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnRetry.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);//LobbyManager.getInstance().getLanguageString(Language.sHint);
		}
	}
}

module lobby.view.panel {
	export class PanelDialog_2 extends PanelWindow{
//		private m_bg		:	BitmapScale9Grid;
		
		private m_btnOk		:	ui.button.SingleButtonMC;
		private m_btnNo		:	ui.button.SingleButtonMC;
		private m_fOk		:	Function;
		private m_btnRetry	:	ui.button.SingleButtonMC;
		
		private m_bShowMask	:	boolean;
		
		public fDestroyRun	:	Function;
		
		public constructor($bShake: boolean=false , bShowMask	: boolean = false , bSingleMode: boolean = false, _fOk:Function=null , _fRetry:Function = null ) {
		
			super($bShake);
			this.m_bShowMask = bShowMask;
			this.m_fOk = _fOk;
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Dialog_Asset_2");
			this.addChild(this.m_mcAsset);
			this.m_mcAsset.tf_0.mouseEnabled=false;
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			this.m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(342, 220);
//			m_bg.x = -171;
//			m_bg.y = -102;
			
			this.nAssetWidth = this.m_mcAsset.width;
			this.nAssetHeight = this.m_mcAsset.height;
			
			this.m_mcHot = this.m_mcAsset.mc_hot;
						
			this.m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc_ok, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				if(this.m_fOk!=null){
					this.m_fOk();
				}
//				manager.LobbyManager.getInstance().uWindowIndex--;
//				PopupManager.getInstance().close(dialog);
				close();
			});
//			this.m_btnOk.fOnOver = function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
//			};
			
			this.m_btnNo = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				manager.LobbyManager.getInstance().uWindowIndex--;
//				PopupManager.getInstance().close(dialog);
				close();
				if( this.fDestroyRun != null ){
					this.fDestroyRun();
				}				
			});
//			this.m_btnNo.fOnOver = function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
//			};
			
			this.m_btnRetry = new ui.button.SingleButtonMC( this.m_mcAsset.mc_retry, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				if(_fRetry!=null){
					_fRetry();
				}
//				manager.LobbyManager.getInstance().uWindowIndex--;
//				PopupManager.getInstance().close(dialog);
				close();
			});
//			this.m_btnRetry.fOnOver = function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
//			};
			
			
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				//				PopupManager.getInstance().close(dialog);
				close();
				if(this.fDestroyRun!=null){
					this.fDestroyRun();
				}
			});
//			m_btnClose.fOnOver = function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
//			};
			
			if( bSingleMode ) {
				this.m_btnRetry.visible = false;
				this.m_btnOk.mcAsset.x = -47;
			}
			
			this.onChangeLanguage();
		}
		
		 public destroy():void{
			
			if(this.m_fOk != null){
				this.m_fOk = null;
			}
					
			//			if(m_bg){
			//				if(m_bg.parent){
			//					m_bg.parent.removeChild(m_bg);
			//				}
			//				m_bg = null;
			//			}
			
			if(this.m_btnOk){
				this.m_btnOk.destroy();
				this.m_btnOk = null;
			}
			if(this.m_btnNo){
				this.m_btnNo.destroy();
				this.m_btnNo = null;
			}
			
			if( this.m_btnRetry ){
				this.m_btnRetry.destroy();
				this.m_btnRetry = null;
			}			
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			

			
			super.destroy();
			
		}
		
		private close():void{
			
			var dialog : PanelDialog_2 = this;
			egret.Tween.get(dialog).to({scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN}, define.Define.SPEED).call(function():void{
				manager.LobbyManager.getInstance().uWindowIndex--;
				
				manager.LobbyManager.getInstance().uDialogCount--;
				if(manager.LobbyManager.getInstance().uDialogCount==0){
					
					manager.LobbyManager.getInstance().lobbyView.spWarn.graphics.clear();
				}
				
				if(dialog){
					if(dialog.parent){
						dialog.parent.removeChild(dialog);
					}
					dialog.destroy();
					dialog = null;
				}
			});
		}
		
		public text( _sValue:String ):void{
			this.m_mcAsset.tf_0.text = _sValue;
			this.m_mcAsset.tf_0.y = (this.m_mcAsset.height - (this.m_mcAsset.tf_0).textHeight)/2 -105 ;
			this.m_mcAsset.tf_0.x = (this.m_mcAsset.width - (this.m_mcAsset.tf_0).textWidth)/2 - this.m_mcAsset.width/2
		}
		
		 public onChangeLanguage():void{
			this.m_btnOk.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_btnRetry.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);//manager.LobbyManager.getInstance().getLanguageString(Language.sHint);
		}
	}
}

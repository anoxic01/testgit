module lobby.view.panel {
	export class PanelDialog extends PanelWindow{
//		private m_bg		:	BitmapScale9Grid;
		
		private m_btnOk		:	ui.button.SingleButtonMC;
		private m_btnNo		:	ui.button.SingleButtonMC;
		private m_fOk		:	Function;
		private m_fNo		:	Function;
		private m_timer		:	timers.JTimer;
		private m_autoClose	:	number;
		
		public constructor($bShake: boolean=false, _fOk:Function=null, _fNo:Function=null, _bSingleMode: boolean=false, _autoClose:number=0) {
		
			super($bShake);
			
			this.m_fOk = _fOk;
			this.m_fNo = _fNo;
			this.m_autoClose = _autoClose;
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Dialog_Asset");
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
			
//			var mcClose : Button_Close_Asset = new Button_Close_Asset();
//			this.m_mcAsset.addChild(mcClose);
//			mcClose.x = this.m_mcAsset.mc_close.x;
//			mcClose.y = this.m_mcAsset.mc_close.y;
//			this.m_mcAsset.mc_close.visible = false;
			
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
			
			this.m_btnNo = new ui.button.SingleButtonMC(this.m_mcAsset.mc_no, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				PopupManager.getInstance().close(dialog);
				close();
				if(this.m_fNo!=null){
					this.m_fNo();
				}
			});
//			this.m_btnNo.fOnOver = function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
//			};
			
			
			if( _bSingleMode ) {
				this.m_btnNo.visible = false;
				this.m_btnOk.mcAsset.x = -47;
			}
			
			
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				PopupManager.getInstance().close(dialog);
				close();
				if(this.m_fNo!=null){
					this.m_fNo();
				}
			});
//			m_btnClose.fOnOver = function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
//			};
			
			this.onChangeLanguage();
			
			if(_autoClose>0){
				this.m_mcAsset.tf_time.text = String(_autoClose);
				/*this.m_timer = new Timer(1000,_autoClose);
				this.m_timer.addEventListener(TimerEvent.TIMER, countDown);
				this.m_timer.addEventListener(TimerEvent.TIMER_COMPLETE, autoClose);*/
				this.m_timer = timers.JTimer.getTimer(1000,_autoClose);
				this.m_timer.addTimerCallback(this.countDown, this.autoClose);
				this.m_timer.start();
			}else{
				this.m_mcAsset.tf_time.text = "";
			}
		}
		
		protected countDown():void
		{
			if(this.m_mcAsset){
				this.m_autoClose--;
				this.m_mcAsset.tf_time.text = String(this.m_autoClose);
				if(this.m_autoClose<0){
					this.m_mcAsset.tf_time.text = "";
				}
			}else{
				if(this.m_timer){
					/*this.m_timer.stop();
					this.m_timer.removeEventListener(TimerEvent.TIMER, countDown);
					this.m_timer.removeEventListener(TimerEvent.TIMER_COMPLETE,autoClose);*/
					this.m_timer.dispose();
					this.m_timer = null;
				}
			}
		}
		
		protected autoClose():void
		{
			
			if(this.m_timer){
				/*this.m_timer.stop();
				this.m_timer.removeEventListener(TimerEvent.TIMER, countDown);
				this.m_timer.removeEventListener(TimerEvent.TIMER_COMPLETE,autoClose);*/
				this.m_timer.dispose();
				this.m_timer = null;
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			close();
			if(this.m_fNo!=null){
				this.m_fNo();
			}
		}
		
		 public destroy():void{
			
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
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
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		private close():void{
			var target : PanelDialog = this;
			egret.Tween.get(target).to({scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN}, define.Define.SPEED).call(function():void{
				manager.LobbyManager.getInstance().uWindowIndex--;
				
				manager.LobbyManager.getInstance().uDialogCount--;
				if(manager.LobbyManager.getInstance().uDialogCount==0){
					manager.LobbyManager.getInstance().lobbyView.spWarn.graphics.clear();
				}
				
				if(target){
					if(target.parent){
						target.parent.removeChild(target);
					}
					
					target.destroy();
					target = null;
				}
				
			});
		}
		
		public text( _sValue:String ):void{
			this.m_mcAsset.tf_0.text = _sValue;
			this.m_mcAsset.tf_0.y = (this.m_mcAsset.height - (this.m_mcAsset.tf_0 ).textHeight)/2 -105 ;
			this.m_mcAsset.tf_0.x = (this.m_mcAsset.width - (this.m_mcAsset.tf_0 ).textWidth)/2 - this.m_mcAsset.width/2
		}
		
		 public onChangeLanguage():void{
			this.m_btnOk.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_btnNo.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);//manager.LobbyManager.getInstance().getLanguageString(Language.sHint);
		}
	}
}
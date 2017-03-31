module lobby.view.panel {
	export class PanelDialog extends PanelWindow{
//		private m_bg		:	BitmapScale9Grid;
		
		private m_btnOk		:	ui.button.SingleButtonMC;
		private m_btnNo		:	ui.button.SingleButtonMC;
		private m_btnClose	:	ui.button.SingleButtonMC;
		private m_fOk		:	Function;
		private m_fNo		:	Function;
		private m_timer		:	JTimer;
		private m_autoClose	:	number;
		
		public constructor($bShake: boolean=false, _fOk:Function=null, _fNo:Function=null, _bSingleMode: boolean=false, _autoClose:number=0) {
		
			super($bShake);
			
			m_fOk = _fOk;
			m_fNo = _fNo;
			m_autoClose = _autoClose;
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Dialog_Asset");
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
			
//			var mcClose : Button_Close_Asset = new Button_Close_Asset();
//			m_mcAsset.addChild(mcClose);
//			mcClose.x = m_mcAsset.mc_close.x;
//			mcClose.y = m_mcAsset.mc_close.y;
//			m_mcAsset.mc_close.visible = false;
			
			m_btnOk = new ui.button.SingleButtonMC(m_mcAsset.mc_ok, function(event:MouseEvent):void{
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
			
			m_btnNo = new ui.button.SingleButtonMC(m_mcAsset.mc_no, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				PopupManager.getInstance().close(dialog);
				close();
				if(m_fNo!=null){
					m_fNo();
				}
			});
//			m_btnNo.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			
			if( _bSingleMode ) {
				m_btnNo.visible = false;
				m_btnOk.mcAsset.x = -47;
			}
			
			
			m_btnClose = new ui.button.SingleButtonMC(m_mcAsset.mc_close, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				PopupManager.getInstance().close(dialog);
				close();
				if(m_fNo!=null){
					m_fNo();
				}
			});
//			m_btnClose.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			onChangeLanguage();
			
			if(_autoClose>0){
				m_mcAsset.tf_time.text = String(_autoClose);
				/*m_timer = new Timer(1000,_autoClose);
				m_timer.addEventListener(TimerEvent.TIMER, countDown);
				m_timer.addEventListener(TimerEvent.TIMER_COMPLETE, autoClose);*/
				m_timer = JTimer.getTimer(1000,_autoClose);
				m_timer.addTimerCallback(countDown,autoClose);
				m_timer.start();
			}else{
				m_mcAsset.tf_time.text = "";
			}
		}
		
		protected countDown():void
		{
			if(m_mcAsset){
				m_autoClose--;
				m_mcAsset.tf_time.text = String(m_autoClose);
				if(m_autoClose<0){
					m_mcAsset.tf_time.text = "";
				}
			}else{
				if(m_timer){
					/*m_timer.stop();
					m_timer.removeEventListener(TimerEvent.TIMER, countDown);
					m_timer.removeEventListener(TimerEvent.TIMER_COMPLETE,autoClose);*/
					m_timer.dispose();
					m_timer = null;
				}
			}
		}
		
		protected autoClose():void
		{
			
			if(m_timer){
				/*m_timer.stop();
				m_timer.removeEventListener(TimerEvent.TIMER, countDown);
				m_timer.removeEventListener(TimerEvent.TIMER_COMPLETE,autoClose);*/
				m_timer.dispose();
				m_timer = null;
			}
			
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			close();
			if(m_fNo!=null){
				m_fNo();
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
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		private close():void{
			var target : PanelDialog = this;
			TweenLite.to(target, Define.SPEED, {scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
				LobbyManager.getInstance().uWindowIndex--;
				
				LobbyManager.getInstance().uDialogCount--;
				if(LobbyManager.getInstance().uDialogCount==0){
					LobbyManager.getInstance().lobbyView.spWarn.graphics.clear();
				}
				
				if(target){
					if(target.parent){
						target.parent.removeChild(target);
					}
					
					target.destroy();
					target = null;
				}
				
			}});
		}
		
		public text( _sValue:String ):void{
			m_mcAsset.tf_0.text = _sValue;
			m_mcAsset.tf_0.y = (m_mcAsset.height - (m_mcAsset.tf_0 as TextField).textHeight)/2 -105 ;
			m_mcAsset.tf_0.x = (m_mcAsset.width - (m_mcAsset.tf_0 as TextField).textWidth)/2 - m_mcAsset.width/2
		}
		
		 public onChangeLanguage():void{
			m_btnOk.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnNo.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);//LobbyManager.getInstance().getLanguageString(Language.sHint);
		}
	}
}
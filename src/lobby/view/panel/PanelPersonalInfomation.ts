module lobby.view.panel {
	export class PanelPersonalinformation extends PanelWindow{
//		private m_bg			:	BitmapScale9Grid;		//背景
				
		public constructor() {
		
			super();
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Personal_Asset");
			this.addChild(this.m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_bg.setSize(192, 180);
//			this.m_mcAsset.addChildAt(m_bg, 0);
//			m_bg.x = -96;
//			m_bg.y = -83;
			
			this.nAssetWidth = 192;
			this.nAssetHeight = 180;
			
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close,function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hidePersonalinformation();
			});
			this.m_btnClose.enabled = false;
//			m_btnClose.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			this.refresh();
			this.onChangeLanguage();			
			
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
		}
		
		protected onclick(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			event.stopImmediatePropagation();
		}
		
		 public destroy():void
		{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		public  refresh():void{
			var str : string = model.Player.getInstance().sNickName;
			this.m_mcAsset.tf_7.text = str;
			this.m_mcAsset.tf_8.text = 	model.Player.getInstance().Country;
			switch(manager.LobbyManager.getInstance().lobbyAuth.Lang){
				case 0:
					this.m_mcAsset.tf_9.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sLanguage_CN);
					break;
				case 1:
					this.m_mcAsset.tf_9.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sLanguage_TW);
					break;
				case 2:
					this.m_mcAsset.tf_9.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sLanguage_EN);
					break;
			}
			this.m_mcAsset.tf_10.text = 	(model.Player.getInstance().nCoin).toString;
//			this.m_mcAsset.tf_11.text = 	String(Player.getInstance().nCoin);
//			this.m_mcAsset.tf_12.text = 	String(Player.getInstance().uOnline);
//			this.m_mcAsset.tf_13.text = 	String(Player.getInstance().gameSetting.UpperBetLimitId);
		}
		
		 public onChangeLanguage():void{
//			this.m_mcAsset.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_Label);
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			switch(manager.LobbyManager.getInstance().lobbyAuth.Lang){
				case 0:
					this.m_mcAsset.tf_9.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sLanguage_CN);
					break;
				case 1:
					this.m_mcAsset.tf_9.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sLanguage_TW);
					break;
				case 2:
					this.m_mcAsset.tf_9.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sLanguage_EN);
					break;
			}
//			this.m_mcAsset.tf_0.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_0) + ":";
//			this.m_mcAsset.tf_1.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_1) + ":";
//			this.m_mcAsset.tf_2.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_2) + ":";
//			this.m_mcAsset.tf_3.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_3) + ":";
//			this.m_mcAsset.tf_4.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_4) + ":";
//			this.m_mcAsset.tf_5.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_5) + ":";
//			this.m_mcAsset.tf_6.text = 	manager.LobbyManager.getInstance().getLanguageString(language.Language.sPersonal_6) + ":";
			
		}
		
		private getOnlineTime():String{
			var ms   = egret.getTimer();
			var s  = ms*0.001;
			var m  = s/60;
			var h  = m/60;
			var d  = ms*0.001/60/60/24;
			var str : String = String(d) + " ";
			
			if(h<10){
				str += "0" + String(h) + ":";
			}else{
				str += String(h) + ":";
			}
			
			return str;
		}
	}
}
module lobby.view.panel {
	export class PanelPersonalInfomation extends PanelWindow{
		private var m_btnClose		:	SingleButtonMC;			//关闭按钮
//		private var m_bg			:	BitmapScale9Grid;		//背景
				
		public constructor() {
		
			super();
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Personal_Asset");
			this.addChild(m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_bg.setSize(192, 180);
//			m_mcAsset.addChildAt(m_bg, 0);
//			m_bg.x = -96;
//			m_bg.y = -83;
			
			nAssetWidth = 192;
			nAssetHeight = 180;
			
			m_mcHot = m_mcAsset.mc_hot;
			
			m_btnClose = new SingleButtonMC(m_mcAsset.mc_close,function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hidePersonalInfomation();
			});
			m_btnClose.enabled = false;
//			m_btnClose.fOnOver = function():void{
//				SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
//			};
			
			refresh();
			onChangeLanguage();			
			
			this.addEventListener(MouseEvent.CLICK,onclick);
		}
		
		protected function onclick(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			event.stopImmediatePropagation();
		}
		
		override public function destroy():void
		{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			this.removeEventListener(MouseEvent.CLICK,onclick);
			
			if(m_btnClose){
				m_btnClose.destroy();
				m_btnClose = null;
			}
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		public function  refresh():void{
			var str : String = Player.getInstance().sNickName;
			m_mcAsset.tf_7.text = str;
			m_mcAsset.tf_8.text = 	Player.getInstance().Country;
			switch(LobbyManager.getInstance().lobbyAuth.Lang){
				case 0:
					m_mcAsset.tf_9.text = 	LobbyManager.getInstance().getLanguageString(Language.sLanguage_CN);
					break;
				case 1:
					m_mcAsset.tf_9.text = 	LobbyManager.getInstance().getLanguageString(Language.sLanguage_TW);
					break;
				case 2:
					m_mcAsset.tf_9.text = 	LobbyManager.getInstance().getLanguageString(Language.sLanguage_EN);
					break;
			}
			m_mcAsset.tf_10.text = 	String(Player.getInstance().nCoin);
//			m_mcAsset.tf_11.text = 	String(Player.getInstance().nCoin);
//			m_mcAsset.tf_12.text = 	String(Player.getInstance().uOnline);
//			m_mcAsset.tf_13.text = 	String(Player.getInstance().gameSetting.UpperBetLimitId);
		}
		
		override public function onChangeLanguage():void{
//			m_mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sPersonal_Label);
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			switch(LobbyManager.getInstance().lobbyAuth.Lang){
				case 0:
					m_mcAsset.tf_9.text = 	LobbyManager.getInstance().getLanguageString(Language.sLanguage_CN);
					break;
				case 1:
					m_mcAsset.tf_9.text = 	LobbyManager.getInstance().getLanguageString(Language.sLanguage_TW);
					break;
				case 2:
					m_mcAsset.tf_9.text = 	LobbyManager.getInstance().getLanguageString(Language.sLanguage_EN);
					break;
			}
//			m_mcAsset.tf_0.text = 	LobbyManager.getInstance().getLanguageString(Language.sPersonal_0) + ":";
//			m_mcAsset.tf_1.text = 	LobbyManager.getInstance().getLanguageString(Language.sPersonal_1) + ":";
//			m_mcAsset.tf_2.text = 	LobbyManager.getInstance().getLanguageString(Language.sPersonal_2) + ":";
//			m_mcAsset.tf_3.text = 	LobbyManager.getInstance().getLanguageString(Language.sPersonal_3) + ":";
//			m_mcAsset.tf_4.text = 	LobbyManager.getInstance().getLanguageString(Language.sPersonal_4) + ":";
//			m_mcAsset.tf_5.text = 	LobbyManager.getInstance().getLanguageString(Language.sPersonal_5) + ":";
//			m_mcAsset.tf_6.text = 	LobbyManager.getInstance().getLanguageString(Language.sPersonal_6) + ":";
			
		}
		
		private function getOnlineTime():String{
			var ms : int  = getTimer();
			var s : int = ms*0.001;
			var m : int = s/60;
			var h : int = m/60;
			var d : int = ms*0.001/60/60/24;
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
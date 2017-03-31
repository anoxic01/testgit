module lobby.view.panel {
	export class PanelTableEnter extends PanelWindow{
//		private m_bg			:	BitmapScale9Grid;
		private m_btnOk			:	ui.button.SingleButtonMC;
		private m_btnNo			:	ui.button.SingleButtonMC;
		private m_fQuickTable	:	Function;
		private m_struct		:	TableStruct;
		
		public constructor(_struct:TableStruct,$bShake: boolean=false, _fQuickTable:Function=null) {
		
			super($bShake);
			m_struct = _struct;
			m_fQuickTable = _fQuickTable;
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset,1,10,40,10,40);
//			this.addChild(m_bg);
//			m_bg.setSize(490,315);
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Table_Enter_Pwd_Asset");
			this.addChild(m_mcAsset);
			m_mcAsset.x = -int(m_mcAsset.width*0.5);
			m_mcAsset.y = -int(m_mcAsset.height*0.5);
//			m_bg.x = m_mcAsset.x;
//			m_bg.y = m_mcAsset.y;
			
			m_mcHot = new MovieClip();
			m_mcAsset.addChild(m_mcHot);
//			m_mcHot.graphics.beginFill(0x000000);
//			m_mcHot.graphics.drawRect(2,2,490,20);
//			m_mcHot.graphics.endFill();
			
			nAssetWidth = m_mcAsset.width;
			nAssetHeight = m_mcAsset.height;
			
			m_mcAsset.tf_1.text = "";
			m_mcAsset.tf_1.restrict = "0-9a-zA-Z`~!@#$%\\^&*()-=_+,./;'[]{}|:\"<>?";
			LobbyManager.getInstance().stage.focus = m_mcAsset.tf_1;
			
			m_btnOk = new ui.button.SingleButtonMC(m_mcAsset.mc_ok, btnOkEnter);
			
			m_btnNo = new ui.button.SingleButtonMC(m_mcAsset.mc_no, function(event:MouseEvent):void{
				LobbyManager.getInstance().hideTableEnterPwd();
			});
			
			onChangeLanguage();
			
			this.addEventListener(KeyboardEvent.KEY_DOWN,onKeyDown);
		}
		
		 public destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			this.removeEventListener(KeyboardEvent.KEY_DOWN,onKeyDown);
			
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
			
			if(m_struct){
				m_struct = null;
			}
			
			super.destroy();
		}
		
		 public onChangeLanguage():void{
			m_mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);;
			m_mcAsset.mc_ok.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_no.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
		protected onKeyDown(event:KeyboardEvent):void
		{
			if( event.charCode == Keyboard.ENTER ){
				btnOkEnter(null);
			}
		}
		
		private btnOkEnter(event:MouseEvent):void{
			this.removeEventListener(KeyboardEvent.KEY_DOWN,onKeyDown);
			
			m_struct.joinTbPwd = m_mcAsset.tf_1.text;
			
			LobbyManager.getInstance().hideTableEnterPwd(m_fQuickTable==null);
			
			if(m_fQuickTable!=null){
				m_fQuickTable();
			}else{
				LobbyManager.getInstance().enterGame(m_struct);
			}
			
		}
		
		
	}
}
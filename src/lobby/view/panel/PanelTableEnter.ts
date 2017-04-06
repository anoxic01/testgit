module lobby.view.panel {
	export class PanelTableEnter extends PanelWindow{
//		private m_bg			:	BitmapScale9Grid;
		private m_btnOk			:	ui.button.SingleButtonMC;
		private m_btnNo			:	ui.button.SingleButtonMC;
		private m_fQuickTable	:	Function;
		private m_struct		;
		
		public constructor(_struct,$bShake: boolean=false, _fQuickTable:Function=null) {
		
			super($bShake);
			this.m_struct = _struct;
			this.m_fQuickTable = _fQuickTable;
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset,1,10,40,10,40);
//			this.addChild(m_bg);
//			m_bg.setSize(490,315);
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Table_Enter_Pwd_Asset");
			this.addChild(this.m_mcAsset);
			this.m_mcAsset.x = -(this.m_mcAsset.width*0.5);
			this.m_mcAsset.y = -(this.m_mcAsset.height*0.5);
//			m_bg.x = this.m_mcAsset.x;
//			m_bg.y = this.m_mcAsset.y;
			
			this.m_mcHot = new egret.MovieClip();
			this.m_mcAsset.addChild(this.m_mcHot);
//			m_mcHot.graphics.beginFill(0x000000);
//			m_mcHot.graphics.drawRect(2,2,490,20);
//			m_mcHot.graphics.endFill();
			
			this.nAssetWidth = this.m_mcAsset.width;
			this.nAssetHeight = this.m_mcAsset.height;
			
			this.m_mcAsset.tf_1.text = "";
			this.m_mcAsset.tf_1.restrict = "0-9a-zA-Z`~!@#$%\\^&*()-=_+,./;'[]{}|:\"<>?";
			manager.LobbyManager.getInstance().stage.focus = this.m_mcAsset.tf_1;
			
			this.m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc_ok, this.btnOkEnter);
			
			this.m_btnNo = new ui.button.SingleButtonMC(this.m_mcAsset.mc_no, function(event:MouseEvent):void{
				manager.LobbyManager.getInstance().hideTableEnterPwd();
			});
			
			this.onChangeLanguage();
			
			manager.KeyBoardManager.instance.addListener(this.onKeyDown, this);
		}
		
		 public destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			manager.KeyBoardManager.instance.removeListener(this);
			
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
			
			if(this.m_struct){
				this.m_struct = null;
			}
			
			super.destroy();
		}
		
		 public onChangeLanguage():void{
			this.m_mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);;
			this.m_mcAsset.mc_ok.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_no.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
		protected onKeyDown(event:KeyboardEvent):void
		{
			// if( event.charCode == Keyboard.ENTER ){
			// 	btnOkEnter(null);
			// }
		}
		
		private btnOkEnter(event:MouseEvent):void{
			manager.KeyBoardManager.instance.removeListener( this);
			
			this.m_struct.joinTbPwd = this.m_mcAsset.tf_1.text;
			
			manager.LobbyManager.getInstance().hideTableEnterPwd(this.m_fQuickTable==null);
			
			if(this.m_fQuickTable!=null){
				this.m_fQuickTable();
			}else{
				manager.LobbyManager.getInstance().enterGame(this.m_struct);
			}
			
		}
		
		
	}
}
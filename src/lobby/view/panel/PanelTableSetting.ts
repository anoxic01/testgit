module lobby.view.panel {
	export class PanelTableSetting extends PanelWindow{
//		private m_bg			:	BitmapScale9Grid;
		private  m_btnOk		:	ui.button.SingleButtonMC;
		private  m_btnNo		:	ui.button.SingleButtonMC;
		private  m_select_0		;
		private  m_select_1		;
		private  m_select_2		;
		private  m_current		;
		private  m_struct		;
		private  m_fQuickTable	:	Function;
		private  m_bNeedInput	:	 boolean;							//需要输入密码
		
		private  tf_4 			;
		private  mc_label		;
		
		public constructor(_struct,$bShake: boolean=false,_fQuickTable:Function=null) {
		
			super($bShake);
			this.m_struct = _struct;
			this.m_fQuickTable = _fQuickTable;
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset,1,10,40,10,40);
//			this.addChild(m_bg);
//			m_bg.setSize(490,315);
			
			
			this.m_mcAsset =  manager.ResourceManager.getInstance().getInstanceByNameFromDomain( define.Define.SWF_PANEL,"Table_Setting_Pwd_Asset");
			this.addChild( this.m_mcAsset);
			this.m_mcAsset.x = -( this.m_mcAsset.width*0.5);
			this.m_mcAsset.y = -( this.m_mcAsset.height*0.5);
//			m_bg.x =  this.m_mcAsset.x;
//			m_bg.y =  this.m_mcAsset.y;
			
			this.m_mcHot = new egret.MovieClip();
			this.m_mcAsset.addChild(this.m_mcHot);
//			m_mcHot.graphics.beginFill(0x000000);
//			m_mcHot.graphics.drawRect(2,2,490,20);
//			m_mcHot.graphics.endFill();
			
			this.nAssetWidth =  this.m_mcAsset.width;
			this.nAssetHeight =  this.m_mcAsset.height;
			
			this.m_select_0 = new PanelTableSettingSelectItem( this.m_mcAsset.mc_0, define.GameDefine.SINGLE);
			this.m_select_1 = new PanelTableSettingSelectItem( this.m_mcAsset.mc_1, define.GameDefine.PUBLIC);
			this.m_select_2 = new PanelTableSettingSelectItem( this.m_mcAsset.mc_2, define.GameDefine.PRIVATE);
			this.m_mcAsset.mc_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			this.m_mcAsset.mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			this.m_mcAsset.mc_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			
			
			this.m_current =  this.m_select_0;
			this.m_current.select = true;
			
			this.m_mcAsset.mc_imput.gotoAndStop(2);
			this.tf_4 =  this.m_mcAsset.mc_imput. this.tf_4;
			this.tf_4.mouseEnabled = false;
//			this.tf_4.restrict = "^\u4e00-\u9fa5 ";
			this.tf_4.restrict = "0-9a-zA-Z`~!@#$%\\^&*()-=_+,./;'[]{}|:\"<>?";
			
			this.m_mcAsset.mc_imput.gotoAndStop(1);
			this.mc_label =  this.m_mcAsset.mc_imput. this.mc_label;
			
			this.m_btnOk = new ui.button.SingleButtonMC( this.m_mcAsset.mc_ok, this.btnOkEnter);
			
			this.m_btnNo = new ui.button.SingleButtonMC( this.m_mcAsset.mc_no, function(event:MouseEvent):void{
				manager.LobbyManager.getInstance().hideTableSetting();
			});
			
			this.onChangeLanguage();
			
			manager.KeyBoardManager.instance.addListener(this.onKeyDown, this);
		}
		
		protected onKeyDown(event:KeyboardEvent):void
		{
			// if( event.charCode == Keyboard.ENTER ){
			// 	this.btnOkEnter(null);
			// }
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
			
			if( this.m_select_0){
				 this.m_select_0.destroy();
				 this.m_select_0 = null;
			}
			if( this.m_select_1){
				 this.m_select_1.destroy();
				 this.m_select_1 = null;
			}
			if( this.m_select_2){
				 this.m_select_2.destroy();
				 this.m_select_2 = null;
			}
			
			if( this.m_btnOk){
				 this.m_btnOk.destroy();
				 this.m_btnOk = null;
			}
			if( this.m_btnNo){
				 this.m_btnNo.destroy();
				 this.m_btnNo = null;
			}
			
			if( this.m_mcAsset){
				 this.m_mcAsset.mc_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
				 this.m_mcAsset.mc_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
				 this.m_mcAsset.mc_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
				this.removeChild( this.m_mcAsset);
				 this.m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		private btnOkEnter(event:MouseEvent):void{
			if( this.m_bNeedInput){
				if( this.tf_4.text.length==0){
					 manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableEnter_0),function():void{
						 manager.LobbyManager.getInstance().stage.focus =  this.tf_4;
					},function():void{
						 manager.LobbyManager.getInstance().stage.focus =  this.tf_4;
					}, true);
					return;
				}
			}
			
			this.m_struct.joinTableType = model.type.JoinTableType.CHARTER_TABLE_OWNER;
			this.vipSetting( this.m_struct);
			
			manager.LobbyManager.getInstance().hideTableSetting( this.m_fQuickTable==null);
			
			if( this.m_fQuickTable != null){
				 this.m_fQuickTable();
			}else{
				 manager.LobbyManager.getInstance().enterGame( this.m_struct);
			}
		}
		
		 public onChangeLanguage():void{
			 this.m_mcAsset.mc_0. this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			 this.m_mcAsset.mc_1. this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			 this.m_mcAsset.mc_2. this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);

			 this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			 this.m_mcAsset.mc_ok. this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			 this.m_mcAsset.mc_no. this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		//临时代码
		private vipSetting(_struct):void{
			var csetting = new model.struct.CharterSettingStruct();
			csetting.CType =  this.m_current.uType;
			csetting.CPwd =  this.tf_4.text;
			csetting.Ret = 0;
			
			if (_struct.joinTableType>=4 && _struct.joinTableType<=6){
				_struct.CharterSettingInfo = csetting;
			}	
		}
		protected click(event:egret.Event):void
		{
			 this.m_current.select = false;
			
			switch(event.target.name){
				case "mc_0":
					 this.m_current =  this.m_select_0;
					 this.m_mcAsset.mc_imput.gotoAndStop(1);
					 this.mc_label =  this.m_mcAsset.mc_imput. this.mc_label;
					 this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
					 this.tf_4.mouseEnabled = false
					 this.m_bNeedInput = false;
					break;
				case "mc_1":
					 this.m_current =  this.m_select_1;
					 this.m_mcAsset.mc_imput.gotoAndStop(1);
					 this.mc_label =  this.m_mcAsset.mc_imput. this.mc_label;
					 this.mc_label.gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
					 this.tf_4.mouseEnabled = false
					 this.m_bNeedInput = false;
					break;
				case "mc_2":
					 this.m_current =  this.m_select_2;
					 this.m_mcAsset.mc_imput.gotoAndStop(2);
					 this.tf_4 =  this.m_mcAsset.mc_imput. this.tf_4;
//					 this.tf_4.restrict = "^\u4e00-\u9fa5 ";
					 this.tf_4.restrict = "0-9a-zA-Z`~!@#$%\\^&*()-=_+,./;'[]{}|:\"<>?";
					 manager.LobbyManager.getInstance().stage.focus =  this.tf_4;
					 this.tf_4.mouseEnabled = true;
					 this.m_bNeedInput = true;
					
					break;
			}
			
			 this.m_current.select = true;
		}
	}
}

module lobby.view.panel {
	export class PanelTableSetting extends PanelWindow{
//		private var m_bg			:	BitmapScale9Grid;
		private var m_mcAsset		:	*;
		private var m_btnOk			:	SingleButtonMC;
		private var m_btnNo			:	SingleButtonMC;
		private var m_select_0		:	SelectItem;
		private var m_select_1		:	SelectItem;
		private var m_select_2		:	SelectItem;
		private var m_current		:	SelectItem;
		private var m_struct		:	TableStruct;
		private var m_fQuickTable	:	Function;
		private var m_bNeedInput	:	Boolean;							//需要输入密码
		
		private var tf_4 			:	TextField;
		private var mc_label		:	MovieClip;
		
		public constructor(_struct:TableStruct,$bShake:Boolean=false,_fQuickTable:Function=null) {
		
			super($bShake);
			m_struct = _struct;
			m_fQuickTable = _fQuickTable;
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset,1,10,40,10,40);
//			this.addChild(m_bg);
//			m_bg.setSize(490,315);
			
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Table_Setting_Pwd_Asset");
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
			
			m_select_0 = new SelectItem(m_mcAsset.mc_0, GameDefine.SINGLE);
			m_select_1 = new SelectItem(m_mcAsset.mc_1, GameDefine.PUBLIC);
			m_select_2 = new SelectItem(m_mcAsset.mc_2, GameDefine.PRIVATE);
			m_mcAsset.mc_0.addEventListener(MouseEvent.CLICK, click);
			m_mcAsset.mc_1.addEventListener(MouseEvent.CLICK, click);
			m_mcAsset.mc_2.addEventListener(MouseEvent.CLICK, click);
			
			
			m_current = m_select_0;
			m_current.select = true;
			
			m_mcAsset.mc_imput.gotoAndStop(2);
			tf_4 = m_mcAsset.mc_imput.tf_4;
			tf_4.mouseEnabled = false;
//			tf_4.restrict = "^\u4e00-\u9fa5 ";
			tf_4.restrict = "0-9a-zA-Z`~!@#$%\\^&*()-=_+,./;'[]{}|:\"<>?";
			
			m_mcAsset.mc_imput.gotoAndStop(1);
			mc_label = m_mcAsset.mc_imput.mc_label;
			
			m_btnOk = new SingleButtonMC(m_mcAsset.mc_ok, btnOkEnter);
			
			m_btnNo = new SingleButtonMC(m_mcAsset.mc_no, function(event:MouseEvent):void{
				LobbyManager.getInstance().hideTableSetting();
			});
			
			onChangeLanguage();
			
			this.addEventListener(KeyboardEvent.KEY_DOWN,onKeyDown);
		}
		
		protected function onKeyDown(event:KeyboardEvent):void
		{
			if( event.charCode == Keyboard.ENTER ){
				btnOkEnter(null);
			}
		}
		override public function destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			this.removeEventListener(KeyboardEvent.KEY_DOWN,onKeyDown);
			
			if(m_select_0){
				m_select_0.destroy();
				m_select_0 = null;
			}
			if(m_select_1){
				m_select_1.destroy();
				m_select_1 = null;
			}
			if(m_select_2){
				m_select_2.destroy();
				m_select_2 = null;
			}
			
			if(m_btnOk){
				m_btnOk.destroy();
				m_btnOk = null;
			}
			if(m_btnNo){
				m_btnNo.destroy();
				m_btnNo = null;
			}
			
			if(m_mcAsset){
				m_mcAsset.mc_0.removeEventListener(MouseEvent.CLICK, click);
				m_mcAsset.mc_1.removeEventListener(MouseEvent.CLICK, click);
				m_mcAsset.mc_2.removeEventListener(MouseEvent.CLICK, click);
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		private function btnOkEnter(event:MouseEvent):void{
			if(m_bNeedInput){
				if(tf_4.text.length==0){
					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sTableEnter_0),function():void{
						LobbyManager.getInstance().stage.focus = tf_4;
					},function():void{
						LobbyManager.getInstance().stage.focus = tf_4;
					}, true);
					return;
				}
			}
			
			m_struct.joinTableType = JoinTableType.CHARTER_TABLE_OWNER;
			vipSetting(m_struct);
			
			LobbyManager.getInstance().hideTableSetting(m_fQuickTable==null);
			
			if(m_fQuickTable != null){
				m_fQuickTable();
			}else{
				LobbyManager.getInstance().enterGame(m_struct);
			}
		}
		
		override public function onChangeLanguage():void{
			m_mcAsset.mc_0.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_1.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_2.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);

			mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_ok.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_no.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		//临时代码
		private function vipSetting(_struct:TableStruct):void{
			var csetting:CharterSettingStruct = new CharterSettingStruct();
			csetting.CType = m_current.uType;
			csetting.CPwd = tf_4.text;
			csetting.Ret = 0;
			
			if (_struct.joinTableType>=4 && _struct.joinTableType<=6){
				_struct.CharterSettingInfo = csetting;
			}	
		}
		protected function click(event:MouseEvent):void
		{
			m_current.select = false;
			
			switch(event.target.name){
				case "mc_0":
					m_current = m_select_0;
					m_mcAsset.mc_imput.gotoAndStop(1);
					mc_label = m_mcAsset.mc_imput.mc_label;
					mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
					tf_4.mouseEnabled = false
					m_bNeedInput = false;
					break;
				case "mc_1":
					m_current = m_select_1;
					m_mcAsset.mc_imput.gotoAndStop(1);
					mc_label = m_mcAsset.mc_imput.mc_label;
					mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
					tf_4.mouseEnabled = false
					m_bNeedInput = false;
					break;
				case "mc_2":
					m_current = m_select_2;
					m_mcAsset.mc_imput.gotoAndStop(2);
					tf_4 = m_mcAsset.mc_imput.tf_4;
//					tf_4.restrict = "^\u4e00-\u9fa5 ";
					tf_4.restrict = "0-9a-zA-Z`~!@#$%\\^&*()-=_+,./;'[]{}|:\"<>?";
					LobbyManager.getInstance().stage.focus = tf_4;
					tf_4.mouseEnabled = true;
					m_bNeedInput = true;
					
					break;
			}
			
			m_current.select = true;
		}
	}
}


import flash.display.MovieClip;
import flash.events.MouseEvent;

import views.BSprite;

class SelectItem extends BSprite{
	private var m_mcAsset 	: 	MovieClip;
	private var m_bSelect	:	Boolean;
	public var uType		:	uint;
	
	public function SelectItem(_mc:MovieClip, _uType:uint){
		m_mcAsset = _mc;
		uType = _uType;
		
		m_mcAsset.buttonMode = true;
		m_mcAsset.addEventListener(MouseEvent.MOUSE_OVER,over);
		m_mcAsset.addEventListener(MouseEvent.MOUSE_OUT,out);
		m_mcAsset.mouseChildren = false;
		m_mcAsset.gotoAndStop(1);
	}
	override public function destroy():void{
		m_mcAsset.removeEventListener(MouseEvent.MOUSE_OVER,over);
		m_mcAsset.removeEventListener(MouseEvent.MOUSE_OUT,out);
		
		if(m_mcAsset){
			m_mcAsset = null;
		}
	}
	public function set select(_bValue:Boolean):void{
		if(m_bSelect!=_bValue){
			m_bSelect = _bValue;
			m_mcAsset.gotoAndStop(m_bSelect?2:1);
		}
		
	}
	
	protected function over(event:MouseEvent):void
	{
		if(m_bSelect){
			return;
		}
		m_mcAsset.gotoAndStop(2);
	}
	
	protected function out(event:MouseEvent):void
	{
		if(m_bSelect){
			return;
		}
		m_mcAsset.gotoAndStop(1);
	}
}
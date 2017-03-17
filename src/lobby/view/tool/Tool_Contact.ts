module lobby.view.tool {
	export class Tool_Contact implements ISprite{
		private var m_mcAsset		:	MovieClip;				//资源容器
		private var m_btnContact	:	ButtonA;				//联系客服
//		private var m_btnRecord		:	ButtonA;				//账户记录
		private var m_btnRule		:	ButtonA;				//游戏规则
		private var m_bStatus		:	Boolean	=	true;
//		private var m_bg			:	BitmapScale9Grid;		//背景
		
		public constructor( _mcAsset:MovieClip ) {
		
			m_mcAsset = _mcAsset;
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_bg.setSize(152, 120);
//			m_mcAsset.mcAsset.mc_bg.addChild(m_bg);
			
			m_btnContact = new ButtonA(_mcAsset.mcAsset.getChildByName("mc_contact") as MovieClip, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().js_call(Define.JS_Contact);
//				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
			});
//			m_btnRecord = new ButtonA(_mcAsset.mcAsset.getChildByName("mc_record") as MovieClip, function(evt:MouseEvent):void{
//				navigateToURL(new URLRequest("http://www.test2.com/record"), "_blank");
//			});
			m_btnRule = new ButtonA(_mcAsset.mcAsset.getChildByName("mc_rule") as MovieClip, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().js_call(Define.JS_Rule);
//				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
			});
			hide();
			
			onChangeLanguage();
		}
		
		public function destroy():void
		{
			if(m_btnContact){
				m_btnContact.destroy();
				m_btnContact = null;
			}
//			if(m_btnRecord){
//				m_btnRecord.destroy();
//				m_btnRecord = null;
//			}
			if(m_btnRule){
				m_btnRule.destroy();
				m_btnRule = null;
			}
			if(m_mcAsset){
				m_mcAsset = null;
			}
		}
		
		public function showOrHide():void{
			if(m_bStatus){
				hide();
			}else{
				show();
			}
		}
		
		public function show():void{
			if(!m_bStatus){
				m_mcAsset.gotoAndPlay("SHOW");
				m_bStatus = true;
			}
			
		}
		public function hide():void{
			if(m_bStatus){
				m_mcAsset.gotoAndPlay("HIDE");
				m_bStatus = false;
			}
		}
		
		public function onChangeLanguage():void{
			m_mcAsset.mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnContact.mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sTool_ContactService);
//			m_btnRecord.mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sTool_AccountRecord);
			m_btnRule.mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sTool_GameRule);
			
		}
		
		
	}
}
import flash.display.MovieClip;
import flash.events.MouseEvent;
import flash.text.TextField;

import IInterface.ISprite;

class ButtonA implements ISprite{
	public var mcAsset			:	MovieClip;
	public var fOnClick			:	Function;
	private var m_bSelectStatus	:	Boolean;
	
	public function ButtonA(mcButton:MovieClip, $fOnClick:Function){
		fOnClick = $fOnClick;
		mcAsset = mcButton;
		mcAsset.gotoAndStop("DEFAULT");
		
		addEvent();
	}
	
	public function destroy() : void
	{
		removeEvent();
		if (mcAsset)
		{
			mcAsset = null;
		}
		if (fOnClick != null)
		{
			fOnClick = null;
		}
		
	}
	
	private function addEvent() : void
	{
		if (mcAsset)
		{
			mcAsset.addEventListener("click", onClick);
			mcAsset.addEventListener("rollOver", over);
			mcAsset.addEventListener("rollOut", out);
		}
	}
	
	private function removeEvent() : void
	{
		if (mcAsset)
		{
			mcAsset.removeEventListener("click", onClick);
			mcAsset.removeEventListener("rollOver", over);
			mcAsset.removeEventListener("rollOut", out);
		}
	}
	
	private function onClick(event:MouseEvent) : void
	{
		if (fOnClick != null && !m_bSelectStatus)
		{
			this.fOnClick(event);
		}
	}
	
	protected function out(event:MouseEvent) : void
	{
		if(m_bSelectStatus){
			return;
		}
		mcAsset.gotoAndStop("DEFAULT");
		(mcAsset.tf_label as TextField).textColor = 0xcccccc;
	}
	
	protected function over(event:MouseEvent) : void
	{
		if(m_bSelectStatus){
			return;
		}
		mcAsset.gotoAndStop("HOVER");
		(mcAsset.tf_label as TextField).textColor = 0xffffff;
	}
	
}
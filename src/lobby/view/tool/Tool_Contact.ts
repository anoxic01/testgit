module lobby.view.tool {
	export class Tool_Contact implements iface.ISprite{
		private m_mcAsset		;				//资源容器
		private m_btnContact	:	ButtonA;				//联系客服
//		private m_btnRecord		:	ButtonA;				//账户记录
		private m_btnRule		:	ButtonA;				//游戏规则
		private m_bStatus		:	boolean	=	true;
//		private m_bg			:	BitmapScale9Grid;		//背景
		
		public constructor( _mcAsset ) {
			
			this.m_mcAsset = _mcAsset;
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_bg.setSize(152, 120);
//			this.m_mcAsset.mcAsset.mc_bg.addChild(m_bg);
			
// 			this.m_btnContact = new ButtonA(_mcAsset.mcAsset.mc_contact, function(evt:MouseEvent):void{
// 				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
// 				manager.LobbyManager.getInstance().js_call(define.Define.JS_Contact);
// //				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
// 			});
//			m_btnRecord = new ButtonA(_mcAsset.mcAsset.getChildByName("mc_record"), function(evt:MouseEvent):void{
//				navigateToURL(new URLRequest("http://www.test2.com/record"), "_blank");
//			});
// 			this.m_btnRule = new ButtonA(_mcAsset.mcAsset.mc_rule, function(evt:MouseEvent):void{
// 				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
// 				manager.LobbyManager.getInstance().js_call(define.Define.JS_Rule);
// //				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
// 			});
			this.hide();
			
			this.onChangeLanguage();
		}
		
		public destroy():void
		{
			if(this.m_btnContact){
				this.m_btnContact.destroy();
				this.m_btnContact = null;
			}
//			if(m_btnRecord){
//				m_btnRecord.destroy();
//				m_btnRecord = null;
//			}
			if(this.m_btnRule){
				this.m_btnRule.destroy();
				this.m_btnRule = null;
			}
			if(this.m_mcAsset){
				this.m_mcAsset = null;
			}
		}
		
		public showOrHide():void{
			if(this.m_bStatus){
				this.hide();
			}else{
				this.show();
			}
		}
		
		public show():void{
			if(!this.m_bStatus){
				this.m_mcAsset.gotoAndPlay("SHOW");
				this.m_bStatus = true;
			}
			
		}
		public hide():void{
			if(this.m_bStatus){
				this.m_mcAsset.gotoAndPlay("HIDE");
				this.m_bStatus = false;
			}
		}
		
		public onChangeLanguage():void{
			this.m_mcAsset.mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_btnContact.mcAsset.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTool_ContactService);
//			m_btnRecord.mcAsset.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(Language.sTool_AccountRecord);
			this.m_btnRule.mcAsset.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTool_GameRule);
			
		}
		
		
	}
	export class ButtonA implements iface.ISprite{
		public mcAsset			;
		public fOnClick			:	Function;
		private m_bSelectStatus	:	 boolean;
		
		public ButtonA(mcButton, $fOnClick:Function){
			this.fOnClick = $fOnClick;
			this.mcAsset = mcButton;
			this.mcAsset.gotoAndStop("DEFAULT");
			
			this.addEvent();
		}
		
		public destroy() : void
		{
			this.removeEvent();
			if (this.mcAsset)
			{
				this.mcAsset = null;
			}
			if (this.fOnClick != null)
			{
				this.fOnClick = null;
			}
			
		}
		
		private addEvent() : void
		{
			if (this.mcAsset)
			{
				this.mcAsset.addEventListener("click", this.onClick);
				this.mcAsset.addEventListener("rollOver", this.over);
				this.mcAsset.addEventListener("rollOut", this.out);
			}
		}
		
		private removeEvent() : void
		{
			if (this.mcAsset)
			{
				this.mcAsset.removeEventListener("click", this.onClick);
				this.mcAsset.removeEventListener("rollOver", this.over);
				this.mcAsset.removeEventListener("rollOut", this.out);
			}
		}
		
		private onClick(event:MouseEvent) : void
		{
			if (this.fOnClick != null && !this.m_bSelectStatus)
			{
				this.fOnClick(event);
			}
		}
		
		protected out(event:MouseEvent) : void
		{
			if(this.m_bSelectStatus){
				return;
			}
			this.mcAsset.gotoAndStop("DEFAULT");
			(this.mcAsset.tf_label).textColor = 0xcccccc;
		}
		
		protected over(event:MouseEvent) : void
		{
			if(this.m_bSelectStatus){
				return;
			}
			this.mcAsset.gotoAndStop("HOVER");
			(this.mcAsset.tf_label).textColor = 0xffffff;
		}
		
	}
}


module lobby.view.theme {
	export class ThemeItem extends egret.DisplayObjectContainer {

		private m_mcAsset 		;		//美术资源
		private m_bSelect		:	boolean	=	false;					//选中状态
		public themeStruct		;				//数据结构
		private m_themeList 	:	ThemeList;				//厅别列表
		private m_bmpLabel;												//标签位图
		private m_buttonMode 	: 	boolean	=	false;					//鼠标手型
		private sKey			:	string;						//标签键值
		
		public constructor($themeStruct, $themeList:ThemeList, $themeID:number) {
			super();
			this.m_themeList = $themeList;
			this.themeStruct = $themeStruct;
			this.themeStruct.ThemeID = $themeID;

			switch($themeID){			
				case define.Define.THEME_0:
					this.m_mcAsset = new ui.button.theme.Button_Theme_0();
					break;
				case define.Define.THEME_1:
					this.m_mcAsset = new ui.button.theme.Button_Theme_1();
					//临时处理
					this.themeStruct.IsTelBet = true;
					break;
				case define.Define.THEME_2:
					this.m_mcAsset = new ui.button.theme.Button_Theme_2();
					break;
				case define.Define.THEME_3:
					this.m_mcAsset = new ui.button.theme.Button_Theme_3();
					break;
				case define.Define.THEME_4:
					this.m_mcAsset = new ui.button.theme.Button_Theme_4();
					break;
				case define.Define.THEME_5:
					this.m_mcAsset = new ui.button.theme.Button_Theme_5();
					break;
				case define.Define.THEME_6:
					this.m_mcAsset = new ui.button.theme.Button_Theme_6();
					break;
			}
			
			if(this.m_mcAsset==null){
				console.log("厅馆按钮初始异常。。。", $themeID);
				return;
			}else{
				this.m_mcAsset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this)
			}
			this.addChild(this.m_mcAsset);

		}
		
		 public destroy():void{
			
			this.m_mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
//			this.m_mcAsset.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, onDown);
			
			if(this.m_bmpLabel){
				if(this.m_bmpLabel.parent){
					this.m_bmpLabel.parent.removeChild(this.m_bmpLabel);
				}
				this.m_bmpLabel = null;
			}
			
			if(this.m_themeList){
				this.m_themeList = null;
			}
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmpLabel){
				if(this.m_bSelect){
					this.m_bmpLabel.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.sKey+"_"+language.Language.sMouseOver);
					this.m_bmpLabel.smoothing = true;
					return;
				}
				this.onDefault();
			}
		}
		
		public setSelect(_bSelect: boolean):void{
			if(this.m_bSelect != _bSelect){
				this.m_bSelect = _bSelect;
				if(this.m_bSelect){
//					onMouseDown();
					this.onMouseOver();
				}else{
					this.onDefault();
				}
			}
		}
		
		get struct():model.struct.ThemeStruct{
			return this.themeStruct;
		}
		
		protected onOver(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
//			manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
			this.onMouseOver();
		}
		
		protected onOut(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.onDefault();
		}
		
		
//		protected onDown(event:MouseEvent):void
//		{
//			if(this.m_bSelect){
//				return;
//			}
//			onMouseDown();
//		}
		
		public autoClick():void
		{
			this.onClick(null);
		}
		
		protected onClick(event:MouseEvent):void
		{
			if(this.themeStruct==null){
				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlease_Wait));
				return;
			}
			if(this.m_bSelect){
				return;
			}
			
			if(this.m_themeList){
				this.m_themeList.setCurrent(this);
			}
			
			console.log("themeID:" +  this.themeStruct.ThemeID );
			
			//屏蔽厅馆按钮
			if( this.themeStruct.ThemeID != config.TemConfig.getInstance().PhoneBetID ){   //臨時處理
				manager.LobbyManager.getInstance().lobbyView.themeList.enable(false);
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
			console.log("切换厅别。。。", this.touchEnabled);
		}
		
		private onDefault():void{
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop("DEFAULT");
			}
			if(this.m_bmpLabel){
				this.m_bmpLabel.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.sKey+"_"+language.Language.sDefault);
				this.m_bmpLabel.smoothing = true;
			}
			
		}
		private onMouseOver():void{
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop("HOVER");
			}
			if(this.m_bmpLabel){
				this.m_bmpLabel.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.sKey+"_"+language.Language.sMouseOver);
				this.m_bmpLabel.smoothing = true;
			}
			
			
		}
//		private onMouseDown():void{
//			this.m_mcAsset.gotoAndStop("HDOWN");
//		}
		
	}
}
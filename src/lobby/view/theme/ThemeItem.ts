module lobby.view.theme {
	export class ThemeItem extends egret.DisplayObjectContainer {

		private m_mcAsset 		:	ui.button.theme.Button_Theme;		//美术资源
		private m_bSelect		:	 boolean	=	false;					//选中状态
		public themeStruct		:	struct.ThemeStruct;				//数据结构
		private m_themeList 	:	ThemeList;				//厅别列表
		private m_bmpLabel;												//标签位图
		private m_buttonMode 	: 	 boolean	=	false;					//鼠标手型
		
		public constructor($themeID:number, $themeList:ThemeList) {
			super();
			this.m_themeList = $themeList;
			this.themeStruct = new struct.ThemeStruct();
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
			
			m_mcAsset.removeEventListener(MouseEvent.CLICK, onClick);
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OVER, onOver);
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OUT, onOut);
//			m_mcAsset.removeEventListener(MouseEvent.MOUSE_DOWN, onDown);
			
			if(m_bmpLabel){
				if(m_bmpLabel.parent){
					m_bmpLabel.parent.removeChild(m_bmpLabel);
				}
				m_bmpLabel = null;
			}
			
			if(m_themeList){
				m_themeList = null;
			}
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		
		 public onChangeLanguage():void{
			if(m_bmpLabel){
				if(m_bSelect){
					m_bmpLabel.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, sKey+"_"+Language.sMouseOver);
					m_bmpLabel.smoothing = true;
					return;
				}
				onDefault();
			}
		}
		
		public setSelect(_bSelect: boolean):void{
			if(m_bSelect != _bSelect){
				m_bSelect = _bSelect;
				if(m_bSelect){
//					onMouseDown();
					onMouseOver();
				}else{
					onDefault();
				}
			}
		}
		
		get struct():ThemeStruct{
			return m_themeStruct;
		}
		
		protected onOver(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
//			SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
			onMouseOver();
		}
		
		protected onOut(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			onDefault();
		}
		
		
//		protected onDown(event:MouseEvent):void
//		{
//			if(m_bSelect){
//				return;
//			}
//			onMouseDown();
//		}
		
		public autoClick():void
		{
			onClick(null);
		}
		
		protected onClick(event:MouseEvent):void
		{
			if(m_themeStruct==null){
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				return;
			}
			if(m_bSelect){
				return;
			}
			
			if(m_themeList){
				m_themeList.setCurrent(this);
			}
			
			console.log("themeID:" +  m_themeStruct.ThemeID );
			
			//屏蔽厅馆按钮
			if( m_themeStruct.ThemeID != TemConfig.getInstance().PhoneBetID ){   //臨時處理
				LobbyManager.getInstance().lobbyView.themeList.enable(false);
			}
			
			SoundManager.getInstance().play(SoundPackage.sChangePage);
			console.log("切换厅别。。。", this.mouseEnabled);
		}
		
		private onDefault():void{
			if(m_mcAsset){
				m_mcAsset.gotoAndStop("DEFAULT");
			}
			if(m_bmpLabel){
				m_bmpLabel.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, sKey+"_"+Language.sDefault);
				m_bmpLabel.smoothing = true;
			}
			
		}
		private onMouseOver():void{
			if(m_mcAsset){
				m_mcAsset.gotoAndStop("HOVER");
			}
			if(m_bmpLabel){
				m_bmpLabel.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, sKey+"_"+Language.sMouseOver);
				m_bmpLabel.smoothing = true;
			}
			
			
		}
//		private onMouseDown():void{
//			m_mcAsset.gotoAndStop("HDOWN");
//		}
		
	}
}
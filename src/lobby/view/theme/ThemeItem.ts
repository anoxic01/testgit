module lobby.view.theme {
	export class ThemeItem extends egret.DisplayObjectContainer {

		private m_mcAsset 		:	ui.button.theme.Button_Theme;		//美术资源
		private m_bSelect		:	boolean	=	false;					//选中状态
		public themeStruct		:	struct.Struct_Theme;				//数据结构
		private m_themeList 	:	ThemeList;				//厅别列表
		private m_bmpLabel;												//标签位图
		private m_buttonMode 	: 	boolean	=	false;					//鼠标手型
		
		public constructor($themeID:number, $themeList:ThemeList) {
			super();
			this.m_themeList = $themeList;
			this.themeStruct = new struct.Struct_Theme();
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

		public setSelect($value:boolean):void{
			this.m_mcAsset.setSelect($value);
		}

		private onClick(evt:egret.TouchEvent):void{
			if(this.themeStruct==null){
				//manager.LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				return;
			}
			if(this.m_mcAsset.bSelect){
				return;
			}
			
			if(this.m_themeList){
				this.m_themeList.setCurrent(this);
			}
			
			//屏蔽厅馆按钮
			// if( this.themeStruct.ThemeID != config.TemConfig.getInstance().PhoneBetID ){   //臨時處理
			// 	manager.LobbyManager.getInstance().lobbyView.themeList.enable(false);
			// }
		}

		
	}
}
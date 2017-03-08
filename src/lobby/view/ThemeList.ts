module lobby.view {
	export class ThemeList extends egret.DisplayObjectContainer {

		private m_vecTheme		:	lobby.view.ThemeItem[];				//所有厅馆
		private m_vectorThemeList;										//主题数据
		
		private m_currentTheme 	: 	lobby.view.ThemeItem;				//当前主题
		
		private _index;
		private _count;
		private _time;

		public constructor() {
			super();

			let bg = tool.BitmapTool.getInstance().createBitmapByName("theme_bg_png");
			this.addChild(bg);

			this.setData();
		}

		public setData():void{
			let m_vectorThemeList = [define.Define.THEME_2,
									define.Define.THEME_0,
									define.Define.THEME_3,
									define.Define.THEME_4,
									define.Define.THEME_5,
									define.Define.THEME_6,
									define.Define.THEME_1];
			let _index = 0;
			this.m_vecTheme = new Array();

			for (let i:number = 0; i < 7; i++) 
			{
				let themeItem = new lobby.view.ThemeItem(m_vectorThemeList[i], this);
				this.addChild(themeItem);
				themeItem.x = 274 * _index;
				this.m_vecTheme.push(themeItem);
				_index++;
				
				/*if(m_vectorThemeList[i]==data.DataLobby.getInstance().lobbyInfo.DefThemeID){
					this.m_currentTheme = themeItem;
				}*/
				
			}
			
			if(this.m_currentTheme){
				this.m_currentTheme.setSelect(true);
			}else{
				// console.log("没有设置默认厅馆...");
			}
		}

		public setCurrent($themeItem:lobby.view.ThemeItem):void{
			if($themeItem.themeStruct.IsTelBet){
				// manager.LobbyManager.getInstance().enterTelLobby();
				return;
			}
			
			
			if($themeItem.themeStruct.ThemeID == define.Define.THEME_2){
				//屏蔽退出按钮
				// manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = false;
				// manager.LobbyManager.getInstance().lobbyView.enableQuick(false);
				// manager.LobbyManager.getInstance().sendSubscribeTheme(-1, this.m_currentTheme.themeStruct.ThemeID);
				//请求多桌 接口 不直接显示界面
				// manager.LobbyManager.getInstance().lobbyView.showLoading();
				// manager.LobbyManager.getInstance().setMultiSocket();
				// manager.LobbyManager.getInstance().sendMultiTableEntry();
			}
			else{
				//manager.LobbyManager.getInstance().sendSubscribeTheme($themeItem.themeStruct.ThemeID, this.m_currentTheme.themeStruct.ThemeID);
				
				if(this.m_currentTheme){
					this.m_currentTheme.setSelect(false);
				}
				$themeItem.setSelect(true);
				this.m_currentTheme = $themeItem;
			}
		}

		public enable($value:boolean):void{
			var _len : number = this.m_vecTheme.length;
			for (var i:number = 0; i < _len; i++) 
			{
				this.m_vecTheme[i].touchEnabled = $value;
				this.m_vecTheme[i].touchChildren = $value;
				mouse.setButtonMode(this.m_vecTheme[i], $value);
			}
		}
	}
}
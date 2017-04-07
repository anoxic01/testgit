module lobby.view.theme {
	export class ThemeList extends BSprite {

		private m_vecTheme		:	ThemeItem[];				//所有厅馆
		private m_vectorThemeList;										//主题数据
		
		public m_currentTheme 	: 	ThemeItem;				//当前主题
		
		private _index;
		private _count;
		private _time;

		public constructor() {
			
			super();
			this.m_vecTheme = new Array<ThemeItem>();
			
//			var time:JTimer = JTimer.getTimer(1500,int.MAX_VALUE);
//			time.addTimerCallback(autoClick);
//			time.reset();
//			time.start();
		}
		
		private autoClick():void
		{
			var len:number= this.m_vecTheme.length-1;
			var index:number;
			do
			{
				index = len*Math.random();
			}
			while(index==0 || index==this._index);
			
			this._index = index;
			this._count++;
			var now:number= egret.getTimer();
			console.log(this,"index: "+index+" time: "+(now-this._time)+" count: "+this._count);
			this._time = now;
			var i:ThemeItem = this.m_vecTheme[index];
			i.autoClick();
		}
		
		get currentTheme():ThemeItem
		{
			return this.m_currentTheme;
		}

		set  currentTheme(value:ThemeItem)
		{
			this.m_currentTheme = value;
		}

		 public destroy():void{
			if(this.m_vecTheme){
				var themeItem : ThemeItem;
				while(this.m_vecTheme.length>0){
					themeItem = this.m_vecTheme.pop();
					this.removeChild(themeItem);
					themeItem.destroy();
				}
				themeItem = null;
			}
			
			
		}
		
		public setData():void{
			this.m_vectorThemeList = model.LobbyData.getInstance().lobbyInfo.themeVec;
			var themeItem : ThemeItem;
			var _aTheme	:	any[] =  config.TemConfig.getInstance().ThemeList.slice();
			
			var _iLen   = this.m_vectorThemeList.length;
			var _index : number;
			
			//临时模拟多桌
			var _multiThemeStruct  = new model.struct.ThemeStruct({"ThemeID":Define.THEME_MULTI_TABLE,"TableList":[]});
			themeItem = new ThemeItem(_multiThemeStruct, this, Define.THEME_MULTI_TABLE);
			this.addChild(themeItem);
			themeItem.x = (themeItem.width) * _index;
			this.m_vecTheme.push(themeItem);
			_index++;
			
			for (var i:number= 0; i < _iLen; i++) 
			{
				themeItem = new ThemeItem(this.m_vectorThemeList[i], this, this.m_vectorThemeList[i].ThemeID);
				_aTheme.splice(_aTheme.indexOf(this.m_vectorThemeList[i].ThemeID),1);
				this.addChild(themeItem);
				themeItem.x = (themeItem.width) * _index;
				this.m_vecTheme.push(themeItem);
				_index++;
				
				if(this.m_vectorThemeList[i].ThemeID==LobbyData.getInstance().lobbyInfo.DefThemeID){
					this.currentTheme = themeItem;
				}
				
			}
			for (var j:number= 0; j < _aTheme.length; j++) 
			{
				themeItem = new ThemeItem(null, this, _aTheme[j]);
				this.addChild(themeItem);
				themeItem.x = (themeItem.width) * _index;
				this.m_vecTheme.push(themeItem);
				_index++;
			}
			
			themeItem = null;
			
			if(this.currentTheme){
				this.currentTheme.setSelect(true);
			}else{
				console.log("没有设置默认厅馆...");
			}
		}
		
		public setCurrent(_themeItem:ThemeItem):void{
			if(_themeItem.struct.IsTelBet){
				manager.LobbyManager.getInstance().enterTelLobby();
				return;
			}
			
			
			if(_themeItem.struct.ThemeID == Define.THEME_MULTI_TABLE){
				//屏蔽退出按钮
				manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = false;
				manager.LobbyManager.getInstance().lobbyView.enableQuick(false);
				manager.LobbyManager.getInstance().sendSubscribeTheme(-1, this.currentTheme.struct.ThemeID);
				//请求多桌 接口 不直接显示界面
				manager.LobbyManager.getInstance().lobbyView.showLoading();
				manager.LobbyManager.getInstance().setMultiSocket();
				manager.LobbyManager.getInstance().sendMultiTableEntry();
				//manager.LobbyManager.getInstance().showMultiTable();
			}
			else{
				manager.LobbyManager.getInstance().sendSubscribeTheme(_themeItem.struct.ThemeID, this.currentTheme.struct.ThemeID);
				
				this.currentTheme.setSelect(false);
				_themeItem.setSelect(true);
				this.currentTheme = _themeItem;
			}
			
			manager.TimeManager.getInstance().addFun(manager.LobbyManager.getInstance().subscripThemeTimeToShowLoading, 1000);
			manager.TimeManager.getInstance().addFun(manager.LobbyManager.getInstance().subscripThemeTimeToHint, 15000);
			
		}
		
		public setDefaultThemeButtonSelect():void{
			if(this.m_vectorThemeList.length>0){
				this.setCurrentThemeButtonSelect(this.m_vectorThemeList[0].ThemeID);
			}else{
				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(Language.sAll_Table_Maintenance));
			}
		}
		
		public setCurrentThemeButtonSelect( _iThemeId:number):void {
			if( this.m_vecTheme[_iThemeId] ){
				if(this.currentTheme){
					this.currentTheme.setSelect(false);
				}
				this.currentTheme = this.m_vecTheme[_iThemeId];
				this.currentTheme.setSelect(true);	
			}
		}
		
		 public onChangeLanguage():void{
			if(this.m_vecTheme){
				var _len  = this.m_vecTheme.length;
				var themeItem : ThemeItem;
				for (var i:number= 0; i < _len; i++) 
				{
					themeItem = this.m_vecTheme[i];
					themeItem.onChangeLanguage();
//					if(m_aTheme[i-1]){
//						themeItem.x = m_aTheme[i-1].x + m_aTheme[i-1].width + 20;
//					}else{
//						themeItem.x = 50;
//					}
					
				}
				themeItem = null;
			}
		}
		
		public enable(_bValue: boolean):void{
			var _len  = this.m_vecTheme.length;
			for (var i:number= 0; i < _len; i++) 
			{
				this.m_vecTheme[i].touchEnabled = _bValue;
				this.m_vecTheme[i].touchChildren = _bValue;
				this.m_vecTheme[i].touchEnabled = _bValue;
			}
		}
		
		public setMaintain(_themeID:number, bMaintain: boolean):void{
			var _len  = this.m_vecTheme.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.m_vecTheme[i].struct.ThemeID == _themeID){
					this.m_vecTheme[i].struct.IsMaintaining = bMaintain;
					break;
				}
			}
		}
		
	}
}
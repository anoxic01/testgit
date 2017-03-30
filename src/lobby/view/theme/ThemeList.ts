module lobby.view.theme {
	export class ThemeList extends BSprite {

		private m_vecTheme		:	ThemeItem[];				//所有厅馆
		private m_vectorThemeList;										//主题数据
		
		public currentTheme 	: 	ThemeItem;				//当前主题
		
		private _index;
		private _count;
		private _time;

		public constructor() {
			
			super();
			m_vecTheme = new <ThemeItem>();
			
//			var time:JTimer = JTimer.getTimer(1500,int.MAX_VALUE);
//			time.addTimerCallback(autoClick);
//			time.reset();
//			time.start();
		}
		
		private autoClick():void
		{
			var len:number= m_vecTheme.length-1;
			var index:number;
			do
			{
				index = len*Math.random();
			}
			while(index==0 || index==_index);
			
			_index = index;
			_count++;
			var now:number= getTimer();
			Log.getInstance().log(this,"index: "+index+" time: "+(now-_time)+" count: "+_count);
			_time = now;
			var i:ThemeItem = m_vecTheme[index];
			i.autoClick();
		}
		
		get currentTheme():ThemeItem
		{
			return m_currentTheme;
		}

		set  currentTheme(value:ThemeItem)
		{
			m_currentTheme = value;
		}

		 public destroy():void{
			if(m_vecTheme){
				var themeItem : ThemeItem;
				while(m_vecTheme.length>0){
					themeItem = m_vecTheme.pop();
					this.removeChild(themeItem);
					themeItem.destroy();
				}
				themeItem = null;
			}
			
			
		}
		
		public setData():void{
			m_vectorThemeList = LobbyData.getInstance().lobbyInfo.themeVec;
			var themeItem : ThemeItem;
			var _aTheme	:	any[] =  TemConfig.getInstance().ThemeList.slice();
			
			var _iLen  : int = m_vectorThemeList.length;
			var _index : number;
			
			//临时模拟多桌
			var _multiThemeStruct : ThemeStruct = new ThemeStruct({"ThemeID":Define.THEME_MULTI_TABLE,"TableList":[]});
			themeItem = new ThemeItem(_multiThemeStruct, this, Define.THEME_MULTI_TABLE);
			this.addChild(themeItem);
			themeItem.x = (themeItem.width) * _index;
			m_vecTheme.push(themeItem);
			_index++;
			
			for (var i:number= 0; i < _iLen; i++) 
			{
				themeItem = new ThemeItem(m_vectorThemeList[i], this, m_vectorThemeList[i].ThemeID);
				_aTheme.splice(_aTheme.indexOf(m_vectorThemeList[i].ThemeID),1);
				this.addChild(themeItem);
				themeItem.x = (themeItem.width) * _index;
				m_vecTheme.push(themeItem);
				_index++;
				
				if(m_vectorThemeList[i].ThemeID==LobbyData.getInstance().lobbyInfo.DefThemeID){
					currentTheme = themeItem;
				}
				
			}
			for (var j:number= 0; j < _aTheme.length; j++) 
			{
				themeItem = new ThemeItem(null, this, _aTheme[j]);
				this.addChild(themeItem);
				themeItem.x = (themeItem.width) * _index;
				m_vecTheme.push(themeItem);
				_index++;
			}
			
			themeItem = null;
			
			if(currentTheme){
				currentTheme.setSelect(true);
			}else{
				console.log("没有设置默认厅馆...");
			}
		}
		
		public setCurrent(_themeItem:ThemeItem):void{
			if(_themeItem.struct.IsTelBet){
				LobbyManager.getInstance().enterTelLobby();
				return;
			}
			
			
			if(_themeItem.struct.ThemeID == Define.THEME_MULTI_TABLE){
				//屏蔽退出按钮
				LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = false;
				LobbyManager.getInstance().lobbyView.enableQuick(false);
				LobbyManager.getInstance().sendSubscribeTheme(-1, currentTheme.struct.ThemeID);
				//请求多桌 接口 不直接显示界面
				LobbyManager.getInstance().lobbyView.showLoading();
				LobbyManager.getInstance().setMultiSocket();
				LobbyManager.getInstance().sendMultiTableEntry();
				//LobbyManager.getInstance().showMultiTable();
			}
			else{
				LobbyManager.getInstance().sendSubscribeTheme(_themeItem.struct.ThemeID, currentTheme.struct.ThemeID);
				
				currentTheme.setSelect(false);
				_themeItem.setSelect(true);
				currentTheme = _themeItem;
			}
			
			TimeManager.getInstance().addFun(LobbyManager.getInstance().subscripThemeTimeToShowLoading, 1000);
			TimeManager.getInstance().addFun(LobbyManager.getInstance().subscripThemeTimeToHint, 15000);
			
		}
		
		public setDefaultThemeButtonSelect():void{
			if(m_vectorThemeList.length>0){
				setCurrentThemeButtonSelect(m_vectorThemeList[0].ThemeID);
			}else{
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sAll_Table_Maintenance));
			}
		}
		
		public setCurrentThemeButtonSelect( _iThemeId:number):void {
			if( m_vecTheme[_iThemeId] ){
				if(currentTheme){
					currentTheme.setSelect(false);
				}
				currentTheme = m_vecTheme[_iThemeId];
				currentTheme.setSelect(true);	
			}
		}
		
		 public onChangeLanguage():void{
			if(m_vecTheme){
				var _len : int = m_vecTheme.length;
				var themeItem : ThemeItem;
				for (var i:number= 0; i < _len; i++) 
				{
					themeItem = m_vecTheme[i];
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
			var _len : int = m_vecTheme.length;
			for (var i:number= 0; i < _len; i++) 
			{
				m_vecTheme[i].mouseEnabled = _bValue;
				m_vecTheme[i].mouseChildren = _bValue;
				m_vecTheme[i].buttonMode = _bValue;
			}
		}
		
		public setMaintain(_themeID:number, bMaintain: boolean):void{
			var _len : int = m_vecTheme.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(m_vecTheme[i].struct.ThemeID == _themeID){
					m_vecTheme[i].struct.IsMaintaining = bMaintain;
					break;
				}
			}
		}
		
	}
}
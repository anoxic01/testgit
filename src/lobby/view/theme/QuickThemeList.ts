module lobby.view.theme {
	export class QuickThemeList extends BSprite{
		private m_mcAsset				:	*;
		private m_vecTheme			:	<QuickThemeItem>;		//所有厅馆
		private m_vectorThemeList	:	<ThemeStruct>;			//主题数据
		
		private m_currentTheme		:	QuickThemeItem;					//当前主题
		public iCurrentTheme		:	int	=	-1;						//当前主题
		public bInit				:	 boolean;						//初始状态
		
		public m_btnDownApp			:	ui.button.SingleButtonMC;					//下载APP
		public mc_btnStatistics		:	ui.button.SingleButtonMC;					//统计

		private mcStatistics:MovieClip;
		private bgApp:MovieClip;
		
		private _gameID:number;
		public constructor() {
		
			super();
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_Theme_List_Bg_Asset") ;
			m_mcAsset.cacheAsBitmap=true;
			this.addChild(m_mcAsset);
			
			m_btnDownApp = new ui.button.SingleButtonMC(m_mcAsset.mc_1,function(event:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				MobileAppManager.getInstance().togglePanel();
			})
			m_btnDownApp.mcAsset.mc.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_1.visible = false;
			m_btnDownApp.enabled = false;
			
			bgApp = m_mcAsset.bgApp;
			mcStatistics = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"mc_btnStatistics") ;
			mcStatistics.x = m_mcAsset.mc_1.x;
			mcStatistics.y = m_mcAsset.mc_1.y+m_mcAsset.mc_1.height+15;
			mcStatistics.label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			mc_btnStatistics = new ui.button.SingleButtonMC(mcStatistics,function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				if(_gameID == GameDefine.SIC)
				{
					LobbyManager.getInstance().showGameStatistic();
				}
				else if(_gameID == GameDefine.ROU)
				{
					LobbyManager.getInstance().showGameStatistic();
				}
			});
			
			bInit = true;
		}
		
		get currentTheme():QuickThemeItem
		{
			return m_currentTheme;
		}

		set  currentTheme(value:QuickThemeItem)
		{
			m_currentTheme = value;
		}

		 public destroy():void{
			if(m_vecTheme){
				var themeItem : QuickThemeItem;
				while(m_vecTheme.length>0){
					themeItem = m_vecTheme.pop();
					this.removeChild(themeItem);
					themeItem.destroy();
				}
				themeItem = null;
			}
			
			if(m_btnDownApp){
				m_btnDownApp.destroy();
				m_btnDownApp = null;
			}
			if(mc_btnStatistics){
				mc_btnStatistics.destroy();
				mc_btnStatistics = null;
				mcStatistics = null;
			}
		}
		
		public setData():void{
			
			m_vectorThemeList = LobbyData.getInstance().lobbyInfo.themeVec;
			m_vecTheme = new <QuickThemeItem>;
			var themeItem : QuickThemeItem;
			var _aTheme	:	any[] =  TemConfig.getInstance().ThemeList.slice();
			
			var _iFindThemeId	: 	int	  = -1;
			
			var _iLen  : int = m_vectorThemeList.length;
			var _index : number;
			
			//临时模拟多桌
			var _multiThemeStruct : ThemeStruct = new ThemeStruct({"ThemeID":Define.THEME_MULTI_TABLE,"TableList":[]});
			themeItem = new QuickThemeItem(_multiThemeStruct, this, Define.THEME_MULTI_TABLE);
			this.addChild(themeItem);
			themeItem.y = 125 * (_index);
			m_vecTheme.push(themeItem);
			_index++;
			
			for (var i:number= 0; i < _iLen; i++)
			{
				if(m_vectorThemeList[i].ThemeID == Define.THEME_TELPHONE){//快速转桌列表去掉电投厅按钮
					_aTheme.splice(_aTheme.indexOf(m_vectorThemeList[i].ThemeID),1);
					continue;
				}
				
				themeItem = new QuickThemeItem(m_vectorThemeList[i], this, m_vectorThemeList[i].ThemeID);
				_aTheme.splice(_aTheme.indexOf(m_vectorThemeList[i].ThemeID),1);
				this.addChild(themeItem);
				themeItem.y = 125 * (_index);
				m_vecTheme.push(themeItem);
				_index++;
			}
			
			for (var j:number= 0; j < _aTheme.length; j++) 
			{
				themeItem = new QuickThemeItem(null, this, _aTheme[j]);
				this.addChild(themeItem);
				themeItem.y = 125 * (_index);
				m_vecTheme.push(themeItem);
				_index++;
			}
			
			
			
			themeItem = null;
		}
		
		public setCurrent(_themeItem:QuickThemeItem):void{
			if(currentTheme!=_themeItem){
				if(!_themeItem.struct.IsTelBet && _themeItem.struct.ThemeID!=Define.THEME_MULTI_TABLE){
					//订阅
					LobbyManager.getInstance().sendSubscribeTheme(_themeItem.struct.ThemeID, currentTheme?currentTheme.struct.ThemeID:-1);
				}
				
				if(currentTheme){
					currentTheme.setSelect(false,false);
				}
				_themeItem.setSelect(true);
				currentTheme = _themeItem;
			}else{
				if(LobbyManager.getInstance().bQuickChangeTable){
					LobbyManager.getInstance().bQuickChangeTable = false;
					//订阅
					var _id : number;
					if(currentTheme){
						if(_themeItem.struct.ThemeID == currentTheme.struct.ThemeID){
							_id = -1;
						}else{
							_id = currentTheme.struct.ThemeID;
						}
					}
					LobbyManager.getInstance().sendSubscribeTheme(_themeItem.struct.ThemeID, _id);
				}else{
					//取消订阅
					LobbyManager.getInstance().sendSubscribeTheme(-1, _themeItem.struct.ThemeID);
				}
				
				currentTheme.setSelect(!currentTheme.bSelect);
			}
		}
		
		public setCurrentThemeButtonSelect( _iThemeId:number):void {
			if( m_vecTheme[_iThemeId-1] ){
				
				if( currentTheme != m_vecTheme[_iThemeId-1] ){
					currentTheme.setSelect(false);
					currentTheme = m_vecTheme[_iThemeId-1];
					currentTheme.setSelect(true);	
				}
			}
		}
		
		 public onChangeLanguage():void{
			if(m_vecTheme){
				var themeItem : QuickThemeItem;
				for (var i:number= 0; i < m_vecTheme.length; i++) 
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
			
			if(m_btnDownApp){
				m_btnDownApp.mcAsset.mc.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			if(mcStatistics){
				mcStatistics.label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
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
			
			if(_bValue){
				updateOnline();
			}
		}
		
		public updateOnline():void{
			m_mcAsset.tf_1.text = LobbyData.getInstance().lobbyInfo.OnlinePlayers.toString();
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
		
		public setType(_gameID:number):void{
			this._gameID = _gameID;
			switch(_gameID){
				case GameDefine.SIC:
				case GameDefine.ROU:
					bgApp.height = 168;
					if(mcStatistics.parent==null)
					{
						(m_mcAsset as MovieClip).addChild(mcStatistics);
					}
					break;
				
				default:
					bgApp.height = 126;
					if(mcStatistics.parent)
					{
						mcStatistics.parent.removeChild(mcStatistics);
					}
					break;
			}
		}
		
		public toBac():void{
			if(m_mcAsset){
				m_mcAsset.mc_bg.height = 436;
			}
		}
		
		public toSic():void{
			if(m_mcAsset){
				m_mcAsset.mc_bg.height = 456;
			}
		}
		
		
	}
}
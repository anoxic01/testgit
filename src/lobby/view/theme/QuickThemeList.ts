module lobby.view.theme {
	export class QuickThemeList extends BSprite{
		private var m_mcAsset				:	*;
		private var m_vecTheme			:	Vector.<QuickThemeItem>;		//所有厅馆
		private var m_vectorThemeList	:	Vector.<ThemeStruct>;			//主题数据
		
		private var m_currentTheme		:	QuickThemeItem;					//当前主题
		public var iCurrentTheme		:	int	=	-1;						//当前主题
		public var bInit				:	Boolean;						//初始状态
		
		public var m_btnDownApp			:	SingleButtonMC;					//下载APP
		public var mc_btnStatistics		:	SingleButtonMC;					//统计

		private var mcStatistics:MovieClip;
		private var bgApp:MovieClip;
		
		private var _gameID:int;
		public constructor() {
		
			super();
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_Theme_List_Bg_Asset") ;
			m_mcAsset.cacheAsBitmap=true;
			this.addChild(m_mcAsset);
			
			m_btnDownApp = new SingleButtonMC(m_mcAsset.mc_1,function(event:MouseEvent):void{
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
			
			mc_btnStatistics = new SingleButtonMC(mcStatistics,function(event:MouseEvent):void{
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
		
		public function get currentTheme():QuickThemeItem
		{
			return m_currentTheme;
		}

		public function set currentTheme(value:QuickThemeItem):void
		{
			m_currentTheme = value;
		}

		override public function destroy():void{
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
		
		public function setData():void{
			
			m_vectorThemeList = LobbyData.getInstance().lobbyInfo.themeVec;
			m_vecTheme = new Vector.<QuickThemeItem>;
			var themeItem : QuickThemeItem;
			var _aTheme	:	Array =  TemConfig.getInstance().ThemeList.slice();
			
			var _iFindThemeId	: 	int	  = -1;
			
			var _iLen  : int = m_vectorThemeList.length;
			var _index : int;
			
			//临时模拟多桌
			var _multiThemeStruct : ThemeStruct = new ThemeStruct({"ThemeID":Define.THEME_MULTI_TABLE,"TableList":[]});
			themeItem = new QuickThemeItem(_multiThemeStruct, this, Define.THEME_MULTI_TABLE);
			this.addChild(themeItem);
			themeItem.y = 125 * (_index);
			m_vecTheme.push(themeItem);
			_index++;
			
			for (var i:int = 0; i < _iLen; i++)
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
			
			for (var j:int = 0; j < _aTheme.length; j++) 
			{
				themeItem = new QuickThemeItem(null, this, _aTheme[j]);
				this.addChild(themeItem);
				themeItem.y = 125 * (_index);
				m_vecTheme.push(themeItem);
				_index++;
			}
			
			
			
			themeItem = null;
		}
		
		public function setCurrent(_themeItem:QuickThemeItem):void{
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
					var _id : int;
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
		
		public function setCurrentThemeButtonSelect( _iThemeId:int ):void {
			if( m_vecTheme[_iThemeId-1] ){
				
				if( currentTheme != m_vecTheme[_iThemeId-1] ){
					currentTheme.setSelect(false);
					currentTheme = m_vecTheme[_iThemeId-1];
					currentTheme.setSelect(true);	
				}
			}
		}
		
		override public function onChangeLanguage():void{
			if(m_vecTheme){
				var themeItem : QuickThemeItem;
				for (var i:int = 0; i < m_vecTheme.length; i++) 
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
		
		
		public function enable(_bValue:Boolean):void{
			var _len : int = m_vecTheme.length;
			for (var i:int = 0; i < _len; i++) 
			{
				m_vecTheme[i].mouseEnabled = _bValue;
				m_vecTheme[i].mouseChildren = _bValue;
				m_vecTheme[i].buttonMode = _bValue;
			}
			
			if(_bValue){
				updateOnline();
			}
		}
		
		public function updateOnline():void{
			m_mcAsset.tf_1.text = LobbyData.getInstance().lobbyInfo.OnlinePlayers.toString();
		}
		
		public function setMaintain(_themeID:int, bMaintain:Boolean):void{
			var _len : int = m_vecTheme.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecTheme[i].struct.ThemeID == _themeID){
					m_vecTheme[i].struct.IsMaintaining = bMaintain;
					break;
				}
			}
		}
		
		public function setType(_gameID:int):void{
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
		
		public function toBac():void{
			if(m_mcAsset){
				m_mcAsset.mc_bg.height = 436;
			}
		}
		
		public function toSic():void{
			if(m_mcAsset){
				m_mcAsset.mc_bg.height = 456;
			}
		}
		
		
	}
}
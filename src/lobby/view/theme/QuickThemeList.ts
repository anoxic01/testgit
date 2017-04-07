module lobby.view.theme {
	export class QuickThemeList extends BSprite{
		private m_mcAsset			;
		private m_vecTheme			;		//所有厅馆
		private m_vectorThemeList	;			//主题数据
		
		private m_currentTheme		:	QuickThemeItem;					//当前主题
		public iCurrentTheme			=	-1;						//当前主题
		public bInit				:	 boolean;						//初始状态
		
		public m_btnDownApp			:	ui.button.SingleButtonMC;					//下载APP
		public mc_btnStatistics		:	ui.button.SingleButtonMC;					//统计

		private mcStatistics;
		private bgApp;
		
		private _gameID:number;
		public constructor() {
		
			super();
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_Theme_List_Bg_Asset") ;
			this.m_mcAsset.cacheAsBitmap=true;
			this.addChild(this.m_mcAsset);
			
			this.m_btnDownApp = new ui.button.SingleButtonMC(this.m_mcAsset.mc_1,function(event:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				MobileAppManager.getInstance().togglePanel();
			})
			this.m_btnDownApp.mcAsset.mc.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_1.visible = false;
			this.m_btnDownApp.enabled = false;
			
			this.bgApp = this.m_mcAsset.this.bgApp;
			this.mcStatistics = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"this.mc_btnStatistics") ;
			this.mcStatistics.x = this.m_mcAsset.mc_1.x;
			this.mcStatistics.y = this.m_mcAsset.mc_1.y+this.m_mcAsset.mc_1.height+15;
			this.mcStatistics.label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.mc_btnStatistics = new ui.button.SingleButtonMC(this.mcStatistics,function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				if(this._gameID == define.GameDefine.SIC)
				{
					manager.LobbyManager.getInstance().showGameStatistic();
				}
				else if(this._gameID == define.GameDefine.ROU)
				{
					manager.LobbyManager.getInstance().showGameStatistic();
				}
			});
			
			this.bInit = true;
		}
		
		get currentTheme():QuickThemeItem
		{
			return this.m_currentTheme;
		}

		set  currentTheme(value:QuickThemeItem)
		{
			this.m_currentTheme = value;
		}

		 public destroy():void{
			if(this.m_vecTheme){
				var themeItem : QuickThemeItem;
				while(this.m_vecTheme.length>0){
					themeItem = this.m_vecTheme.pop();
					this.removeChild(themeItem);
					themeItem.destroy();
				}
				themeItem = null;
			}
			
			if(this.m_btnDownApp){
				this.m_btnDownApp.destroy();
				this.m_btnDownApp = null;
			}
			if(this.mc_btnStatistics){
				this.mc_btnStatistics.destroy();
				this.mc_btnStatistics = null;
				this.mcStatistics = null;
			}
		}
		
		public setData():void{
			
			this.m_vectorThemeList = model.LobbyData.getInstance().lobbyInfo.themeVec;
			this.m_vecTheme = new Array<QuickThemeItem>();
			var themeItem : QuickThemeItem;
			var _aTheme	:	any[] =  config.TemConfig.getInstance().ThemeList.slice();
			
			var _iFindThemeId		  = -1;
			
			var _iLen   = this.m_vectorThemeList.length;
			var _index : number;
			
			//临时模拟多桌
			var _multiThemeStruct  = new model.struct.ThemeStruct({"ThemeID":define.Define.THEME_2,"TableList":[]});
			themeItem = new QuickThemeItem(_multiThemeStruct, this, define.Define.THEME_2);
			this.addChild(themeItem);
			themeItem.y = 125 * (_index);
			this.m_vecTheme.push(themeItem);
			_index++;
			
			for (var i:number= 0; i < _iLen; i++)
			{
				if(this.m_vectorThemeList[i].ThemeID == define.Define.THEME_1){//快速转桌列表去掉电投厅按钮
					_aTheme.splice(_aTheme.indexOf(this.m_vectorThemeList[i].ThemeID),1);
					continue;
				}
				
				themeItem = new QuickThemeItem(this.m_vectorThemeList[i], this, this.m_vectorThemeList[i].ThemeID);
				_aTheme.splice(_aTheme.indexOf(this.m_vectorThemeList[i].ThemeID),1);
				this.addChild(themeItem);
				themeItem.y = 125 * (_index);
				this.m_vecTheme.push(themeItem);
				_index++;
			}
			
			for (var j:number= 0; j < _aTheme.length; j++) 
			{
				themeItem = new QuickThemeItem(null, this, _aTheme[j]);
				this.addChild(themeItem);
				themeItem.y = 125 * (_index);
				this.m_vecTheme.push(themeItem);
				_index++;
			}
			
			
			
			themeItem = null;
		}
		
		public setCurrent(_themeItem:QuickThemeItem):void{
			if(this.currentTheme!=_themeItem){
				if(!_themeItem.struct.IsTelBet && _themeItem.struct.ThemeID!=define.Define.THEME_2){
					//订阅
					manager.LobbyManager.getInstance().sendSubscribeTheme(_themeItem.struct.ThemeID, this.currentTheme?this.currentTheme.struct.ThemeID:-1);
				}
				
				if(this.currentTheme){
					this.currentTheme.setSelect(false,false);
				}
				_themeItem.setSelect(true);
				this.currentTheme = _themeItem;
			}else{
				if(manager.LobbyManager.getInstance().bQuickChangeTable){
					manager.LobbyManager.getInstance().bQuickChangeTable = false;
					//订阅
					var _id : number;
					if(this.currentTheme){
						if(_themeItem.struct.ThemeID == this.currentTheme.struct.ThemeID){
							_id = -1;
						}else{
							_id = this.currentTheme.struct.ThemeID;
						}
					}
					manager.LobbyManager.getInstance().sendSubscribeTheme(_themeItem.struct.ThemeID, _id);
				}else{
					//取消订阅
					manager.LobbyManager.getInstance().sendSubscribeTheme(-1, _themeItem.struct.ThemeID);
				}
				
				this.currentTheme.setSelect(!this.currentTheme.bSelect);
			}
		}
		
		public setCurrentThemeButtonSelect( _iThemeId:number):void {
			if( this.m_vecTheme[_iThemeId-1] ){
				
				if( this.currentTheme != this.m_vecTheme[_iThemeId-1] ){
					this.currentTheme.setSelect(false);
					this.currentTheme = this.m_vecTheme[_iThemeId-1];
					this.currentTheme.setSelect(true);	
				}
			}
		}
		
		 public onChangeLanguage():void{
			if(this.m_vecTheme){
				var themeItem : QuickThemeItem;
				for (var i:number= 0; i < this.m_vecTheme.length; i++) 
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
			
			if(this.m_btnDownApp){
				this.m_btnDownApp.mcAsset.mc.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			if(this.mcStatistics){
				this.mcStatistics.label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		
		public enable(_bValue: boolean):void{
			var _len  = this.m_vecTheme.length;
			for (var i:number= 0; i < _len; i++) 
			{
				this.m_vecTheme[i].touchEnabled = _bValue;
				this.m_vecTheme[i].touchChildren = _bValue;
				this.m_vecTheme[i].buttonMode = _bValue;
			}
			
			if(_bValue){
				this.updateOnline();
			}
		}
		
		public updateOnline():void{
			this.m_mcAsset.tf_1.text = model.LobbyData.getInstance().lobbyInfo.OnlinePlayers.toString();
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
		
		public setType($gameID:number):void{
			this._gameID = $gameID;
			switch(this._gameID){
				case define.GameDefine.SIC:
				case define.GameDefine.ROU:
					this.bgApp.height = 168;
					if(this.mcStatistics.parent==null)
					{
						(this.m_mcAsset).addChild(this.mcStatistics);
					}
					break;
				
				default:
					this.bgApp.height = 126;
					if(this.mcStatistics.parent)
					{
						this.mcStatistics.parent.removeChild(this.mcStatistics);
					}
					break;
			}
		}
		
		public toBac():void{
			if(this.m_mcAsset){
				this.m_mcAsset.mc_bg.height = 436;
			}
		}
		
		public toSic():void{
			if(this.m_mcAsset){
				this.m_mcAsset.mc_bg.height = 456;
			}
		}
		
		
	}
}
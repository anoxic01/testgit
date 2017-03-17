module packet.lobby {
	export class S_Lobby_Theme_Subscribe implements IProtocolStruct{
		public var Type					:	int;			//封包命令
		public var SubRet				:	int;			//订阅结果	0-成功	1-失败
		public var UnsubRet				:	int;			//取消订阅结果	0-成功	1-失败
		public var SubscribleThemeID	:	int;			//订阅厅馆ID
		public var UnsubscribleThemeID	:	int;			//取消订阅厅馆ID
		public var TableList			:	Array;			//訂閱廳館賭桌資料
		public var IsMaintaining		:	Boolean;		//维护状态
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			LobbyManager.getInstance().bSubscribeTheme = false;
			LobbyManager.getInstance().lobbyView.hideLoading();
			TimeManager.getInstance().removeFun(LobbyManager.getInstance().subscripThemeTimeToShowLoading);
			TimeManager.getInstance().removeFun(LobbyManager.getInstance().subscripThemeTimeToHint);
			
			Type = oData.Type;
			SubRet = oData.SubRet;
			UnsubRet = oData.UnsubRet;
			SubscribleThemeID = oData.SubscribleThemeID;
			UnsubscribleThemeID = oData.UnsubscribleThemeID;
			TableList = oData.TableList;
			IsMaintaining = oData.IsMaintaining;
			trace("订阅厅馆返回消息 =====================================");
			if(SubscribleThemeID>0){
				var _currentThemeStruct : ThemeStruct = LobbyData.getInstance().lobbyInfo.getThemeStruct(LobbyManager.getInstance().lobbyView.uCurrentThemeID);
				var _themeStruct : ThemeStruct = LobbyData.getInstance().lobbyInfo.getThemeStruct(SubscribleThemeID);
				if(_themeStruct){
					_themeStruct.updateTableList(TableList);
					trace("订阅厅馆返回消息，更新桌子数据完成================================");
				}else{
					_themeStruct = new ThemeStruct();
					_themeStruct.ThemeID = SubscribleThemeID;
					_themeStruct.TableCnt = TableList?TableList.length:0;
					for (var i:int = 0; i < _themeStruct.TableCnt; i++) 
					{
						_themeStruct.TableList.push(new TableStruct(TableList[i]));
//						trace("厅馆名称：",TableList[i].ThemeName_CN," GameID:",TableList[i].GameID," TableType:", TableList[i].TableType, " 桌子ID：",TableList[i].TableID, "桌子名称:",TableList[i].TableName_CN);
					}
				}
				_themeStruct.IsMaintaining = IsMaintaining;
				
				if(LobbyManager.getInstance().lobbyView.uCurrentThemeID==SubscribleThemeID){
					//桌子关闭退回大厅需要将关闭桌显示为维护中
					for (var j:int = 0; j < LobbyData.getInstance().MaintainTableStruct.length; j++) 
					{
						_themeStruct.addTableStruct(LobbyData.getInstance().MaintainTableStruct[j]);
					}
				}else{
					for (var k:int = 0; k < LobbyData.getInstance().MaintainTableStruct.length; k++) 
					{
						_currentThemeStruct.removeTableStruct(LobbyData.getInstance().MaintainTableStruct[k].TableID);
					}
					LobbyData.getInstance().removeAllMaintainTableStruct();
				}
				
				_themeStruct.TableList.sort(function(a:TableStruct, b:TableStruct):int{
					if(a.TableID>b.TableID){
						return 1;
					}else if(a.TableID<b.TableID){
						return -1;
					}else{
						return 0;
					}
				});
				LobbyData.getInstance().lobbyInfo.addTableList(LobbyData.getInstance().lobbyInfo.getThemeIndex(SubscribleThemeID), _themeStruct);
				
			}
			
			trace("封包命令：",Type, "订阅状态：",SubRet,"订阅厅馆ID",SubscribleThemeID, "取消订阅状态：",UnsubRet, "取消订阅厅馆ID：",UnsubscribleThemeID);
			
			if(SubRet==0){
				trace("exitLevel:" + LobbyManager.getInstance().exitLevel );
				//游戏中的快速转桌列表
				if(LobbyManager.getInstance().exitLevel == Define.EXIT_GAME){
					
					if( LobbyManager.getInstance().lobbyAuth.loginMode == Define.INTERNET_BET_LOBBY ){
						if(LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme){
							var _id:int = LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.ThemeID;
							if(LobbyManager.getInstance().lobbyView.quickThemeList.bInit){
								LobbyManager.getInstance().lobbyView.quickThemeList.bInit = false;
								
								var _index : int = LobbyData.getInstance().lobbyInfo.getThemeIndex(_id);
								if(LobbyManager.getInstance().bQuickTableListTween){
									ActionManager.getInstance().fInitQuickTable = function():void{
										LobbyManager.getInstance().lobbyView.initQuickTableList(_index);
										ActionManager.getInstance().fInitQuickTable = null;
									};
								}else{
									LobbyManager.getInstance().lobbyView.initQuickTableList(_index);
								}
							}else{
								if(SubscribleThemeID!=-1){
									if(LobbyManager.getInstance().bQuickTableListTween){
										ActionManager.getInstance().fInitQuickTable = function():void{
											LobbyManager.getInstance().changeQuickThemelist(SubscribleThemeID);
											ActionManager.getInstance().fInitQuickTable = null;
										};
									}else{
										LobbyManager.getInstance().changeQuickThemelist(SubscribleThemeID);
									}
								}
							}
						}
					}

					
				}else{
					//大厅
					LobbyManager.getInstance().changeThemelist(SubscribleThemeID);
				}
			}else{
				LobbyManager.getInstance().showDialog("厅馆资料异常");
			}
			
		}
	}
}
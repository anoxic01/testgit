module packet.pack_lobby {
	export class S_Lobby_Theme_Subscribe implements iface.IProtocolStruct{
		public Type					:	number;			//封包命令
		public SubRet				:	number;			//订阅结果	0-成功	1-失败
		public UnsubRet				:	number;			//取消订阅结果	0-成功	1-失败
		public SubscribleThemeID	:	number;			//订阅厅馆ID
		public UnsubscribleThemeID	:	number;			//取消订阅厅馆ID
		public TableList			:	any[];			//訂閱廳館賭桌資料
		public IsMaintaining		:	boolean;		//维护状态
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			manager.LobbyManager.getInstance().bSubscribeTheme = false;
			manager.LobbyManager.getInstance().lobbyView.hideLoading();
			manager.TimeManager.getInstance().removeFun(manager.LobbyManager.getInstance().subscripThemeTimeToShowLoading);
			manager.TimeManager.getInstance().removeFun(manager.LobbyManager.getInstance().subscripThemeTimeToHint);
			
			this.Type = oData.Type;
			this.SubRet = oData.SubRet;
			this.UnsubRet = oData.UnsubRet;
			this.SubscribleThemeID = oData.SubscribleThemeID;
			this.UnsubscribleThemeID = oData.UnsubscribleThemeID;
			this.TableList = oData.TableList;
			this.IsMaintaining = oData.IsMaintaining;
			console.log("订阅厅馆返回消息 =====================================");
			if(this.SubscribleThemeID>0){
				var _currentThemeStruct  = lobby.model.LobbyData.getInstance().lobbyInfo.getThemeStruct(manager.LobbyManager.getInstance().lobbyView.uCurrentThemeID);
				var _themeStruct  = lobby.model.LobbyData.getInstance().lobbyInfo.getThemeStruct(this.SubscribleThemeID);
				if(_themeStruct){
					_themeStruct.updateTableList(this.TableList);
					console.log("订阅厅馆返回消息，更新桌子数据完成================================");
				}else{
					_themeStruct = new lobby.model.struct.ThemeStruct(null);
					_themeStruct.ThemeID = this.SubscribleThemeID;
					_themeStruct.TableCnt = this.TableList?this.TableList.length:0;
					for (var i:number= 0; i < _themeStruct.TableCnt; i++) 
					{
						_themeStruct.TableList.push(new lobby.model.struct.TableStruct(this.TableList[i]));
//						console.log("厅馆名称：",TableList[i].ThemeName_CN," GameID:",TableList[i].GameID," TableType:", TableList[i].TableType, " 桌子ID：",TableList[i].TableID, "桌子名称:",TableList[i].TableName_CN);
					}
				}
				_themeStruct.IsMaintaining = this.IsMaintaining;
				
				if(manager.LobbyManager.getInstance().lobbyView.uCurrentThemeID==this.SubscribleThemeID){
					//桌子关闭退回大厅需要将关闭桌显示为维护中
					for (var j:number= 0; j < lobby.model.LobbyData.getInstance().MaintainTableStruct.length; j++) 
					{
						_themeStruct.addTableStruct(lobby.model.LobbyData.getInstance().MaintainTableStruct[j]);
					}
				}else{
					for (var k:number= 0; k < lobby.model.LobbyData.getInstance().MaintainTableStruct.length; k++) 
					{
						_currentThemeStruct.removeTableStruct(lobby.model.LobbyData.getInstance().MaintainTableStruct[k].TableID);
					}
					lobby.model.LobbyData.getInstance().removeAllMaintainTableStruct();
				}
				
				_themeStruct.TableList.sort(function(a, b):number{
					if(a.TableID>b.TableID){
						return 1;
					}else if(a.TableID<b.TableID){
						return -1;
					}else{
						return 0;
					}
				});
				lobby.model.LobbyData.getInstance().lobbyInfo.addTableList(lobby.model.LobbyData.getInstance().lobbyInfo.getThemeIndex(this.SubscribleThemeID), _themeStruct);
				
			}
			
			console.log("封包命令：",this.Type, "订阅状态：",this.SubRet,"订阅厅馆ID",this.SubscribleThemeID, "取消订阅状态：",this.UnsubRet, "取消订阅厅馆ID：",this.UnsubscribleThemeID);
			
			if(this.SubRet==0){
				console.log("exitLevel:" + manager.LobbyManager.getInstance().exitLevel );
				//游戏中的快速转桌列表
				if(manager.LobbyManager.getInstance().exitLevel == define.Define.EXIT_GAME){
					
					if( manager.LobbyManager.getInstance().lobbyAuth.loginMode == define.Define.INTERNET_BET_LOBBY ){
						if(manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme){
							var _id:number= manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.ThemeID;
							if(manager.LobbyManager.getInstance().lobbyView.quickThemeList.bInit){
								manager.LobbyManager.getInstance().lobbyView.quickThemeList.bInit = false;
								
								var _index  = lobby.model.LobbyData.getInstance().lobbyInfo.getThemeIndex(_id);
								if(manager.LobbyManager.getInstance().bQuickTableListTween){
									manager.ActionManager.getInstance().fInitQuickTable = function():void{
										manager.LobbyManager.getInstance().lobbyView.initQuickTableList(_index);
										manager.ActionManager.getInstance().fInitQuickTable = null;
									};
								}else{
									manager.LobbyManager.getInstance().lobbyView.initQuickTableList(_index);
								}
							}else{
								if(this.SubscribleThemeID!=-1){
									if(manager.LobbyManager.getInstance().bQuickTableListTween){
										manager.ActionManager.getInstance().fInitQuickTable = function():void{
											manager.LobbyManager.getInstance().changeQuickThemelist(this.SubscribleThemeID);
											manager.ActionManager.getInstance().fInitQuickTable = null;
										};
									}else{
										manager.LobbyManager.getInstance().changeQuickThemelist(this.SubscribleThemeID);
									}
								}
							}
						}
					}

					
				}else{
					//大厅
					manager.LobbyManager.getInstance().changeThemelist(this.SubscribleThemeID);
				}
			}else{
				manager.LobbyManager.getInstance().showDialog("厅馆资料异常");
			}
			
		}
	}
}
module lobby.model.struct {
	export class MaintainsAnnouncementStruct {
		/**
		 *	0	非维护中
		 * 	1	 全站维护
		 * 	2	厅馆维护
		 * 	3	赌桌维护
		 * 	4	代理维护
		 */		
		public MaintainType		:	number;
		
		/**
		 * 系统维护种类
		 *	0	例行维护	维护前30分钟提醒用户
		 * 	1	紧急维护 维护前5分钟提醒用户
		 * 	客户端不需要做任何处理
		 */		
		public MaintainModel	:	number;
		
		/**
		 *	系统维护状态
		 * 	代理维护:不通知 
		 * 	1	开始维护
		 * 	2	结束维护
		 * 	3	维护提醒
		 */		
		public MaintainStatus	:	number;
		
		/**
		 *	全站维护	Object=null
		 *  厅馆维护	List<int>
		 * 	赌桌维护	List<MaintainTable>
		 * 	代理维护	int 最高代理ID
		 */		
		public MaintainData		:	any;
		
		/**
		 *	结束维护，回复资料 
		 * 目前只有結束賭桌維護會提供賭桌維護要復原的資料，其餘狀態會給 null
		 */		
		public RecoveryData		:	any[];
		
		
		public StartTime		:	Number;							//开始维护时间
		public EndTime			:	Number;							//结束维护时间
		
		public m_len 				: 	number;
		
		/**
		 * MaintainData的缓存
		 */		
		public MaintainData_game:	any[];
		public constructor(oData) {
			if(oData==null){
				return;
			}
			
			this.MaintainData_game = [];
			
			this.MaintainType = oData.MaintainType;
			this.MaintainModel = oData.MaintainModel;
			this.MaintainStatus = oData.MaintainStatus;
			this.MaintainData = (oData.MaintainData=="null"||oData.MaintainData==null)?null:JSON.parse(oData.MaintainData);
			this.RecoveryData = (oData.RecoveryData=="null"||oData.RecoveryData==null)?null:JSON.parse(oData.RecoveryData);
			this.StartTime = oData.StartTime;
			this.EndTime = oData.EndTime;
			
			switch(this.MaintainType){
				case lobby.model.type.SysMaintainType.Maintenance_FullSite:		//全站维护,更新跑马灯通知维护时间
					break;
				
				case lobby.model.type.SysMaintainType.Maintenance_Theme:		//厅馆维护,更新跑马灯通知维护时间，关闭厅馆
					//删除电投
					if(this.MaintainData){
						var uIndex : number = this.MaintainData.indexOf(config.TemConfig.getInstance().PhoneBetID);
						if(uIndex!=-1){
							this.MaintainData.splice(uIndex,1);
						}
						
						this.m_len = this.MaintainData.length;
						this.cloneMaintainData();
					}
					
					this.MaintainTheme();
					break;
				
				case lobby.model.type.SysMaintainType.Maintenance_Table:		//赌桌维护,更新跑马灯通知维护时间，关闭厅馆
					//删除电投
					if(this.MaintainData){
						var tables = this.MaintainData;
						var table;
						//TableID,TableType
						for (var i:number= 0; i < tables.length; i++) 
						{
							table = tables[i];
							if(table.TableType == define.Define.TABLE_TYPE_TELBET)
							{
								tables.splice(i,1);
								i--;
							}
						}
						if(tables.length>1)
						{
							//测试发现有重复，但是很难重现，在这去重
							for (i = 0; i < tables.length; i++) 
							{
								table = tables[i];
								for (var j:number= i+1; j < tables.length; j++) 
								{
									if(table.TableID==tables[j].TableID && table.TableType==tables[j].TableType)
									{
										tables.splice(j,1);
										j--;
									}
								}
							}
						}
						this.m_len = tables.length;
						this.cloneMaintainData();
					}
					
					this.MaintainTable();
					break;
				
				case lobby.model.type.SysMaintainType.Maintenance_TopAgent:		//代理维护
					break;
			}
			
			//恢复赌桌维护
			if(this.RecoveryData){
				manager.LobbyManager.getInstance().lobbyView.tableMaintenanceRestore(this.RecoveryData);
			}
		}
		private MaintainTheme():void{
			switch(this.MaintainStatus){
				case lobby.model.status.SysMaintainStatus.Start:
					for (var i:number= 0; i < this.m_len; i++) 
					{
						manager.LobbyManager.getInstance().lobbyView.themeList.setMaintain(this.MaintainData[i],true);
						manager.LobbyManager.getInstance().lobbyView.quickThemeList.setMaintain(this.MaintainData[i],true);
					}
					//判断当前厅馆是否维护
					if(manager.LobbyManager.getInstance().lobbyView.themeList.currentTheme.struct.IsMaintaining){
						manager.LobbyManager.getInstance().lobbyView.showThemeMaintenance();
					}
					if(manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme && manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.IsMaintaining){
						manager.LobbyManager.getInstance().lobbyView.quickTableList.showThemeMaintenance();
					}
					manager.LobbyManager.getInstance().lobbyView.upDataThemeTableMaintenance();//更新桌主状态
					break;
				
				case lobby.model.status.SysMaintainStatus.Stop:
					//判断当前厅馆是否维护中
					if(manager.LobbyManager.getInstance().lobbyView.themeList.currentTheme.struct.IsMaintaining){
						manager.LobbyManager.getInstance().lobbyView.hideThemeMaintenance();
					}
					if(manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme && manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.IsMaintaining){
						manager.LobbyManager.getInstance().lobbyView.quickTableList.hideThemeMaintenance();
					}
					for (var j:number= 0; j < this.m_len; j++) 
					{
						manager.LobbyManager.getInstance().lobbyView.themeList.setMaintain(this.MaintainData[j],false);
						manager.LobbyManager.getInstance().lobbyView.quickThemeList.setMaintain(this.MaintainData[j],false);
					}
					manager.LobbyManager.getInstance().lobbyView.upDataThemeTableMaintenance();//更新桌主状态
					break;
				
				case lobby.model.status.SysMaintainStatus.Remind:
					break;
			}
		}
		
		private MaintainTable():void{
			switch(this.MaintainStatus){
				case lobby.model.status.SysMaintainStatus.Start:
					var _tableStruct : TableStruct;
					switch(manager.LobbyManager.getInstance().exitLevel){
						case Define.EXIT_MULTI_TABLE:
							if(MaintainData_game && MaintainData_game.length>0){
								for(var i:number= 0;i<MaintainData_game.length;i++){
									_tableStruct = LobbyData.getInstance().getTableStructByTableID(MaintainData_game[i].TableID);
									if(_tableStruct){
										manager.LobbyManager.getInstance().lobbyView.removeTable(_tableStruct);
									}
								}
							}
							break;
						case Define.EXIT_GAME:
							var tableid : int = manager.LobbyManager.getInstance().getGameTableID();
							if(MaintainData_game && MaintainData_game.length>0){
								for(var j:number= 0;j<MaintainData_game.length;j++){
									_tableStruct = LobbyData.getInstance().getTableStructByTableID(MaintainData_game[j].TableID);
									if(_tableStruct){
										if(_tableStruct.TableID==tableid){
											break;
										}
										manager.LobbyManager.getInstance().lobbyView.removeTable(_tableStruct);
									}
								}
								
								manager.LobbyManager.getInstance().lobbyView.tableMaintenance(MaintainData);
							}
							break;
						case Define.EXIT_LOBBY:
							for (var k:number= 0; k < MaintainData_game.length; k++) 
							{
								_tableStruct = LobbyData.getInstance().getTableStructByTableID(MaintainData_game[k].TableID);
								if(_tableStruct){
									LobbyData.getInstance().addMaintainTableStruct(_tableStruct);
								}
							}
							manager.LobbyManager.getInstance().lobbyView.tableMaintenance(MaintainData);
							break;
					}
					break;
				
				case lobby.model.status.SysMaintainStatus.Stop:
					if(manager.LobbyManager.getInstance().lobbyView.uCurrentThemeID != manager.LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme){
						manager.LobbyManager.getInstance().sendSubscribeTheme(manager.LobbyManager.getInstance().lobbyView.uCurrentThemeID, manager.LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme);
					}else{
						manager.LobbyManager.getInstance().sendSubscribeTheme(manager.LobbyManager.getInstance().lobbyView.uCurrentThemeID);
					}
					break;
				
				case lobby.model.status.SysMaintainStatus.Remind:
					break;
			}
		}
		
		
		public cloneMaintainData():void
		{
			if(MaintainData is any[])
			{
				var datas:any[] = MaintainData as any[];
				for (var i:number= 0; i < datas.length; i++) 
				{
					MaintainData_game[i] = datas[i];
				}
			}
			else
			{
				MaintainData_game.length=0;
			}
		}

		public isEqual(vo:MaintainsAnnouncementStruct): boolean
		{
			if(MaintainType==vo.MaintainType && MaintainModel==vo.MaintainModel)//&& MaintainStatus==vo.MaintainStatus
			{
				if(compareObj(MaintainData,vo.MaintainData))
				{
					return true;
				}
			}
			return false;
		}
		public toString():String
		{
			var sValue : String="";
			switch(MaintainType){
				case lobby.model.type.SysMaintainType.Maintenance_FullSite:
					if(MaintainStatus==1){
						sValue = combinationTime("{0}",manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Whole_1));
					}else if(MaintainStatus==3){
						sValue = combination(manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Whole));;
					}
					break;
				
				case lobby.model.type.SysMaintainType.Maintenance_TopAgent:
					if(MaintainStatus==1){
						sValue = combinationTime("{0}",manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Agent_1));
					}else if(MaintainStatus==3){
						sValue = combination(manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Agent));
					}
					break;
				
				case lobby.model.type.SysMaintainType.Maintenance_Theme:
					if(MaintainStatus==1){
						sValue = manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Theme_1);
						sValue = combinationName("{0}",sValue);
						sValue = combinationTime("{1}",sValue);
					}else if(MaintainStatus==3){
						sValue = combination(manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Theme));
					}
					break;
				
				case lobby.model.type.SysMaintainType.Maintenance_Table:
					if(MaintainStatus==1){
						sValue = manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Table_1);
						sValue = combinationName("{0}",sValue);
						sValue = combinationTime("{1}",sValue);
					}else if(MaintainStatus==3){
						sValue = combination(manager.LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Table));
					}
					break;
			}
			return sValue;
		}
		private compareObj(aObj:Object,bObj:Object): boolean{
			//全站维护	Object=null
			if(aObj == null && bObj == null){
				return true;
			}
			
			if(aObj is any[] && aObj.length == bObj.length){
				for(var i:* in aObj){
					if(aObj[i] is int){//厅馆维护	List<int>
						if(aObj[i] != bObj[i]){
							return false;
						}
					}else{//赌桌维护	List<MaintainTable>
						if(aObj[i].TableID != bObj[i].TableID){
							return false;
						}
					}
				}
				return true;
			}
			
			//代理维护	int 最高代理ID
			if(aObj == bObj){
				return true;
			}
			
			return false;
		}
		
		
		private combination(sValue:String):String{
			if(sValue.indexOf("{0}")!=-1){
				sValue = sValue.replace("{0}",LobbyData.getInstance().utcToLocal(StartTime));
			}
			sValue = combinationName("{1}",sValue);
			
			return sValue;
		}
		private combinationName(skey:String,sValue:String):String{
			if(sValue.indexOf(skey)!=-1){
				var arr : any[] = MaintainData_game;
				var _len : int = arr.length;
				var _name : String = "";
				var theme:ThemeNameStruct;
				var table:TableNameStruct;
				for (var i:number= 0; i < _len; i++) 
				{
					if(MaintainType==lobby.model.type.SysMaintainType.Maintenance_Theme){
						theme = LobbyData.getInstance().getThemeNameStructByID(arr[i]);
						if(theme==null)
						{
							console.log("MaintainsAnnouncementStruct: 找不到要维护的厅馆："+arr[i]);
							continue;
						}
						switch(manager.LobbyManager.getInstance().lobbyAuth.Lang){
							case Define.LANGUAGE_CN:
								_name += "("+String(i+1)+")"+theme.CN + ";";
								break;
							case Define.LANGUAGE_TW:
								_name += "("+String(i+1)+")"+theme.TW + ";";
								break;
							case Define.LANGUAGE_EN:
								_name += "("+String(i+1)+")"+theme.EN + ";";
								break;
						}
						
					}else if(MaintainType==lobby.model.type.SysMaintainType.Maintenance_Table){
						table = LobbyData.getInstance().getTableNameStructByID(arr[i].TableID);
						if(table==null)
						{
							console.log("MaintainsAnnouncementStruct: 找不到要维护的赌桌："+arr[i].TableID);
							continue;
						}
						switch(manager.LobbyManager.getInstance().lobbyAuth.Lang){
							case Define.LANGUAGE_CN:
								_name += "("+String(i+1)+")"+table.CN + ";";
								break;
							case Define.LANGUAGE_TW:
								_name += "("+String(i+1)+")"+table.TW + ";";
								break;
							case Define.LANGUAGE_EN:
								_name += "("+String(i+1)+")"+table.EN + ";";
								break;
						}
					}
				}
				
				sValue = sValue.replace(skey,_name);
			}
			return sValue;
		}
		private combinationTime(skey:string,sValue:string):string{
			if(sValue.indexOf(skey)!=-1){
				var _str : String = LobbyData.getInstance().utcToLocal_1(StartTime) + "-" + LobbyData.getInstance().utcToLocal_1(EndTime);
				sValue = sValue.replace(skey,_str);
			}
			return sValue;
		}
	}
}
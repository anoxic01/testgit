module lobby.model.struct {
	export class MaintainsAnnouncementStruct {
		/**
		 *	0	非维护中
		 * 	1	 全站维护
		 * 	2	厅馆维护
		 * 	3	赌桌维护
		 * 	4	代理维护
		 */		
		public var MaintainType		:	int;
		
		/**
		 * 系统维护种类
		 *	0	例行维护	维护前30分钟提醒用户
		 * 	1	紧急维护 维护前5分钟提醒用户
		 * 	客户端不需要做任何处理
		 */		
		public var MaintainModel	:	int;
		
		/**
		 *	系统维护状态
		 * 	代理维护:不通知 
		 * 	1	开始维护
		 * 	2	结束维护
		 * 	3	维护提醒
		 */		
		public var MaintainStatus	:	int;
		
		/**
		 *	全站维护	Object=null
		 *  厅馆维护	List<int>
		 * 	赌桌维护	List<MaintainTable>
		 * 	代理维护	int 最高代理ID
		 */		
		public var MaintainData		:	*;
		
		/**
		 *	结束维护，回复资料 
		 * 目前只有結束賭桌維護會提供賭桌維護要復原的資料，其餘狀態會給 null
		 */		
		public var RecoveryData		:	Array;
		
		
		public var StartTime		:	Number;							//开始维护时间
		public var EndTime			:	Number;							//结束维护时间
		
		public var m_len 				: 	int;
		
		/**
		 * MaintainData的缓存
		 */		
		public var MaintainData_game:	Array;
		public constructor(oData:Object) {
			if(oData==null){
				return;
			}
			
			MaintainData_game = [];
			
			MaintainType = oData.MaintainType;
			MaintainModel = oData.MaintainModel;
			MaintainStatus = oData.MaintainStatus;
			MaintainData = (oData.MaintainData=="null"||oData.MaintainData==null)?null:JSON.parse(oData.MaintainData);
			RecoveryData = (oData.RecoveryData=="null"||oData.RecoveryData==null)?null:JSON.parse(oData.RecoveryData)as Array;
			StartTime = oData.StartTime;
			EndTime = oData.EndTime;
			
			switch(MaintainType){
				case SysMaintainType.Maintenance_FullSite:		//全站维护,更新跑马灯通知维护时间
					break;
				
				case SysMaintainType.Maintenance_Theme:		//厅馆维护,更新跑马灯通知维护时间，关闭厅馆
					//删除电投
					if(MaintainData){
						var uIndex : int = (MaintainData as Array).indexOf(TemConfig.getInstance().PhoneBetID);
						if(uIndex!=-1){
							(MaintainData as Array).splice(uIndex,1);
						}
						
						m_len = MaintainData.length;
						cloneMaintainData();
					}
					
					MaintainTheme();
					break;
				
				case SysMaintainType.Maintenance_Table:		//赌桌维护,更新跑马灯通知维护时间，关闭厅馆
					//删除电投
					if(MaintainData){
						var tables:Array = MaintainData as Array;
						var table:Object;
						//TableID,TableType
						for (var i:int = 0; i < tables.length; i++) 
						{
							table = tables[i];
							if(table.TableType == Define.TABLE_TYPE_TELBET)
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
								for (var j:int = i+1; j < tables.length; j++) 
								{
									if(table.TableID==tables[j].TableID && table.TableType==tables[j].TableType)
									{
										tables.splice(j,1);
										j--;
									}
								}
							}
						}
						m_len = tables.length;
						cloneMaintainData();
					}
					
					MaintainTable();
					break;
				
				case SysMaintainType.Maintenance_TopAgent:		//代理维护
					break;
			}
			
			//恢复赌桌维护
			if(RecoveryData){
				LobbyManager.getInstance().lobbyView.tableMaintenanceRestore(RecoveryData);
			}
		}
		private function MaintainTheme():void{
			switch(MaintainStatus){
				case SysMaintainStatus.Start:
					for (var i:int = 0; i < m_len; i++) 
					{
						LobbyManager.getInstance().lobbyView.themeList.setMaintain(MaintainData[i],true);
						LobbyManager.getInstance().lobbyView.quickThemeList.setMaintain(MaintainData[i],true);
					}
					//判断当前厅馆是否维护
					if(LobbyManager.getInstance().lobbyView.themeList.currentTheme.struct.IsMaintaining){
						LobbyManager.getInstance().lobbyView.showThemeMaintenance();
					}
					if(LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme && LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.IsMaintaining){
						LobbyManager.getInstance().lobbyView.quickTableList.showThemeMaintenance();
					}
					LobbyManager.getInstance().lobbyView.upDataThemeTableMaintenance();//更新桌主状态
					break;
				
				case SysMaintainStatus.Stop:
					//判断当前厅馆是否维护中
					if(LobbyManager.getInstance().lobbyView.themeList.currentTheme.struct.IsMaintaining){
						LobbyManager.getInstance().lobbyView.hideThemeMaintenance();
					}
					if(LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme && LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.IsMaintaining){
						LobbyManager.getInstance().lobbyView.quickTableList.hideThemeMaintenance();
					}
					for (var j:int = 0; j < m_len; j++) 
					{
						LobbyManager.getInstance().lobbyView.themeList.setMaintain(MaintainData[j],false);
						LobbyManager.getInstance().lobbyView.quickThemeList.setMaintain(MaintainData[j],false);
					}
					LobbyManager.getInstance().lobbyView.upDataThemeTableMaintenance();//更新桌主状态
					break;
				
				case SysMaintainStatus.Remind:
					break;
			}
		}
		
		private function MaintainTable():void{
			switch(MaintainStatus){
				case SysMaintainStatus.Start:
					var _tableStruct : TableStruct;
					switch(LobbyManager.getInstance().exitLevel){
						case Define.EXIT_MULTI_TABLE:
							if(MaintainData_game && MaintainData_game.length>0){
								for(var i:int = 0;i<MaintainData_game.length;i++){
									_tableStruct = LobbyData.getInstance().getTableStructByTableID(MaintainData_game[i].TableID);
									if(_tableStruct){
										LobbyManager.getInstance().lobbyView.removeTable(_tableStruct);
									}
								}
							}
							break;
						case Define.EXIT_GAME:
							var tableid : int = LobbyManager.getInstance().getGameTableID();
							if(MaintainData_game && MaintainData_game.length>0){
								for(var j:int = 0;j<MaintainData_game.length;j++){
									_tableStruct = LobbyData.getInstance().getTableStructByTableID(MaintainData_game[j].TableID);
									if(_tableStruct){
										if(_tableStruct.TableID==tableid){
											break;
										}
										LobbyManager.getInstance().lobbyView.removeTable(_tableStruct);
									}
								}
								
								LobbyManager.getInstance().lobbyView.tableMaintenance(MaintainData);
							}
							break;
						case Define.EXIT_LOBBY:
							for (var k:int = 0; k < MaintainData_game.length; k++) 
							{
								_tableStruct = LobbyData.getInstance().getTableStructByTableID(MaintainData_game[k].TableID);
								if(_tableStruct){
									LobbyData.getInstance().addMaintainTableStruct(_tableStruct);
								}
							}
							LobbyManager.getInstance().lobbyView.tableMaintenance(MaintainData);
							break;
					}
					break;
				
				case SysMaintainStatus.Stop:
					if(LobbyManager.getInstance().lobbyView.uCurrentThemeID != LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme){
						LobbyManager.getInstance().sendSubscribeTheme(LobbyManager.getInstance().lobbyView.uCurrentThemeID, LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme);
					}else{
						LobbyManager.getInstance().sendSubscribeTheme(LobbyManager.getInstance().lobbyView.uCurrentThemeID);
					}
					break;
				
				case SysMaintainStatus.Remind:
					break;
			}
		}
		
		
		public function cloneMaintainData():void
		{
			if(MaintainData is Array)
			{
				var datas:Array = MaintainData as Array;
				for (var i:int = 0; i < datas.length; i++) 
				{
					MaintainData_game[i] = datas[i];
				}
			}
			else
			{
				MaintainData_game.length=0;
			}
		}

		public function isEqual(vo:MaintainsAnnouncementStruct):Boolean
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
		public function toString():String
		{
			var sValue : String="";
			switch(MaintainType){
				case SysMaintainType.Maintenance_FullSite:
					if(MaintainStatus==1){
						sValue = combinationTime("{0}",LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Whole_1));
					}else if(MaintainStatus==3){
						sValue = combination(LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Whole));;
					}
					break;
				
				case SysMaintainType.Maintenance_TopAgent:
					if(MaintainStatus==1){
						sValue = combinationTime("{0}",LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Agent_1));
					}else if(MaintainStatus==3){
						sValue = combination(LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Agent));
					}
					break;
				
				case SysMaintainType.Maintenance_Theme:
					if(MaintainStatus==1){
						sValue = LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Theme_1);
						sValue = combinationName("{0}",sValue);
						sValue = combinationTime("{1}",sValue);
					}else if(MaintainStatus==3){
						sValue = combination(LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Theme));
					}
					break;
				
				case SysMaintainType.Maintenance_Table:
					if(MaintainStatus==1){
						sValue = LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Table_1);
						sValue = combinationName("{0}",sValue);
						sValue = combinationTime("{1}",sValue);
					}else if(MaintainStatus==3){
						sValue = combination(LobbyManager.getInstance().getLanguageString(Language.sMaintain_Notice_Table));
					}
					break;
			}
			return sValue;
		}
		private function compareObj(aObj:Object,bObj:Object):Boolean{
			//全站维护	Object=null
			if(aObj == null && bObj == null){
				return true;
			}
			
			if(aObj is Array && aObj.length == bObj.length){
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
		
		
		private function combination(sValue:String):String{
			if(sValue.indexOf("{0}")!=-1){
				sValue = sValue.replace("{0}",LobbyData.getInstance().utcToLocal(StartTime));
			}
			sValue = combinationName("{1}",sValue);
			
			return sValue;
		}
		private function combinationName(skey:String,sValue:String):String{
			if(sValue.indexOf(skey)!=-1){
				var arr : Array = MaintainData_game;
				var _len : int = arr.length;
				var _name : String = "";
				var theme:ThemeNameStruct;
				var table:TableNameStruct;
				for (var i:int = 0; i < _len; i++) 
				{
					if(MaintainType==SysMaintainType.Maintenance_Theme){
						theme = LobbyData.getInstance().getThemeNameStructByID(arr[i]);
						if(theme==null)
						{
							trace("MaintainsAnnouncementStruct: 找不到要维护的厅馆："+arr[i]);
							continue;
						}
						switch(LobbyManager.getInstance().lobbyAuth.Lang){
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
						
					}else if(MaintainType==SysMaintainType.Maintenance_Table){
						table = LobbyData.getInstance().getTableNameStructByID(arr[i].TableID);
						if(table==null)
						{
							trace("MaintainsAnnouncementStruct: 找不到要维护的赌桌："+arr[i].TableID);
							continue;
						}
						switch(LobbyManager.getInstance().lobbyAuth.Lang){
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
		private function combinationTime(skey:String,sValue:String):String{
			if(sValue.indexOf(skey)!=-1){
				var _str : String = LobbyData.getInstance().utcToLocal_1(StartTime) + "-" + LobbyData.getInstance().utcToLocal_1(EndTime);
				sValue = sValue.replace(skey,_str);
			}
			return sValue;
		}
	}
}
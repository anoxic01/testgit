module lobby.model.struct {
	export class UpdateTableSwitchStatusStruct {
		public var ThemeID		:	int;
		public var TableID		:	int;
		public var TableStatus	:	int;			//0-关闭		2-开启
		public var TableInfo	:	TableStruct;	
		
		public constructor(oData:Object) {
			ThemeID = oData.ThemeID;
			TableID = oData.TableID;
			TableStatus = oData.TableStatus;
			
			
			TableInfo = LobbyData.getInstance().lobbyInfo.findTableStructByTT(ThemeID, TableID);
			if(TableInfo==null){
				TableInfo = new TableStruct(oData.TableInfo);
				TableInfo.ThemeID = ThemeID;
				TableInfo.TableID = TableID;
				LobbyData.getInstance().lobbyInfo.addTable(ThemeID,TableInfo);
			}else{
				TableInfo.update(oData.TableInfo);
			}
			
			if(ThemeID==LobbyManager.getInstance().lobbyView.uCurrentThemeID){
				if(TableStatus==0){
					LobbyData.getInstance().addMaintainTableStruct(TableInfo);
				}else if(TableStatus==2){
					LobbyData.getInstance().removeMaintainTableStruct(TableInfo);
				}
			}
			
			
			//关闭或者开启桌子
			LobbyManager.getInstance().lobbyView.changeTableList(TableStatus,TableInfo);
		}
	}
}
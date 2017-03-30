module lobby.model.struct {
	export class UpdateTableSwitchStatusStruct {
		public ThemeID		:	number;
		public TableID		:	number;
		public TableStatus	:	number;			//0-关闭		2-开启
		public TableInfo	:	TableStruct;	
		
		public constructor(oData) {
			this.ThemeID = oData.ThemeID;
			this.TableID = oData.TableID;
			this.TableStatus = oData.TableStatus;
			
			
			this.TableInfo = model.LobbyData.getInstance().lobbyInfo.findTableStructByTT(this.ThemeID, this.TableID);
			if(this.TableInfo==null){
				this.TableInfo = new TableStruct(oData.TableInfo);
				this.TableInfo.ThemeID = this.ThemeID;
				this.TableInfo.TableID = this.TableID;
				model.LobbyData.getInstance().lobbyInfo.addTable(this.ThemeID,this.TableInfo);
			}else{
				this.TableInfo.update(oData.TableInfo);
			}
			
			if(this.ThemeID==manager.LobbyManager.getInstance().lobbyView.uCurrentThemeID){
				if(this.TableStatus==0){
					model.LobbyData.getInstance().addMaintainTableStruct(this.TableInfo);
				}else if(this.TableStatus==2){
					model.LobbyData.getInstance().removeMaintainTableStruct(this.TableInfo);
				}
			}
			
			
			//关闭或者开启桌子
			manager.LobbyManager.getInstance().lobbyView.changeTableList(this.TableStatus,this.TableInfo);
		}
	}
}
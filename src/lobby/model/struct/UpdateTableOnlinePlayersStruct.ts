module lobby.model.struct {
	export class UpdateTableOnlinePlayersStruct {
		public ThemeID			:	number;
		public TableID			:	number;
		public OnlinePlayers	:	number;
		
		public constructor(oData) {
			this.ThemeID = oData.ThemeID;
			this.TableID = oData.TableID;
			this.OnlinePlayers = oData.OnlinePlayers;
			var table : view.table.Table;
			
				table = manager.LobbyManager.getInstance().lobbyView.findTableByTT(this.ThemeID, this.TableID);
			

			if(table){
				table.updateOnlinePlayers(this.OnlinePlayers);
			}else{
//				console.log("error:更新赌桌在线人数异常。。。ThemeID:",ThemeID,"TableID:",TableID);
			}
		}
	}
}
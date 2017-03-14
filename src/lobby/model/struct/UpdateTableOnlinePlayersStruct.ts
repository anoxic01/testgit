module lobby.model.struct {
	export class UpdateTableOnlinePlayersStruct {
		public var ThemeID			:	int;
		public var TableID			:	int;
		public var OnlinePlayers	:	int;
		
		public constructor(oData:Object) {
			ThemeID = oData.ThemeID;
			TableID = oData.TableID;
			OnlinePlayers = oData.OnlinePlayers;
			var table : Table;
			
				table = LobbyManager.getInstance().lobbyView.findTableByTT(ThemeID, TableID);
			

			if(table){
				table.updateOnlinePlayers(OnlinePlayers);
			}else{
//				trace("error:更新赌桌在线人数异常。。。ThemeID:",ThemeID,"TableID:",TableID);
			}
		}
	}
}
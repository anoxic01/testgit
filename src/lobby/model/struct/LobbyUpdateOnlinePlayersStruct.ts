module lobby.model.struct {
	export class LobbyUpdateOnlinePlayersStruct {
		public OnlinePlayers	:	number;
		
		public constructor(oData) {
			this.OnlinePlayers = oData.OnlinePlayers;
			
			lobby.model.LobbyData.getInstance().lobbyInfo.OnlinePlayers = this.OnlinePlayers;
			if( manager.LobbyManager.getInstance().lobbyAuth.LoginMode == define.Define.INTERNET_BET_LOBBY ){
				manager.LobbyManager.getInstance().lobbyView.information.updateOnline();
				manager.LobbyManager.getInstance().lobbyView.quickThemeList.updateOnline();
			}else {
			
			}				
			
			
		}
	}
}
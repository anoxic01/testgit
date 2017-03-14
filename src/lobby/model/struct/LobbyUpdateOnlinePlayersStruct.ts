module lobby.model.struct {
	export class LobbyUpdateOnlinePlayersStruct {
		public var OnlinePlayers	:	int;
		
		public constructor(oData:Object) {
			OnlinePlayers = oData.OnlinePlayers;
			
			LobbyData.getInstance().lobbyInfo.OnlinePlayers = OnlinePlayers;
			if( LobbyManager.getInstance().lobbyAuth.loginMode == Define.INTERNET_BET_LOBBY ){
				LobbyManager.getInstance().lobbyView.infomation.updateOnline();
				LobbyManager.getInstance().lobbyView.quickThemeList.updateOnline();
			}else {
			
			}				
			
			
		}
	}
}
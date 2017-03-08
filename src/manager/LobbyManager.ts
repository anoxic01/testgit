module manager {
	export class LobbyManager {

		public stageW;
		public stageH;

		public lobbyAuth 		: lobby.data.LobbyAuth;
		public lobbyView 		: lobby.view.LobbyView;

		private static instance	:	LobbyManager;

		public static getInstance():LobbyManager{
            	if(this.instance == null){
                    this.instance = new LobbyManager();
            	}
            	return this.instance;
     		}
		public constructor() {
		}

		public initialize($lobbyAuth:lobby.data.LobbyAuth, $lobbyView:lobby.view.LobbyView):void{
			this.lobbyAuth = $lobbyAuth;
			this.lobbyView = $lobbyView;
		}
	}
}
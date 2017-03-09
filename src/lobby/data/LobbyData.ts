module lobby.data {
	export class LobbyData {

		public lobbyInfo;

		private static instance	:	LobbyData;

		public static getInstance():LobbyData{
			if(this.instance == null){
				this.instance = new LobbyData();
			}
			return this.instance;
     		}

		public constructor() {
		}
	}
}
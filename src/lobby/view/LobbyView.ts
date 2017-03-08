module lobby.view {
	export class LobbyView extends egret.DisplayObjectContainer {

		public information : lobby.view.LobbyInformation;
		public toolList : lobby.view.LobbyToolList;
		public ad : lobby.view.Advertisement;
		public panorama : lobby.view.Panorama;
		public themeList : lobby.view.ThemeList;

		public constructor() {
			super();

			let lobbyAuth;
			lobbyAuth = new lobby.data.LobbyAuth();

			manager.LobbyManager.getInstance().initialize(lobbyAuth, this);

			this.information = new lobby.view.LobbyInformation();
			this.addChild(this.information);

			this.toolList = new lobby.view.LobbyToolList();
			this.addChild(this.toolList);
			// console.log(this.toolList.width);
			this.toolList.x = manager.LobbyManager.getInstance().stageW - 605;
			this.toolList.y = 15;

			this.ad = new lobby.view.Advertisement();
			this.addChild(this.ad);
			this.ad.x = 0;
			this.ad.y = 56;

			this.panorama = new lobby.view.Panorama();
			this.addChild(this.panorama);
			this.panorama.x = 1496;
			this.panorama.y = 56;

			this.themeList = new lobby.view.ThemeList();
			this.addChild(this.themeList);
			this.themeList.x = 0;
			this.themeList.y = 296;

			
		}
	}
}
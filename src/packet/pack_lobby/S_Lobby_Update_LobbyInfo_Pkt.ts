module packet.pack_lobby {
	export class S_Lobby_Update_LobbyInfo_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		/**
		 0: 更新大廳在線人數
		 1: 更新賭桌在線人數
		 2: 通知視訊重載重連 
		 */		
		public UpdateType	:	number;			//更新种类
		/**
		 0: class LobbyUpdateOnlinePlayers
		 1: class UpdateTableOnlinePlayers
		 2: class VideoReload 
		 */		
		public UpdateData	;				//更新资料
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type		=	oData.Type;
			this.SN			=	oData.SN;
			this.UpdateType	=	oData.UpdateType;
			switch(this.UpdateType){
				case 0:	//大厅在线人数
					this.UpdateData = new lobby.model.struct.LobbyUpdateOnlinePlayersStruct(oData.UpdateData);
					break;
				case 1:	//赌桌在线人数
					this.UpdateData = new lobby.model.struct.UpdateTableOnlinePlayersStruct(oData.UpdateData);
					break;
				case 2:	//赌桌视讯重载重连
					this.UpdateData = new lobby.model.struct.VideoReloadStruct(oData.UpdateData);
					break;
				
				case 3:	//游戏广告
					lobby.model.LobbyData.getInstance().setAdvList(oData.UpdateData);
					manager.LobbyManager.getInstance().lobbyView.advertisement.setData();
					break;
				
				case 4:	//全景视讯重载重连
					lobby.model.LobbyData.getInstance().lobbyInfo.setPanoramaData(oData.UpdateData);
					manager.LobbyManager.getInstance().lobbyView.liveVideo.setData();
					if(manager.LobbyManager.getInstance().panelLiveVideo){
						manager.LobbyManager.getInstance().panelLiveVideo.setData();
					}
					break;
				
				case 5:	//赌桌开启或者关闭通知
					this.UpdateData = new lobby.model.struct.UpdateTableSwitchStatusStruct(oData.UpdateData);
					break;
				
				case 6:	//提供玩家或試玩玩家登入確認後取得廳館與賭桌名稱資料列表
					this.UpdateData = new lobby.model.struct.LobbyProvideThemeAndTableNamesStruct(oData.UpdateData);
					lobby.model.LobbyData.getInstance().initMaintainAnnouncement();
					break;
			}
		}
	}
}
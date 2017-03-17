module packet.lobby {
	export class S_Lobby_Update_LobbyInfo_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
		/**
		 0: 更新大廳在線人數
		 1: 更新賭桌在線人數
		 2: 通知視訊重載重連 
		 */		
		public var UpdateType	:	int;			//更新种类
		/**
		 0: class LobbyUpdateOnlinePlayers
		 1: class UpdateTableOnlinePlayers
		 2: class VideoReload 
		 */		
		public var UpdateData	:	*;				//更新资料
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			Type		=	oData.Type;
			SN			=	oData.SN;
			UpdateType	=	oData.UpdateType;
			switch(UpdateType){
				case 0:	//大厅在线人数
					UpdateData = new LobbyUpdateOnlinePlayersStruct(oData.UpdateData);
					break;
				case 1:	//赌桌在线人数
					UpdateData = new UpdateTableOnlinePlayersStruct(oData.UpdateData);
					break;
				case 2:	//赌桌视讯重载重连
					UpdateData = new VideoReloadStruct(oData.UpdateData);
					break;
				
				case 3:	//游戏广告
					LobbyData.getInstance().setAdvList(oData.UpdateData);
					LobbyManager.getInstance().lobbyView.advertisement.setData();
					break;
				
				case 4:	//全景视讯重载重连
					LobbyData.getInstance().lobbyInfo.setPanoramaData(oData.UpdateData);
					LobbyManager.getInstance().lobbyView.liveVideo.setData();
					if(LobbyManager.getInstance().panelLiveVideo){
						LobbyManager.getInstance().panelLiveVideo.setData();
					}
					break;
				
				case 5:	//赌桌开启或者关闭通知
					UpdateData = new UpdateTableSwitchStatusStruct(oData.UpdateData);
					break;
				
				case 6:	//提供玩家或試玩玩家登入確認後取得廳館與賭桌名稱資料列表
					UpdateData = new LobbyProvideThemeAndTableNamesStruct(oData.UpdateData);
					LobbyData.getInstance().initMaintainAnnouncement();
					break;
			}
		}
	}
}
module packet {
	export class S_Ack_Pkt implements iface.IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler):void
		{
			
		}
		
		public execute( _oData ):void
		{
			
			console.log("服務器回應 ACK封包序號：",_oData.SN);
			if( _oData.SN == lobby.model.ClientPacketSN.instance().Login_Lobby_Check_SN ){
				manager.LobbyManager.getInstance().nRevServerTime = egret.getTimer();
				console.log(this, "RevServerTime:" + manager.LobbyManager.getInstance().nRevServerTime );
//				LobbyManager.getInstance().runHeart();
//				LobbyManager.getInstance().lobbyView.hideLoading();
				//斷線重連,如在遊戲中必須重新顯示快速轉桌 介面
//				if( LobbyManager.getInstance().exitLevel == Define.EXIT_GAME ){
//					LobbyManager.getInstance().lobbyView.showQuickThemeList();
//				}
			}
			
		}
	}
}
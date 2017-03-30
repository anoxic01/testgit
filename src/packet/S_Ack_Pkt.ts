module packet {
	export class S_Ack_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
			
		}
		
		public execute( _oData:Object ):void
		{
			
			console.log("服務器回應 ACK封包序號：",_oData.SN);
			if( _oData.SN == ClientPacketSN.instance().Login_Lobby_Check_SN ){
				LobbyManager.getInstance().nRevServerTime = getTimer();
				Log.getInstance().log(this, "RevServerTime:" + LobbyManager.getInstance().nRevServerTime );
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
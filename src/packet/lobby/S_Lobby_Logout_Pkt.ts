module packet.lobby {
	export class S_Lobby_Logout_Pkt implements IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		public LogoutInfo	:	LogoutStruct;
		
		public constructor() {
		}
		
		public initControler(controler:GameControler):void{
			
		}
		
		public execute( oData:Object ):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			LogoutInfo	=	new LogoutStruct(oData.LogoutInfo);
			
			SharedObjectManager.setCDNList(null);
			SharedObjectManager.setResolution(null);
			SharedObjectManager.flush();
			
			console.log("登出系统！");
			//关闭视讯
			LobbyManager.getInstance().hideLiveVideo();
			LobbyManager.getInstance().lobbyView.liveVideo.stop();
			NetWorkManager.getInstance().onLobbyLogout(LogoutInfo.Reason);
			
			if(LobbyManager.getInstance().bRegist){
				LobbyManager.getInstance().regist();
			}
			
		}
	}
}
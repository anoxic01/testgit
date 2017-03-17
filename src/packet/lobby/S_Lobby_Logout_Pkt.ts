module packet.lobby {
	export class S_Lobby_Logout_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
		public var LogoutInfo	:	LogoutStruct;
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void{
			
		}
		
		public function execute( oData:Object ):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			LogoutInfo	=	new LogoutStruct(oData.LogoutInfo);
			
			SharedObjectManager.setCDNList(null);
			SharedObjectManager.setResolution(null);
			SharedObjectManager.flush();
			
			trace("登出系统！");
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
module packet.pack_lobby {
	export class S_Lobby_Logout_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		public LogoutInfo	;
		
		public constructor() {
		}
		
		public initControler(controler):void{
			
		}
		
		public execute( oData ):void
		{
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			this.LogoutInfo	=	new lobby.model.struct.LogoutStruct(oData.LogoutInfo);
			
			manager.SharedObjectManager.setCDNList(null);
			manager.SharedObjectManager.setResolution(null);
			manager.SharedObjectManager.flush();
			
			console.log("登出系统！");
			//关闭视讯
			manager.LobbyManager.getInstance().hideLiveVideo();
			manager.LobbyManager.getInstance().lobbyView.liveVideo.stop();
			manager.NetWorkManager.getInstance().onLobbyLogout(this.LogoutInfo.Reason);
			
			if(manager.LobbyManager.getInstance().bRegist){
				manager.LobbyManager.getInstance().regist();
			}
			
		}
	}
}
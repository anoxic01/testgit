module packet.pack_lobby {
	export class S_Lobby_Clear_Marquee_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		
		public constructor() {
		}

		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			
//				LobbyManager.getInstance().lobbyView.information.stopMarquee();
//				LobbyManager.getInstance().lobbyView.information.marquee.clearMarquee();


		}
	}
}
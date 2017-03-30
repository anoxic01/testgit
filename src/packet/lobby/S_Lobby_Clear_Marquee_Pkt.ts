module packet.lobby {
	export class S_Lobby_Clear_Marquee_Pkt implements IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		
		public constructor() {
		}

		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			
//				LobbyManager.getInstance().lobbyView.information.stopMarquee();
//				LobbyManager.getInstance().lobbyView.information.marquee.clearMarquee();


		}
	}
}
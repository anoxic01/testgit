module packet.lobby {
	export class S_Lobby_Clear_Marquee_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
		
		public constructor() {
		}

		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			
//				LobbyManager.getInstance().lobbyView.infomation.stopMarquee();
//				LobbyManager.getInstance().lobbyView.infomation.marquee.clearMarquee();


		}
	}
}
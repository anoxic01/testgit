module packet.lobby {
	export class S_Lobby_Update_Marquee_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
		public var vecList		:	Vector.<MarqueeStruct>;
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			trace("S_Lobby_Update_Marquee_Pkt:"+oData.MarqueeList);
			
//			var m_vecMarqueeList : Vector.<MarqueeStruct> = new Vector.<MarqueeStruct>();
//			var marqueeStruct : MarqueeStruct;
//			for (var j:int = 0; j < oData.MarqueeList.length; j++) 
//			{
//				marqueeStruct = new MarqueeStruct(oData.MarqueeList[j]);
//				m_vecMarqueeList.push(marqueeStruct);
//			}
//			
//			LobbyData.getInstance().MarqueeList = m_vecMarqueeList;
//			LobbyManager.getInstance().lobbyView.infomation.marquee.setData();
			
		}
	}
}
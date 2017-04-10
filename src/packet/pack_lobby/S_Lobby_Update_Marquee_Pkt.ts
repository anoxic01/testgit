module packet.pack_lobby {
	export class S_Lobby_Update_Marquee_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		public vecList		;
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			console.log("S_Lobby_Update_Marquee_Pkt:"+oData.MarqueeList);
			
//			var m_vecMarqueeList : <MarqueeStruct> = new <MarqueeStruct>();
//			var marqueeStruct : MarqueeStruct;
//			for (var j:number= 0; j < oData.MarqueeList.length; j++) 
//			{
//				marqueeStruct = new MarqueeStruct(oData.MarqueeList[j]);
//				m_vecMarqueeList.push(marqueeStruct);
//			}
//			
//			LobbyData.getInstance().MarqueeList = m_vecMarqueeList;
//			LobbyManager.getInstance().lobbyView.information.marquee.setData();
			
		}
	}
}
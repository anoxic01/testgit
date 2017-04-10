module packet.pack_lobby {
	export class S_Lobby_Announcement_Pkt implements iface.IProtocolStruct{
		public TimeStamp	:	String;
		
		/**
		 * 发送对象
		 * 0-all
		 * 1-agent group
		 */		
		public ToType		:	number;
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			console.log("公告数据包序号：", oData.SN);
			this.TimeStamp = oData.TimeStamp;
			this.ToType = oData.ToType;
			
			lobby.model.LobbyData.getInstance().readAnnouncement(oData.AnnouncementList);
		}
	}
}
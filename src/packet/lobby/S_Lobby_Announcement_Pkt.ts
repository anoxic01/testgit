module packet.lobby {
	export class S_Lobby_Announcement_Pkt implements IProtocolStruct{
		public TimeStamp	:	String;
		
		/**
		 * 发送对象
		 * 0-all
		 * 1-agent group
		 */		
		public ToType		:	number;
		
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			console.log("公告数据包序号：", oData.SN);
			TimeStamp = oData.TimeStamp;
			ToType = oData.ToType;
			
			LobbyData.getInstance().readAnnouncement(oData.AnnouncementList);
		}
	}
}
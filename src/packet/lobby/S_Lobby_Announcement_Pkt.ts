module packet.lobby {
	export class S_Lobby_Announcement_Pkt implements IProtocolStruct{
		public var TimeStamp	:	String;
		
		/**
		 * 发送对象
		 * 0-all
		 * 1-agent group
		 */		
		public var ToType		:	int;
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			trace("公告数据包序号：", oData.SN);
			TimeStamp = oData.TimeStamp;
			ToType = oData.ToType;
			
			LobbyData.getInstance().readAnnouncement(oData.AnnouncementList);
		}
	}
}
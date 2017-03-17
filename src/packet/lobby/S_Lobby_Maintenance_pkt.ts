module packet.lobby {
	export class S_Lobby_Maintenance_pkt implements IProtocolStruct{
		public var TimeStamp 	:	String;								//时间戳
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			TimeStamp = oData.TimeStamp;
			NoticeManeger.getInstance().reciveMaintain(oData.MA);
//			MA = new MaintainAnnouncementStruct(oData.MA);

		}
		
	}
}
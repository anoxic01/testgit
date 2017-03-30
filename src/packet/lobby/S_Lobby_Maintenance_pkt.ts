module packet.lobby {
	export class S_Lobby_Maintenance_pkt implements IProtocolStruct{
		public TimeStamp 	:	String;								//时间戳
		
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			TimeStamp = oData.TimeStamp;
			NoticeManeger.getInstance().reciveMaintain(oData.MA);
//			MA = new MaintainAnnouncementStruct(oData.MA);

		}
		
	}
}
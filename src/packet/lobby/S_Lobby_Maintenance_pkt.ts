module packet.lobby {
	export class S_Lobby_Maintenance_pkt implements iface.IProtocolStruct{
		public TimeStamp 	:	String;								//时间戳
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.TimeStamp = oData.TimeStamp;
			manager.NoticeManager.getInstance().reciveMaintain(oData.MA);
//			MA = new MaintainAnnouncementStruct(oData.MA);

		}
		
	}
}
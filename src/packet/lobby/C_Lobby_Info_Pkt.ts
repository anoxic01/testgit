module packet.lobby {
	export class C_Lobby_Info_Pkt  extends Packet{
		public var Type		:	int;
		
		/**
		 *填入抓取資料的類型
		 0: 取得賭桌路紙恢復資料
		 * enum LobbyGetDataType 
		 */		
		public var ReqType	:	int;
		
		/**
		 *配合抓取資料的類型有不同的 資料型態
		 0: class GetRoadmapReqInfo 
		 */		
		public var ArgInfo	:	GetRoadmapReqInfoStruct;
		
		public constructor() {
			ArgInfo = new GetRoadmapReqInfoStruct();
		}
	}
}
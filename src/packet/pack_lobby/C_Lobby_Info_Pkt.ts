module packet.pack_lobby {
	export class C_Lobby_Info_Pkt  extends Packet{
		public Type		:	number;
		
		/**
		 *填入抓取資料的類型
		 0: 取得賭桌路紙恢復資料
		 * enum LobbyGetDataType 
		 */		
		public ReqType	:	number;
		
		/**
		 *配合抓取資料的類型有不同的 資料型態
		 0: class GetRoadmapReqInfo 
		 */		
		public ArgInfo	;
		
		public constructor() {
			super();
			this.ArgInfo = new lobby.model.struct.GetRoadmapReqInfoStruct();
		}
	}
}
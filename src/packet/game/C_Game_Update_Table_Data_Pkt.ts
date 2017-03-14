module packet.game {
	export class C_Game_Update_Table_Data_Pkt  extends Packet{
		/**
		 * 填入抓取資料的類型
			0: 取得賭桌路紙恢復資料
		 */
		public var ReqType:int;
		/**
		 * 配合抓取資料的類型有不同的資料型態
			0: int 填入賭桌 ID
		 */
		public var ArgInfo:Object;
		
		public constructor() {
		}
	}
}
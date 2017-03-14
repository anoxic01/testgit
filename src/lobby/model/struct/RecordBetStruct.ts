module lobby.model.struct {
	export class RecordBetStruct {
		public var TableID	:	int;			//桌子台号
		public var Amt		:	Number;			//下注金额
		public var BetPos	:	String;			//下注区域	B1-B7
		public var Payout	:	Number;			//下注结果
		public var Result	:	Array;			//开局结果	B1-庄	B3-和	B4-闲
		
		public constructor() {
		}
		
		public function getResult():String{
			if(Result){
				if(Result.indexOf("B1")!=-1){
					return Define.BEAD_BANKER;
				}else if(Result.indexOf("B3")!=-1){
					return Define.BEAD_TIE;
				}
				else if(Result.indexOf("B4")!=-1){
					return Define.BEAD_PLAYER;
				}
			}
			
			return Define.BEAD_BANKER;
		}
	}
}
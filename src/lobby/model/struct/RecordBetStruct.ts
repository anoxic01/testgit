module lobby.model.struct {
	export class RecordBetStruct {
		public TableID	:	number;			//桌子台号
		public Amt		:	number;			//下注金额
		public BetPos	:	string;			//下注区域	B1-B7
		public Payout	:	number;			//下注结果
		public Result	:	any[];			//开局结果	B1-庄	B3-和	B4-闲
		
		public constructor() {
		}
		
		public getResult():string{
			if(this.Result){
				if(this.Result.indexOf("B1")!=-1){
					return define.Define.BEAD_BANKER;
				}else if(this.Result.indexOf("B3")!=-1){
					return define.Define.BEAD_TIE;
				}
				else if(this.Result.indexOf("B4")!=-1){
					return define.Define.BEAD_PLAYER;
				}
			}
			
			return define.Define.BEAD_BANKER;
		}
	}
}
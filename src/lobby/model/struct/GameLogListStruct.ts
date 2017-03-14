module lobby.model.struct {
	export class GameLogListStruct {
		public var ComplexGameList:Array;					//遊戲紀錄
		public var LogSummary:GameLogSummaryStruct;			//紀錄統計資訊
		
		public constructor() {
			LogSummary = new GameLogSummaryStruct();
			ComplexGameList = [];
		}
	}
}
module lobby.model.struct {
	export class GameLogListStruct {
		public ComplexGameList:any[];					//遊戲紀錄
		public LogSummary:GameLogSummaryStruct;			//紀錄統計資訊
		
		public constructor() {
			this.LogSummary = new GameLogSummaryStruct();
			this.ComplexGameList = [];
		}
	}
}
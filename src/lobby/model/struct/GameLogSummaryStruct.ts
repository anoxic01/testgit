module lobby.model.struct {
	export class GameLogSummaryStruct {
		
		public SubtotalBetAmount :number = 0; 		//下注金額(小計)
		public SubtotalResultAmount :number = 0;   //派彩金額(小計)
		public SubtotalRakeAmount:number = 0;	   //有效投注金額(小計)
		public TotalBetAmount :number = 0;			//下注金額(總計)
		public TotalResultAmount :number = 0;		//派彩金額(總計)
		public TotalRakeAmount :number = 0;			//有效投注金額(總計)
		public TotalDataCount :number= 0;				//資料總筆數
		
		public constructor() {
		}
	}
}
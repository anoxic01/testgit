module lobby.model.struct {
	export class GameLogSummaryStruct {
		
		public SubtotalBetAmount :Number = 0; 		//下注金額(小計)
		public SubtotalResultAmount :Number = 0;   //派彩金額(小計)
		public SubtotalRakeAmount:Number = 0;	   //有效投注金額(小計)
		public TotalBetAmount :Number = 0;			//下注金額(總計)
		public TotalResultAmount :Number = 0;		//派彩金額(總計)
		public TotalRakeAmount :Number = 0;			//有效投注金額(總計)
		public TotalDataCount :number= 0;				//資料總筆數
		
		public constructor() {
		}
	}
}
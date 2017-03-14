module lobby.model.struct {
	export class GameLogSummaryStruct {
		
		public var SubtotalBetAmount :Number = 0; 		//下注金額(小計)
		public var SubtotalResultAmount :Number = 0;   //派彩金額(小計)
		public var SubtotalRakeAmount:Number = 0;	   //有效投注金額(小計)
		public var TotalBetAmount :Number = 0;			//下注金額(總計)
		public var TotalResultAmount :Number = 0;		//派彩金額(總計)
		public var TotalRakeAmount :Number = 0;			//有效投注金額(總計)
		public var TotalDataCount :int = 0;				//資料總筆數
		
		public constructor() {
		}
	}
}
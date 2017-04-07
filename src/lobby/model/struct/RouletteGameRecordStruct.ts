module lobby.model.struct {
	export class RouletteGameRecordStruct {
		

		public RouletteNumber :number;		//輪盤開出號碼
		
		public Bet_Red:number;			//下注紅區金額
		public Bet_Black:number;		//下注黑區金額
		public Bet_Big:number;
		public Bet_Small:number;
		public Bet_Odd:number;
		public Bet_Even:number;
		
		
		public Win_Red:number;
		public Win_Black:number;
		public Win_Big:number;
		public Win_Small:number;
		public Win_Odd:number;
		public Win_Even:number;

		/// <summary>下注物件</summary>
		public RouletteObjectBet:Object
		
		/// <summary>贏錢物件</summary>
		public RouletteObjectWin:Object;
		
		
		
		public constructor() {
		}
	}
}
module lobby.model.struct {
	export class RouletteGameRecordStruct {
		

		public RouletteNumber :number;		//輪盤開出號碼
		
		public Bet_Red:Number;			//下注紅區金額
		public Bet_Black:Number;		//下注黑區金額
		public Bet_Big:Number;
		public Bet_Small:Number;
		public Bet_Odd:Number;
		public Bet_Even:Number;
		
		
		public Win_Red:Number;
		public Win_Black:Number;
		public Win_Big:Number;
		public Win_Small:Number;
		public Win_Odd:Number;
		public Win_Even:Number;

		/// <summary>下注物件</summary>
		public RouletteObjectBet:Object
		
		/// <summary>贏錢物件</summary>
		public RouletteObjectWin:Object;
		
		
		
		public constructor() {
		}
	}
}
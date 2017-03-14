module lobby.model.struct {
	export class RouletteGameRecordStruct {
		

		public var RouletteNumber :int;		//輪盤開出號碼
		
		public var Bet_Red:Number;			//下注紅區金額
		public var Bet_Black:Number;		//下注黑區金額
		public var Bet_Big:Number;
		public var Bet_Small:Number;
		public var Bet_Odd:Number;
		public var Bet_Even:Number;
		
		
		public var Win_Red:Number;
		public var Win_Black:Number;
		public var Win_Big:Number;
		public var Win_Small:Number;
		public var Win_Odd:Number;
		public var Win_Even:Number;

		/// <summary>下注物件</summary>
		public var RouletteObjectBet:Object
		
		/// <summary>贏錢物件</summary>
		public var RouletteObjectWin:Object;
		
		
		
		public constructor() {
		}
	}
}
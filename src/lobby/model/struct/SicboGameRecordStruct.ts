module lobby.model.struct {
	export class SicboGameRecordStruct {
		public var Dice_1 :int;
		public var Dice_2 :int;
		public var Dice_3 :int;
		public var Bet_Big:Number;
		public var Bet_Small:Number;
		public var Bet_Odd:Number;
		public var Bet_Even:Number;
		public var Win_Big:Number;
		public var Win_Small:Number;
		public var Win_Odd:Number;
		public var Win_Even:Number;
		/// <summary>下注物件</summary>
		public var SicboObjectBet :Object;
		
		/// <summary>贏錢物件</summary>
		public var SicboObjectWin :Object;
		
		public constructor() {
		}
	}
}
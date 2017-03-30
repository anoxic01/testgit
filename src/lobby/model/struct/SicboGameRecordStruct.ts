module lobby.model.struct {
	export class SicboGameRecordStruct {
		public Dice_1 :number;
		public Dice_2 :number;
		public Dice_3 :number;
		public Bet_Big:Number;
		public Bet_Small:Number;
		public Bet_Odd:Number;
		public Bet_Even:Number;
		public Win_Big:Number;
		public Win_Small:Number;
		public Win_Odd:Number;
		public Win_Even:Number;
		/// <summary>下注物件</summary>
		public SicboObjectBet :Object;
		
		/// <summary>贏錢物件</summary>
		public SicboObjectWin :Object;
		
		public constructor() {
		}
	}
}
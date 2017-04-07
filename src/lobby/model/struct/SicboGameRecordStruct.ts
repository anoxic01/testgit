module lobby.model.struct {
	export class SicboGameRecordStruct {
		public Dice_1 :number;
		public Dice_2 :number;
		public Dice_3 :number;
		public Bet_Big:number;
		public Bet_Small:number;
		public Bet_Odd:number;
		public Bet_Even:number;
		public Win_Big:number;
		public Win_Small:number;
		public Win_Odd:number;
		public Win_Even:number;
		/// <summary>下注物件</summary>
		public SicboObjectBet :Object;
		
		/// <summary>贏錢物件</summary>
		public SicboObjectWin :Object;
		
		public constructor() {
		}
	}
}
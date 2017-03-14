module lobby.model.struct {
	export class DragonTigerGameRecordStruct {
		
		public var DragonCard:String;
		
		public var TigerCard:String;
		public var DragonPoint:int;
		public var TigerPoint:int;
		public var Bet_Dragon:Number;
		public var Bet_Tiger:Number;
		public var Bet_Tie:Number;
		
		public var Win_Dragon:Number;
		public var Win_Tiger:Number;
		public var Win_Tie:Number;
		/// <summary>下注物件</summary>
		public var DragonTigerObjectBet :Object
		
		/// <summary>贏錢物件</summary>
		public var DragonTigerObjectWin :Object;
		
		public constructor() {
		}
	}
}
module lobby.model.struct {
	export class BaccaratGameRecordStruct {
		public var BankerCard1:String;
		public var BankerCard2:String;
		public var BankerCard3:String;
		public var PlayerCard1:String;
		public var PlayerCard2:String;
		public var PlayerCard3:String;
		
		public var BankerTotalPoint:int;
		public var PlayerTotalPoint:int;
		
		public var BaccaratObjectBet:Object;
		public var BaccaratObjectWin:Object;
		
		public var BankerBet:Number;
		public var PlayerBet:Number;
		public var TieBet:Number;
		public var BankerPairBet:Number;
		public var PlayerPairBet:Number;
		public var SmallBet:Number;
		public var BigBet:Number;
		
		public var BankerWin:Number;
		public var PlayerWin:Number;
		public var TieWin:Number;
		public var BankerPairWin:Number;
		public var PlayerPairWin:Number;
		public var SmallWin:Number;
		public var BigWin:Number;
		public constructor() {
		}
	}
}
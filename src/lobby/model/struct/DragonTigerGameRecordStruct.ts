module lobby.model.struct {
	export class DragonTigerGameRecordStruct {
		
		public DragonCard:String;
		
		public TigerCard:String;
		public DragonPoint:number;
		public TigerPoint:number;
		public Bet_Dragon:Number;
		public Bet_Tiger:Number;
		public Bet_Tie:Number;
		
		public Win_Dragon:Number;
		public Win_Tiger:Number;
		public Win_Tie:Number;
		/// <summary>下注物件</summary>
		public DragonTigerObjectBet :Object
		
		/// <summary>贏錢物件</summary>
		public DragonTigerObjectWin :Object;
		
		public constructor() {
		}
	}
}
module lobby.model.struct {
	export class DragonTigerGameRecordStruct {
		
		public DragonCard:string;
		
		public TigerCard:string;
		public DragonPoint:number;
		public TigerPoint:number;
		public Bet_Dragon:number;
		public Bet_Tiger:number;
		public Bet_Tie:number;
		
		public Win_Dragon:number;
		public Win_Tiger:number;
		public Win_Tie:number;
		/// <summary>下注物件</summary>
		public DragonTigerObjectBet :Object
		
		/// <summary>贏錢物件</summary>
		public DragonTigerObjectWin :Object;
		
		public constructor() {
		}
	}
}
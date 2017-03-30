module lobby.model.struct {
	export class BaccaratGameRecordStruct {
		public BankerCard1:String;
		public BankerCard2:String;
		public BankerCard3:String;
		public PlayerCard1:String;
		public PlayerCard2:String;
		public PlayerCard3:String;
		
		public BankerTotalPoint:number;
		public PlayerTotalPoint:number;
		
		public BaccaratObjectBet:Object;
		public BaccaratObjectWin:Object;
		
		public BankerBet:Number;
		public PlayerBet:Number;
		public TieBet:Number;
		public BankerPairBet:Number;
		public PlayerPairBet:Number;
		public SmallBet:Number;
		public BigBet:Number;
		
		public BankerWin:Number;
		public PlayerWin:Number;
		public TieWin:Number;
		public BankerPairWin:Number;
		public PlayerPairWin:Number;
		public SmallWin:Number;
		public BigWin:Number;
		public constructor() {
		}
	}
}
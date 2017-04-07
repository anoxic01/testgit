module lobby.model.struct {
	export class BaccaratGameRecordStruct {
		public BankerCard1:string;
		public BankerCard2:string;
		public BankerCard3:string;
		public PlayerCard1:string;
		public PlayerCard2:string;
		public PlayerCard3:string;
		
		public BankerTotalPoint:number;
		public PlayerTotalPoint:number;
		
		public BaccaratObjectBet:Object;
		public BaccaratObjectWin:Object;
		
		public BankerBet:number;
		public PlayerBet:number;
		public TieBet:number;
		public BankerPairBet:number;
		public PlayerPairBet:number;
		public SmallBet:number;
		public BigBet:number;
		
		public BankerWin:number;
		public PlayerWin:number;
		public TieWin:number;
		public BankerPairWin:number;
		public PlayerPairWin:number;
		public SmallWin:number;
		public BigWin:number;
		public constructor() {
		}
	}
}
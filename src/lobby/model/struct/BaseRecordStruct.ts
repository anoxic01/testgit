module lobby.model.struct {
	export class BaseRecordStruct {
		public GameID:number;
		public BetJsonString:string;
		public WinJsonString:string;
		public GoldCoinBet:number;
		public TotalWin:number;
		public RakeAmount:number;
		public RakeResult:number;
		public ResultAmount:number;
		public GCoinBudget:number;
		public TotalCredit:number;
		public BetCreateDateTime:Object;
		public RecordGameNumber:string;					//訂單編號
		public TableID:number;
		public GameNumber:number;
		public ShoeNumber:number;
		public IsResult: boolean;
		public GameCreateDateTime:Object;
		public SimpleGameResultString:string;
		public Display_GameRecord:any[];
		public PlayVideoAddress:string;
		public PlayVideoName:string;
		public PlayVideoAppName:string;
		public VideoUrl:string;
		
		public constructor() {
		}
	}
}
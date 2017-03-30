module lobby.model.struct {
	export class BaseRecordStruct {
		public GameID:number;
		public BetJsonString:String;
		public WinJsonString:String;
		public GoldCoinBet:Number;
		public TotalWin:Number;
		public RakeAmount:Number;
		public RakeResult:Number;
		public ResultAmount:Number;
		public GCoinBudget:Number;
		public TotalCredit:number;
		public BetCreateDateTime:Object;
		public RecordGameNumber:String;					//訂單編號
		public TableID:number;
		public GameNumber:number;
		public ShoeNumber:number;
		public IsResult: boolean;
		public GameCreateDateTime:Object;
		public SimpleGameResultString:String;
		public Display_GameRecord:any[];
		public PlayVideoAddress:String;
		public PlayVideoName:String;
		public PlayVideoAppName:String;
		public VideoUrl:String;
		
		public constructor() {
		}
	}
}
module lobby.model.struct {
	export class BaseRecordStruct {
		public var GameID:int;
		public var BetJsonString:String;
		public var WinJsonString:String;
		public var GoldCoinBet:Number;
		public var TotalWin:Number;
		public var RakeAmount:Number;
		public var RakeResult:Number;
		public var ResultAmount:Number;
		public var GCoinBudget:Number;
		public var TotalCredit:int;
		public var BetCreateDateTime:Object;
		public var RecordGameNumber:String;					//訂單編號
		public var TableID:int;
		public var GameNumber:int;
		public var ShoeNumber:int;
		public var IsResult:Boolean;
		public var GameCreateDateTime:Object;
		public var SimpleGameResultString:String;
		public var Display_GameRecord:Array;
		public var PlayVideoAddress:String;
		public var PlayVideoName:String;
		public var PlayVideoAppName:String;
		public var VideoUrl:String;
		
		public constructor() {
		}
	}
}
module lobby.model.struct {
	export class GameRecordSearchStruct {
		//玩家ID
		public var UserID:int;
		
		//玩家身分(正式帳號/試玩帳號)<
		public var Identity:int;
		
		//資料起始編號
		public var StartRowNo:int;
		
		//要求取得的資料筆數
		public var RequestDataSize:int;
		
		//遊戲類型   
		public var GameID:int;
		
		//查詢開始時間    
		public var StartDateTime:String;
		
		//查詢結束時間 
		public var EndDateTime:String;		
		
		public constructor() {
		}
	}
}
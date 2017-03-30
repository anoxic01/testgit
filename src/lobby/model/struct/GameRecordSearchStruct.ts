module lobby.model.struct {
	export class GameRecordSearchStruct {
		//玩家ID
		public UserID:number;
		
		//玩家身分(正式帳號/試玩帳號)<
		public Identity:number;
		
		//資料起始編號
		public StartRowNo:number;
		
		//要求取得的資料筆數
		public RequestDataSize:number;
		
		//遊戲類型   
		public GameID:number;
		
		//查詢開始時間    
		public StartDateTime:String;
		
		//查詢結束時間 
		public EndDateTime:String;		
		
		public constructor() {
		}
	}
}
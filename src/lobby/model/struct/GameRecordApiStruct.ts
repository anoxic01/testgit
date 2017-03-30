module lobby.model.struct {
	export class GameRecordApiStruct {
		public SearchCondition		:	GameRecordSearchStruct;			//查詢條件
		public RecordList			:	GameLogListStruct;				//取得的遊戲紀錄
	
		public constructor() {
			this.SearchCondition = new GameRecordSearchStruct();
		}
		
		public init( _oData ):void {
			if( _oData == null ){
				console.log("遊戲紀錄 數據錯誤::");
				return;
			}
			
			
			if(  _oData.RecordList != null ){
				
				this.RecordList = new GameLogListStruct();
				this.RecordList.LogSummary.SubtotalBetAmount =  _oData.RecordList.LogSummary.SubtotalBetAmount;
				this.RecordList.LogSummary.SubtotalResultAmount =  _oData.RecordList.LogSummary.SubtotalResultAmount;
				this.RecordList.LogSummary.SubtotalRakeAmount =  _oData.RecordList.LogSummary.SubtotalRakeAmount;
				this.RecordList.LogSummary.TotalBetAmount =  _oData.RecordList.LogSummary.TotalBetAmount;
				this.RecordList.LogSummary.TotalResultAmount =  _oData.RecordList.LogSummary.TotalResultAmount;
				this.RecordList.LogSummary.TotalRakeAmount =  _oData.RecordList.LogSummary.TotalRakeAmount;
				this.RecordList.LogSummary.TotalDataCount =  _oData.RecordList.LogSummary.TotalDataCount;
				
				var _ar:any[] = _oData.RecordList.ComplexGameList;
				var _complexGameRecordStruct:ComplexGameRecordStruct;
				for( var i:number= 0; i < _ar.length ; i++ ){
					_complexGameRecordStruct = new ComplexGameRecordStruct();
					_complexGameRecordStruct.init( _ar[i] );
					this.RecordList.ComplexGameList.push( _complexGameRecordStruct );
				}	
				
			}
			
			if( _oData.SearchCondition != null ){
				this.SearchCondition.EndDateTime 	= _oData.SearchCondition.EndDateTime;
				this.SearchCondition.UserID 			= _oData.SearchCondition.UserID;
				this.SearchCondition.Identity 		= _oData.SearchCondition.Identity;
				this.SearchCondition.StartRowNo 		= _oData.SearchCondition.StartRowNo;
				this.SearchCondition.RequestDataSize = _oData.SearchCondition.RequestDataSize;
				this.SearchCondition.GameID 			= _oData.SearchCondition.GameID;
				this.SearchCondition.StartDateTime 	= _oData.SearchCondition.StartDateTime;	
			}

	
		}
		
	}
}
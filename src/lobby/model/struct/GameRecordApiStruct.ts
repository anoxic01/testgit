module lobby.model.struct {
	export class GameRecordApiStruct {
		public var SearchCondition		:	GameRecordSearchStruct;			//查詢條件
		public var RecordList			:	GameLogListStruct;				//取得的遊戲紀錄
	
		public constructor() {
			SearchCondition = new GameRecordSearchStruct();
		}
		
		public function init( _oData:Object ):void {
			if( _oData == null ){
				trace("遊戲紀錄 數據錯誤::");
				return;
			}
			
			
			if(  _oData.RecordList != null ){
				
				RecordList = new GameLogListStruct();
				RecordList.LogSummary.SubtotalBetAmount =  _oData.RecordList.LogSummary.SubtotalBetAmount;
				RecordList.LogSummary.SubtotalResultAmount =  _oData.RecordList.LogSummary.SubtotalResultAmount;
				RecordList.LogSummary.SubtotalRakeAmount =  _oData.RecordList.LogSummary.SubtotalRakeAmount;
				RecordList.LogSummary.TotalBetAmount =  _oData.RecordList.LogSummary.TotalBetAmount;
				RecordList.LogSummary.TotalResultAmount =  _oData.RecordList.LogSummary.TotalResultAmount;
				RecordList.LogSummary.TotalRakeAmount =  _oData.RecordList.LogSummary.TotalRakeAmount;
				RecordList.LogSummary.TotalDataCount =  _oData.RecordList.LogSummary.TotalDataCount;
				
				var _ar:Array = _oData.RecordList.ComplexGameList;
				var _complexGameRecordStruct:ComplexGameRecordStruct;
				for( var i:int = 0; i < _ar.length ; i++ ){
					_complexGameRecordStruct = new ComplexGameRecordStruct();
					_complexGameRecordStruct.init( _ar[i] );
					RecordList.ComplexGameList.push( _complexGameRecordStruct );
				}	
				
			}
			
			if( _oData.SearchCondition != null ){
				SearchCondition.EndDateTime 	= _oData.SearchCondition.EndDateTime;
				SearchCondition.UserID 			= _oData.SearchCondition.UserID;
				SearchCondition.Identity 		= _oData.SearchCondition.Identity;
				SearchCondition.StartRowNo 		= _oData.SearchCondition.StartRowNo;
				SearchCondition.RequestDataSize = _oData.SearchCondition.RequestDataSize;
				SearchCondition.GameID 			= _oData.SearchCondition.GameID;
				SearchCondition.StartDateTime 	= _oData.SearchCondition.StartDateTime;	
			}

	
		}
		
	}
}
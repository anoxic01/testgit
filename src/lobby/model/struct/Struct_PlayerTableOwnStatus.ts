module lobby.struct {
	export class Struct_PlayerTableOwnStatus {
		/**
		 1: 新增或更新
		 2: 刪除 
		 */		
		public var Status			:	int;						//狀態	1-新增、增加		2-删除
		public var PlayerID			:	int;
		public var TableID			:	int;
		public var CurrBetLimitID	:	int;						//目前賭桌限紅 ID		狀態為刪除不用處理此欄位
		public var IsTableOwner		:	Boolean;					//是否為桌主			狀態為刪除不用處理此欄位
		public var IsOtherBeter		:	Boolean;					//是否为旁注
		

		public constructor(oData:Object) {
			Status = oData.Status;
			PlayerID = oData.PlayerID;
			TableID = oData.TableID;
			if(Status==2){
				return;
			}
			CurrBetLimitID = oData.CurrBetLimitID;
			IsTableOwner = oData.IsTableOwner;
			IsOtherBeter = oData.IsOtherBeter;
		}
	}
}
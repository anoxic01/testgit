module lobby.model.struct {
	export class PlayerTableOwnStatusStruct {
		/**
		 1: 新增或更新
		 2: 刪除 
		 */		
		public Status			:	number;						//狀態	1-新增、增加		2-删除
		public PlayerID			:	number;
		public TableID			:	number;
		public CurrBetLimitID	:	number;						//目前賭桌限紅 ID		狀態為刪除不用處理此欄位
		public IsTableOwner		:	 boolean;					//是否為桌主			狀態為刪除不用處理此欄位
		public IsOtherBeter		:	 boolean;					//是否为旁注
		

		public constructor(oData) {
			this.Status = oData.Status;
			this.PlayerID = oData.PlayerID;
			this.TableID = oData.TableID;
			if(this.Status==2){
				return;
			}
			this.CurrBetLimitID = oData.CurrBetLimitID;
			this.IsTableOwner = oData.IsTableOwner;
			this.IsOtherBeter = oData.IsOtherBeter;
		}
	}
}
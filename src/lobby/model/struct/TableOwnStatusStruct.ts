module lobby.model.struct {
	export class TableOwnStatusStruct {
		public Unknow		:	number;		//初始
		public AddOrUpdate	:	number;		//新增或更新
		public Delete		:	number;		//刪除
		
		public constructor(oData) {
			this.Unknow = oData.Unknow;
			this.AddOrUpdate = oData.AddOrUpdate;
			this.Delete = oData.Delete;
		}
	}
}
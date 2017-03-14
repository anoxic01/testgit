module lobby.model.struct {
	export class TableOwnStatusStruct {
		public var Unknow		:	int;		//初始
		public var AddOrUpdate	:	int;		//新增或更新
		public var Delete		:	int;		//刪除
		
		public constructor(oData:Object) {
			Unknow = oData.Unknow;
			AddOrUpdate = oData.AddOrUpdate;
			Delete = oData.Delete;
		}
	}
}
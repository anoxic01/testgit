module lobby.model.struct {
	export class TableVideoStreamStruct {
		public var TableID		:	int;			//賭桌 ID
		public var AppName		:	String;			//應用名稱
		public var StreamName	:	String;			//串流名稱
		
		public constructor(oData:Object) {
			TableID = oData.TableID;
			AppName = oData.AppName;
			StreamName = oData.StreamName;
		}
	}
}
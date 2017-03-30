module lobby.model.struct {
	export class TableVideoStreamStruct {
		public TableID		:	number;			//賭桌 ID
		public AppName		:	String;			//應用名稱
		public StreamName	:	String;			//串流名稱
		
		public constructor(oData) {
			this.TableID = oData.TableID;
			this.AppName = oData.AppName;
			this.StreamName = oData.StreamName;
		}
	}
}
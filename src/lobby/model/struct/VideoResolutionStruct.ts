module lobby.model.struct {
	export class VideoResolutionStruct {
		public var IsDef		:	Boolean;		//是否為預設
		public var PriorityNo	:	int;			//优先级别
		public var Resolution	:	String;			//解析度
		
		public constructor(oData:Object) {
			IsDef = oData.IsDef;
			PriorityNo = oData.PriorityNo;
			Resolution = oData.Resolution;
		}
	}
}
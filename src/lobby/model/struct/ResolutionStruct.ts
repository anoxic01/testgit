module lobby.model.struct {
	export class ResolutionStruct {
		public IsDef		:	 boolean;		//是否為預設
		public PriorityNo	:	number;			//优先级别
		public Resolution	:	String;			//解析度
		
		public constructor(oData) {
			this.IsDef = oData.IsDef;
			this.PriorityNo = oData.PriorityNo;
			this.Resolution = oData.Resolution;
		}
	}
}
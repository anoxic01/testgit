module lobby.model.struct {
	export class VideoCDNStruct {
		public var ChannelNo	:	int;				//频道序号
		public var IsDef		:	Boolean;			//是否预设
		public var CDNUrl		:	String;				//地址
		
		public constructor(oData:Object) {
			ChannelNo = oData.ChannelNo;
			IsDef = oData.IsDef;
			CDNUrl = oData.CDNUrl;
		}
	}
}
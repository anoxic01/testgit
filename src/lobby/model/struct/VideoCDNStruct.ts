module lobby.model.struct {
	export class VideoCDNStruct {
		public ChannelNo	:	number;				//频道序号
		public IsDef		:	 boolean;			//是否预设
		public CDNUrl		:	String;				//地址
		
		public constructor(oData) {
			this.ChannelNo = oData.ChannelNo;
			this.IsDef = oData.IsDef;
			this.CDNUrl = oData.CDNUrl;
		}
	}
}
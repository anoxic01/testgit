module lobby.model.struct {
	export class AdvertisementStruct {
		public var AdsUrl	:	String;			//图片路径
		public var LinkUrl	:	String;			//连接地址
		public var SN		:	uint;			//序号
		public constructor(oData:Object=null) {
			if(oData == null){
				return;
			}
			AdsUrl = oData.AdsUrl;
			LinkUrl = oData.LinkUrl;
			SN = oData.SN;
		}
	}
}
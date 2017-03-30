module lobby.model.struct {
	export class AdvertisementStruct {
		public AdsUrl	:	string;			//图片路径
		public LinkUrl	:	string;			//连接地址
		public SN		:	number;			//序号
		public constructor(oData=null) {
			if(oData == null){
				return;
			}
			this.AdsUrl = oData.AdsUrl;
			this.LinkUrl = oData.LinkUrl;
			this.SN = oData.SN;
		}
	}
}
module lobby.model.struct {
	export class MarqueeStruct {
		public Lang				:	number;			// 語系
        public MarqueeMessage	:	any[];			// 跑馬燈訊息
		
		public constructor( oData=null ) {
			if(oData){
				this.Lang = oData.Lang;
				this.MarqueeMessage = oData.MarqueeMessage;
			}else{
				this.MarqueeMessage = [];
			}
		}
	}
}
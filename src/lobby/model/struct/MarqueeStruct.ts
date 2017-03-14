module lobby.model.struct {
	export class MarqueeStruct {
		public var Lang				:	int;			// 語系
        public var MarqueeMessage	:	Array;			// 跑馬燈訊息
		
		public constructor( oData:Object=null ) {
			if(oData){
				Lang = oData.Lang;
				MarqueeMessage = oData.MarqueeMessage;
			}else{
				MarqueeMessage = [];
			}
		}
	}
}
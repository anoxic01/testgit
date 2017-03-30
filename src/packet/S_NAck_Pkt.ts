module packet {
	export class S_NAck_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
			
		}
		
		public execute( _oData:Object ):void
		{
			
			console.log("服務器回應 NACK封包序號：",_oData.SN);
			
		}
	}
}
module packet {
	export class S_NAck_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
			
		}
		
		public function execute( _oData:Object ):void
		{
			
			trace("服務器回應 NACK封包序號：",_oData.SN);
			
		}
	}
}
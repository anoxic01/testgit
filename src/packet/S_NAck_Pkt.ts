module packet {
	export class S_NAck_Pkt implements iface.IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler):void
		{
			
		}
		
		public execute( _oData ):void
		{
			
			console.log("服務器回應 NACK封包序號：",_oData.SN);
			
		}
	}
}
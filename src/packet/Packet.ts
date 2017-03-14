module packet {
	export class Packet {
     	
        protected var _SN	:	uint;		//封包序号 
		
		public constructor() {
		}
		
		public function get SN():uint 
		{
			return _SN;
		}
		
		public function set SN(value:uint):void 
		{
			_SN = value;
		}
	}
}
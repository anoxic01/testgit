module packet {
	export class Packet {
     	
        protected _SN	:	number;		//封包序号 
		
		public constructor() {
		}
		
		get SN():number 
		{
			return _SN;
		}
		
		set  SN(value:number) 
		{
			_SN = value;
		}
	}
}
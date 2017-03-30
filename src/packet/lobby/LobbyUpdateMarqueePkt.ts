module packet.lobby {
	export class LobbyUpdateMarqueePkt  extends Packet{
        /// <summary>
        /// 跑馬燈資訊
        /// </summary>
        private marqueeList:<MarqueeStruct>;

		public constructor() {
			marqueeList = new <MarqueeStruct>();
		}
		
		get MarqueeList():<MarqueeStruct> 
		{
			return marqueeList;
		}
		
		set  MarqueeList(value:<MarqueeStruct>) 
		{
			marqueeList = value;
		}
		
	}
}
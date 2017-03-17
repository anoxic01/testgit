module packet.lobby {
	export class LobbyUpdateMarqueePkt  extends Packet{
        /// <summary>
        /// 跑馬燈資訊
        /// </summary>
        private var marqueeList:Vector.<MarqueeStruct>;

		public constructor() {
			marqueeList = new Vector.<MarqueeStruct>();
		}
		
		public function get MarqueeList():Vector.<MarqueeStruct> 
		{
			return marqueeList;
		}
		
		public function set MarqueeList(value:Vector.<MarqueeStruct>):void 
		{
			marqueeList = value;
		}
		
	}
}
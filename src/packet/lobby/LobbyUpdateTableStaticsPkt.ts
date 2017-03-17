module packet.lobby {
	export class LobbyUpdateTableStaticsPkt  extends Packet{
        /// <summary>
        /// 即時彩池資訊
        /// </summary>
        private var staticsInfo : StaticsInfoStruct;

		public constructor() {
		}
		
		public function getStaticsInfo():StaticsInfoStruct 
		{
			return staticsInfo;
		}
		
		public function setStaticsInfo(value:StaticsInfoStruct):void 
		{
			staticsInfo = value;
		}
		
	}
}
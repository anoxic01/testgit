module packet.lobby {
	export class LobbyUpdateTableStaticsPkt  extends Packet{
        /// <summary>
        /// 即時彩池資訊
        /// </summary>
        private staticsInfo : StaticsInfoStruct;

		public constructor() {
		}
		
		public getStaticsInfo():StaticsInfoStruct 
		{
			return staticsInfo;
		}
		
		public setStaticsInfo(value:StaticsInfoStruct):void 
		{
			staticsInfo = value;
		}
		
	}
}
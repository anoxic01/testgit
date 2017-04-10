module packet.pack_lobby {
	export class LobbyUpdateTableStaticsPkt  extends Packet{
        /// <summary>
        /// 即時彩池資訊
        /// </summary>
        private staticsInfo;

		public constructor() {
			super();
		}
		
		public getStaticsInfo():lobby.model.struct.StaticsInfoStruct 
		{
			return this.staticsInfo;
		}
		
		public setStaticsInfo(value:lobby.model.struct.StaticsInfoStruct):void 
		{
			this.staticsInfo = value;
		}
		
	}
}
module packet.pack_lobby {
	export class LobbyUpdateMarqueePkt  extends Packet{
        /// <summary>
        /// 跑馬燈資訊
        /// </summary>
        public MarqueeList;

		public constructor() {
			super();
			this.MarqueeList = new Array<lobby.model.struct.MarqueeStruct>();
		}
		
	}
}
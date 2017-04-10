module packet.pack_lobby {
	export class C_Lobby_Login_Pkt  extends Packet{
        
        /// <summary>
        /// 登入認證資訊
        /// </summary>
        public AuthInfo;
		
		
		public constructor() {
			super();
			this.AuthInfo = new lobby.model.struct.AuthInfoStruct();
		}
		
	}
}
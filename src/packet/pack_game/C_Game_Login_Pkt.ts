module packet.pack_game {
	export class C_Game_Login_Pkt {
        /// <summary>
        /// 認證資訊
        /// </summary>
        public AuthInfo;
		
		public constructor() {
			this.AuthInfo = new lobby.model.struct.TableAuthStruct();
		}
		
	}
}
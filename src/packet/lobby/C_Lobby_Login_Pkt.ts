module packet.lobby {
	export class C_Lobby_Login_Pkt  extends Packet{
        
        /// <summary>
        /// 登入認證資訊
        /// </summary>
        private var authInfo:AuthInfoStruct;
		
		
		public constructor() {
			authInfo = new AuthInfoStruct();
		}
		
		public function get AuthInfo():AuthInfoStruct 
		{
			return authInfo;
		}
		
		public function set AuthInfo(value:AuthInfoStruct):void 
		{
			authInfo = value;
		}
		
	}
}
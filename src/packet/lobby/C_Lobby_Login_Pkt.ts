module packet.lobby {
	export class C_Lobby_Login_Pkt  extends Packet{
        
        /// <summary>
        /// 登入認證資訊
        /// </summary>
        private authInfo:AuthInfoStruct;
		
		
		public constructor() {
			authInfo = new AuthInfoStruct();
		}
		
		get AuthInfo():AuthInfoStruct 
		{
			return authInfo;
		}
		
		set  AuthInfo(value:AuthInfoStruct) 
		{
			authInfo = value;
		}
		
	}
}
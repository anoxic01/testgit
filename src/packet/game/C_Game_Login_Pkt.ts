module packet.game {
	export class C_Game_Login_Pkt {
        /// <summary>
        /// 認證資訊
        /// </summary>
        private authInfo:TableAuthStruct;
		
		public constructor() {
			authInfo = new TableAuthStruct();
		}

		
		get AuthInfo():TableAuthStruct 
		{
			return authInfo;
		}
		
		set  AuthInfo(value:TableAuthStruct) 
		{
			authInfo = value;
		}
		
		
	}
}
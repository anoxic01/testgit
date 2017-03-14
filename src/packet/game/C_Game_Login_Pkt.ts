module packet.game {
	export class C_Game_Login_Pkt {
        /// <summary>
        /// 認證資訊
        /// </summary>
        private var authInfo:TableAuthStruct;
		
		public constructor() {
			authInfo = new TableAuthStruct();
		}

		
		public function get AuthInfo():TableAuthStruct 
		{
			return authInfo;
		}
		
		public function set AuthInfo(value:TableAuthStruct):void 
		{
			authInfo = value;
		}
		
		
	}
}
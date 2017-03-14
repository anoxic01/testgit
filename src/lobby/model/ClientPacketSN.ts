module lobby.model {
	export class ClientPacketSN {
		private static var _packetSNInstance:ClientPacketSN;
		public  var Login_Lobby_Check_SN:uint = 0;		//大廳登入確認封包
		public  var Login_Game_Check_SN:uint;			//確認登入確認封包
		public  var Lobby_Heart_SN		:uint;
		
		public constructor() {
		}
		
		public static function instance():ClientPacketSN {
			if ( _packetSNInstance == null ) {
				_packetSNInstance = new ClientPacketSN(new PKT());
			}
			return _packetSNInstance;
		}
		
	}
}
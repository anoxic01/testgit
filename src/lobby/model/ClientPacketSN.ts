module lobby.model {
	export class ClientPacketSN {
		private static _packetSNInstance:ClientPacketSN;
		public  Login_Lobby_Check_SN:number = 0;		//大廳登入確認封包
		public  Login_Game_Check_SN:number;			//確認登入確認封包
		public  Lobby_Heart_SN		:number;
		
		public constructor(pkt:PKT) {
		}
		
		public static instance():ClientPacketSN {
			if ( this._packetSNInstance == null ) {
				this._packetSNInstance = new ClientPacketSN(new PKT());
			}
			return this._packetSNInstance;
		}
		
	}
}
class PKT {
	public PKT():void 
	{
		
	}
}
module packet.lobby {
	export class C_Lobby_Login_OK_Pkt  extends Packet{
		public AuthToken			:	string						//(1) 玩家請填PlayerID (2) 槍手請填配對碼
		public Identity				:	number;						//身份 - 0: 玩家, 1: 槍手(電投手),	2: 試玩帳號,	3: 機器人
		
		public constructor() {
			super();
		}
	}
}
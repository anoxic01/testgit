module packet.pack_game {
	export class C_Game_Login_OK_Pkt extends Packet{
		public AuthToken			:	String						//認證碼 - 由Web端取得
		public Identity				:	number;						//身份 - 0: 玩家, 1: 槍手
		
		public constructor() {
			super();
		}
	}
}
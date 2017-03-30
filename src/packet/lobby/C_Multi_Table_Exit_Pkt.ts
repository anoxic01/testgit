module packet.lobby {
	export class C_Multi_Table_Exit_Pkt  extends Packet{
		public PlayerID	:	number;
		public Identity	:	number;		// 身份 - 0: 玩家, 1: 槍手
		public Reason 	:	number;		// 登出原因
		
		public constructor() {
			PlayerID = Player.getInstance().iPlayerID;
			Identity = Player.getInstance().iIdentity;
			Reason = 1;
		}
	}
}
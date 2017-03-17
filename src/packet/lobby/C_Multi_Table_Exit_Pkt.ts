module packet.lobby {
	export class C_Multi_Table_Exit_Pkt  extends Packet{
		public var PlayerID	:	int;
		public var Identity	:	int;		// 身份 - 0: 玩家, 1: 槍手
		public var Reason 	:	int;		// 登出原因
		
		public constructor() {
			PlayerID = Player.getInstance().iPlayerID;
			Identity = Player.getInstance().iIdentity;
			Reason = 1;
		}
	}
}
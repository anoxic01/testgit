module packet.pack_lobby {
	export class C_Multi_Table_Exit_Pkt  extends Packet{
		public PlayerID	:	number;
		public Identity	:	number;		// 身份 - 0: 玩家, 1: 槍手
		public Reason 	:	number;		// 登出原因
		
		public constructor() {
			super();
			this.PlayerID = lobby.model.Player.getInstance().iPlayerID;
			this.Identity = lobby.model.Player.getInstance().iIdentity;
			this.Reason = 1;
		}
	}
}
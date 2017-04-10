module packet.pack_lobby {
	export class C_Multi_Table_Subscription_Pkt  extends Packet{
		public PlayerID					:	number;
		public TableSubscriptionList	:	any[];
		
		public constructor() {
			super();
			this.PlayerID = lobby.model.Player.getInstance().iPlayerID;
			this.TableSubscriptionList = [];
		}
	}
}
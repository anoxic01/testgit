module packet.lobby {
	export class C_Multi_Table_Subscription_Pkt  extends Packet{
		public PlayerID					:	number;
		public TableSubscriptionList	:	any[];
		
		public constructor() {
			PlayerID = Player.getInstance().iPlayerID;
			TableSubscriptionList = [];
		}
	}
}
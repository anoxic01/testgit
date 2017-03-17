module packet.lobby {
	export class C_Multi_Table_Subscription_Pkt  extends Packet{
		public var PlayerID					:	int;
		public var TableSubscriptionList	:	Array;
		
		public constructor() {
			PlayerID = Player.getInstance().iPlayerID;
			TableSubscriptionList = [];
		}
	}
}
module packet.pack_lobby {
	export class C_Multi_Table_Unsubscribe_Pkt  extends Packet{
		public PlayerID					:	number;
		public TableSubscriptionList	:	any[];
		
		public constructor() {
			super();
			this.PlayerID = Player.getInstance().iPlayerID;
			this.TableSubscriptionList = [];
		}
	}
}
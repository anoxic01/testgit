module packet.pack_lobby {
	export class C_Lobby_Heart_Pkt  extends Packet{
		public PlayerID:number;
		public Identity:number;
		public constructor() {
			super();
		}
	}
}
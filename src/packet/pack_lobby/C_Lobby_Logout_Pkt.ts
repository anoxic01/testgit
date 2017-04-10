module packet.pack_lobby {
	export class C_Lobby_Logout_Pkt  extends Packet{
		public Type			:	number;
		public LogoutInfo	;
		
		public constructor() {
			super();
		}
	}
}
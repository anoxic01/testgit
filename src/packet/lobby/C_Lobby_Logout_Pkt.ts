module packet.lobby {
	export class C_Lobby_Logout_Pkt  extends Packet{
		public var Type			:	int;
		public var LogoutInfo	:	LogoutStruct;
		
		public constructor() {
		}
	}
}
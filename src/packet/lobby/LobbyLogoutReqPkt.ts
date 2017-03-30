module packet.lobby {
	export class LobbyLogoutReqPkt  extends Packet{
		public LogoutInfo:LogoutStruct;
		public constructor() {
		}
	}
}
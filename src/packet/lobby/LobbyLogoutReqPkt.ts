module packet.lobby {
	export class LobbyLogoutReqPkt  extends Packet{
		public var LogoutInfo:LogoutStruct;
		public constructor() {
		}
	}
}
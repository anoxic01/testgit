module packet.pack_lobby {
	export class LobbyLogoutReqPkt  extends Packet{
		public LogoutInfo;
		public constructor() {
			super();
		}
	}
}
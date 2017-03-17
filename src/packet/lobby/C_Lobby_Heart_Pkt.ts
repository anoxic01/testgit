module packet.lobby {
	export class C_Lobby_Heart_Pkt  extends Packet{
		public var PlayerID:int;
		public var Identity:int;
		public constructor() {
		}
	}
}
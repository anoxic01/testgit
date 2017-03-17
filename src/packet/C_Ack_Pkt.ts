module packet {
	export class C_Ack_Pkt extends Packet{
		public var Type	:	int;
		public var SN	:	uint;
		
		public constructor() {
			Type = PacketDefine.ACK;
		}
	}
}
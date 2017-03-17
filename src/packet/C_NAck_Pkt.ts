module packet {
	export class C_NAck_Pkt extends Packet{
		public var Type	:	int;
		public var SN	:	uint;
		
		public constructor() {
			Type = PacketDefine.N_ACK;
		}
	}
}
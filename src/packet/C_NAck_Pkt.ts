module packet {
	export class C_NAck_Pkt {
		public var Type	:	int;
		public var SN	:	uint;
		
		public constructor() {
			Type = PacketDefine.N_ACK;
		}
	}
}
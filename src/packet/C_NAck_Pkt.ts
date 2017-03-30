module packet {
	export class C_NAck_Pkt extends Packet{
		public Type	:	number;
		public SN	:	number;
		
		public constructor() {
			Type = PacketDefine.N_ACK;
		}
	}
}
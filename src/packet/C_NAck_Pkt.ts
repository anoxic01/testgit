module packet {
	export class C_NAck_Pkt extends Packet{
		public Type	:	number;
		public SN	:	number;
		
		public constructor() {
			super();
			this.Type = define.PacketDefine.N_ACK;
		}
	}
}
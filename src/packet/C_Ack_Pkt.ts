module packet {
	export class C_Ack_Pkt extends Packet{
		public Type	:	number;
		public SN	:	number;
		
		public constructor() {
			super();
			this.Type = define.PacketDefine.ACK;
		}
	}
}
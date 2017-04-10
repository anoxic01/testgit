module packet.pack_lobby {
	export class C_CustomChip_Pkt  extends Packet{
		public Type					:	number;
		public PlayerCustChipsInfo	;			//自订讯息
		
		public constructor() {
			super();
			this.Type = define.PacketDefine.C_SET_CHIP;
			this.PlayerCustChipsInfo = new lobby.model.struct.PlayerCustChipsInfoStruct();
			
		}
	}
}
module packet.lobby {
	export class C_CustomChip_Pkt  extends Packet{
		public var Type					:	int;
		public var PlayerCustChipsInfo	:	PlayerCustChipsInfoStruct;			//自订讯息
		
		public constructor() {
			Type = PacketDefine.C_SET_CHIP;
			PlayerCustChipsInfo = new PlayerCustChipsInfoStruct();
			
		}
	}
}
module packet.lobby {
	export class C_Lobby_Theme_Subscribe_Pkt  extends Packet{
		public var Type					:	int;			//封包命令
		public var SubscribleThemeID	:	int;			//訂閱廳館 ID
		public var UnsubscribleThemeID	:	int;			//取消訂閱廳館 ID
		
		public constructor() {
			Type = PacketDefine.C_Lobby_Theme_Subscribe;
			
		}
	}
}
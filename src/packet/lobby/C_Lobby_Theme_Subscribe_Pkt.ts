module packet.lobby {
	export class C_Lobby_Theme_Subscribe_Pkt  extends Packet{
		public Type					:	number;			//封包命令
		public SubscribleThemeID	:	number;			//訂閱廳館 ID
		public UnsubscribleThemeID	:	number;			//取消訂閱廳館 ID
		
		public constructor() {
			Type = PacketDefine.C_Lobby_Theme_Subscribe;
			
		}
	}
}
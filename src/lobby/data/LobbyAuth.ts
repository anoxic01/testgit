module lobby.data {
	export class LobbyAuth {

		public AuthToken	:	string	=	"";			//認證碼 - 由Web端取得
		public Identity		:	number	=	0;			//身份 - 0: 玩家, 1: 槍手, 2-试玩
		public Lang			:	number	=	0;			//語系 0: CN, 1: TW, 2: EN
		public Platform		:	number	=	0;			//遊戲平台 - 0: Web, 1: Mobile
		public LoginMode	:	number	=	0;			//登陆模式  0:網投 1:電投
		public ServerIP		:	string 	= 	"";			//连接地址
		public ServerPort	:	number	=	0; 			//连接端口
		
		public init			:	boolean = false;

		public constructor() {
			this.init = true;
		}
	}
}
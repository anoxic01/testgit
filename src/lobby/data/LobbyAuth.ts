module lobby.data {
	export class LobbyAuth {

		public sAuthToken	:	String	=	"";			//認證碼 - 由Web端取得
		public iIdentity	:	number	=	0;			//身份 - 0: 玩家, 1: 槍手, 2-试玩
		public iLang		:	number	=	0;			//語系 0: CN, 1: TW, 2: EN
		public iPlatform	:	number	=	0;			//遊戲平台 - 0: Web, 1: Mobile
		public iLoginMode	:	number	=	0;			//登陆模式  0:網投 1:電投
		public sServerIP	:	String 	= 	"";			//连接地址
		public iServerPort	:	number	=	0; 			//连接端口
		
		public init			:	Boolean = false;

		public constructor() {
			this.init = true;
		}
	}
}
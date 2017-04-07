module lobby.model {
	export class LobbyAuth {

		public AuthToken	:	string	=	"";			//認證碼 - 由Web端取得
		public Identity		:	number	=	0;			//身份 - 0: 玩家, 1: 槍手, 2-试玩
		public Lang			:	number	=	0;			//語系 0: CN, 1: TW, 2: EN
		public Platform		:	number	=	0;			//遊戲平台 - 0: Web, 1: Mobile
		public LoginMode	:	number	=	0;			//登陆模式  0:網投 1:電投
		public ServerIP		:	string 	= 	"";			//连接地址
		public ServerPort	:	number	=	0; 			//连接端口
		
		public init			:	 boolean = false;

		public constructor() {
			// var _parameters = manager.UrlManager.getInstance().root.loaderInfo.parameters;
			var _sVersion : String;
			var obj; 
			
			var sData:string;
			
			// _sVersion = _parameters.Data;
			// if(_sVersion){
			// 	obj = JSON.parse(_sVersion);
			// }else{
			// 	obj = config.TemConfig.getInstance().Data;
			// }
			// this.AuthToken = obj.AuthToken;
			// this.Identity = obj.Identity;
			// this.Lang = obj.Lang;
			// this.LoginMode = obj.loginMode;
			// sData = obj.LobbyServerUrl;

			obj = config.TemConfig.getInstance().Data;
			this.AuthToken = config.TemConfig.getInstance().AuthToken; //poiny008
			this.Identity = config.TemConfig.getInstance().Data.Identity;//o.Identity;
			this.Lang = config.TemConfig.getInstance().Data.Lang;//o.Lang;
			this.LoginMode = config.TemConfig.getInstance().LoginMode;
				
			if ( sData == null ) {
				sData = config.TemConfig.getInstance().ServerIp;
			}
			
			var sAr:any[] = sData.split(":");
			
			console.log("m_sAuthToken::" + this.AuthToken );
			console.log("sData::" + sData );
			
			this.ServerIP = sAr[0];
			this.ServerPort = sAr[1];
			
			this.init = true;
		}
	}
}
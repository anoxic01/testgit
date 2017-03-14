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
			var _parameters : Object = UrlManager.getInstance().root.loaderInfo.parameters;
			var _sVersion : String;
			var obj : Object; 
			
			var sData:String;
			if(ExternalInterface.available){
				_sVersion = _parameters.Data;
				if(_sVersion){
					obj = JSON.parse(_sVersion);
				}else{
					obj = TemConfig.getInstance().Data;
				}
			
				this.m_sAuthToken = obj.AuthToken;
				this.Identity = obj.Identity;
				this.m_iLang = obj.Lang;
				this.m_iLoginMode = obj.loginMode;
				
				sData = obj.LobbyServerUrl;
			}else{
				obj = TemConfig.getInstance().Data;
				AuthToken = TemConfig.getInstance().AuthToken; //poiny008
				this.Identity = TemConfig.getInstance().Data.Identity;//o.Identity;
				this.m_iLang = TemConfig.getInstance().Data.Lang;//o.Lang;
				this.m_iLoginMode = TemConfig.getInstance().LoginMode;
			}
			
			if ( sData == null ) {
				sData = TemConfig.getInstance().ServerIp;
			}
			
			var sAr:Array = sData.split(":");
			
			trace("m_sAuthToken::" + m_sAuthToken );
			trace("sData::" + sData );
			
			m_sServerIP = sAr[0];
			m_iServerPort = sAr[1];
			
			this.init = true;
		}
	}
}
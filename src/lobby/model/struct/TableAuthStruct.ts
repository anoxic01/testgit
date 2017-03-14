module lobby.model.struct {
	export class TableAuthStruct {
		private var gameID				:	int;						//遊戲ID
        private var tableID				:	int;						//桌號
        private var authToken			:	String						//認證碼 - 由Web端取得
        private var identity			:	int;						//身份 - 0: 玩家, 1: 槍手
        private var lang 				:	int;						//語系 0: CN, 1: TW, 2: EN
        private var platform 			:	int;						//遊戲平台 - 0: Web, 1: Mobile
        private var lobbyServer			:	String						//Lobby Server
        private var joinTbType			:	int;						//进桌模式
        private var betLimitID			:	int;						//限紅模式
        private var joinTbPwd			:	String;						//進桌密碼
        private var charterSettingInfo	:	CharterSettingStruct;		//包桌設定
		
        public var ProtocolVer			:	int;						//通訊版號
		
		
		public constructor() {
			charterSettingInfo = new CharterSettingStruct();
		}
		
		public function get CharterSettingInfo():CharterSettingStruct 
		{
			return charterSettingInfo;
		}
		
		public function set CharterSettingInfo(value:CharterSettingStruct):void 
		{
			charterSettingInfo = value;
		}
		
		public function get JoinTbPwd():String 
		{
			return joinTbPwd;
		}
		
		public function set JoinTbPwd(value:String):void 
		{
			joinTbPwd = value;
		}
		
		public function get BetLimitID():int 
		{
			return betLimitID;
		}
		
		public function set BetLimitID(value:int):void 
		{
			betLimitID = value;
		}
		
		public function get JoinTbType():int 
		{
			return joinTbType;
		}
		
		public function set JoinTbType(value:int):void 
		{
			joinTbType = value;
		}
		
		public function get LobbyServer():String 
		{
			return lobbyServer;
		}
		
		public function set LobbyServer(value:String):void 
		{
			lobbyServer = value;
		}
		
		public function get Platform():int 
		{
			return platform;
		}
		
		public function set Platform(value:int):void 
		{
			platform = value;
		}
		
		public function get Lang():int 
		{
			return lang;
		}
		
		public function set Lang(value:int):void 
		{
			lang = value;
		}
		
		public function get Identity():int 
		{
			return identity;
		}
		
		public function set Identity(value:int):void 
		{
			identity = value;
		}
		
		public function get AuthToken():String 
		{
			return authToken;
		}
		
		public function set AuthToken(value:String):void 
		{
			authToken = value;
		}
		
		public function get TableID():int 
		{
			return tableID;
		}
		
		public function set TableID(value:int):void 
		{
			tableID = value;
		}
		
		public function get GameID():int 
		{
			return gameID;
		}
		
		public function set GameID(value:int):void 
		{
			gameID = value;
		}
		
	}
}
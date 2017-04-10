module lobby.model.struct {
	export class TableAuthStruct {
		private gameID				:	number;						//遊戲ID
        private tableID				:	number;						//桌號
        private authToken			:	string						//認證碼 - 由Web端取得
        private identity			:	number;						//身份 - 0: 玩家, 1: 槍手
        private lang 				:	number;						//語系 0: CN, 1: TW, 2: EN
        private platform 			:	number;						//遊戲平台 - 0: Web, 1: Mobile
        private lobbyServer			:	string						//Lobby Server
        private joinTbType			:	number;						//进桌模式
        private betLimitID			:	number;						//限紅模式
        private joinTbPwd			:	string;						//進桌密碼
        private charterSettingInfo	:	CharterSettingStruct;		//包桌設定
		
        public ProtocolVer			:	number;						//通訊版號
		
		
		public constructor() {
			this.charterSettingInfo = new CharterSettingStruct();
		}
		
		get CharterSettingInfo():CharterSettingStruct 
		{
			return this.charterSettingInfo;
		}
		
		set  CharterSettingInfo(value:CharterSettingStruct) 
		{
			this.charterSettingInfo = value;
		}
		
		get JoinTbPwd():string 
		{
			return this.joinTbPwd;
		}
		
		set  JoinTbPwd(value:string) 
		{
			this.joinTbPwd = value;
		}
		
		get BetLimitID():number
		{
			return this.betLimitID;
		}
		
		set  BetLimitID(value:number) 
		{
			this.betLimitID = value;
		}
		
		get JoinTbType():number
		{
			return this.joinTbType;
		}
		
		set  JoinTbType(value:number) 
		{
			this.joinTbType = value;
		}
		
		get LobbyServer():string 
		{
			return this.lobbyServer;
		}
		
		set  LobbyServer(value:string) 
		{
			this.lobbyServer = value;
		}
		
		get Platform():number
		{
			return this.platform;
		}
		
		set  Platform(value:number) 
		{
			this.platform = value;
		}
		
		get Lang():number
		{
			return this.lang;
		}
		
		set  Lang(value:number) 
		{
			this.lang = value;
		}
		
		get Identity():number
		{
			return this.identity;
		}
		
		set  Identity(value:number) 
		{
			this.identity = value;
		}
		
		get AuthToken():string 
		{
			return this.authToken;
		}
		
		set  AuthToken(value:string) 
		{
			this.authToken = value;
		}
		
		get TableID():number
		{
			return this.tableID;
		}
		
		set  TableID(value:number) 
		{
			this.tableID = value;
		}
		
		get GameID():number
		{
			return this.gameID;
		}
		
		set  GameID(value:number) 
		{
			this.gameID = value;
		}
		
	}
}
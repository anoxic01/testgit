module lobby.model {
	export class Player {

		public AccountType			:	string;					//账户类型
		
		public iAgentID				:	number;					//代理序号
		
		public sAgentKey_Lobby		:	string;					//代理密钥(暂未使用)
		public sPrivateKey_Lobby	:	string;					//私人密钥
		public sBroadcastKey_Lobby	:	string;					//公开密钥
		
		public sAgentKey_Game		:	string;					//代理密钥(暂未使用)
		public sPrivateKey_Game		:	string;					//私人密钥
		public sBroadcastKey_Game	:	string;					//公开密钥
		
		public balance				:	struct.BalanceStruct;			//玩家余额
		public gameSetting			:	struct.GameSettingStruct;		//游戏设置
		
		public iPlayerID			:	number;					//玩家序号
		public iIdentity			:	number;					//玩家身份	- 0: 玩家, 1: 槍手
		public bIsFirstTb			:	boolean;				//
		public bIsLogin 			:	boolean;				//登陆状态
		public bIsTableOwner		:	boolean;				//桌主标志
		
		public sNickName			:	string;					//玩家昵称
		public sHiddenNickName		:	string;					//隐藏昵称
		
		public iPairTableID			:	number;					//桌子序号
		private m_iSeatNo			:	number;					//座位序号
		
		public sLobbyServer			:	string;					//大厅地址
		public sLoginTime			:	string;					//登陆时间
		
		public iPPSN 				:	number;					//瞇牌位置
		public iBPSN 				:	number;					//瞇牌位置
		
		private sDeputyAuthToken 	:	string;					//抢手配对码
		
		//******************************************************************************************************
		public iFaceID				:	number;					//头像序号
		public uCurrency			:	number	=	1;			//货币类型
		public nBet					:	Number	=	0;			//有效下注
		public uLevel				:	number;					//用户等级
		public numberegral			:	number;					//在线积分
		public uOnline				:	number;					//在线时间
		
		private m_Country			:	string	=	"";			//国籍
		
		private m_nCoin				:	Number;					//当前货币
		
		private m_vecReceiver		:	iface.IPlayerReceiver[];	//偵聽玩家資料更新
		
		get Country():string
		{
			return this.m_Country;
		}

		set  Country(value:string)
		{
			this.m_Country = value;
			
		}

		get nCoin():number
		{
//			switch(AccountType){
//				case Define.CASH:
//					m_nCoin = balance.GCoin;
//					break;
//				case Define.CREDIT:
//					m_nCoin = balance.TotalCredit;
//					break;
//			}
//			return m_nCoin;
			return this.balance.GCoin;
		}
		

		get iSeatNo():number
		{
			return this.m_iSeatNo;
		}

		set  iSeatNo(value:number)
		{
				this.m_iSeatNo = value;
			
		}

		set  PlayerInfo( oPlayerInfo ){
			this.AccountType		=	oPlayerInfo.AccountType;
			this.iAgentID			=	oPlayerInfo.AgentID;
			this.sAgentKey_Lobby		=	oPlayerInfo.AgentKey;
			this.sPrivateKey_Lobby	=	oPlayerInfo.PrivateKey;
			this.sBroadcastKey_Lobby	=	oPlayerInfo.BroadcastKey;
			this.balance				=	new struct.BalanceStruct( oPlayerInfo.Balance );
			this.gameSetting			=	new struct.GameSettingStruct( oPlayerInfo.GameSetting );
			this.iPlayerID			=	oPlayerInfo.PlayerID;
			this.iIdentity			=	oPlayerInfo.Identity;
			this.bIsFirstTb			=	oPlayerInfo.IsFirstTb;
			this.bIsLogin			=	oPlayerInfo.IsLogin;
//			bIsTableOwner		=	oPlayerInfo.IsTableOwner;
			this.sNickName			=	oPlayerInfo.NickName;
			this.sHiddenNickName		=	oPlayerInfo.HiddenNickName;
			this.iPairTableID		=	oPlayerInfo.PairTableID;
			this.iSeatNo				=	oPlayerInfo.SeatNo;
			this.sLobbyServer		=	oPlayerInfo.LobbyServer;
			this.sLoginTime			=	oPlayerInfo.LoginTime;
			this.iPPSN				=	oPlayerInfo.PPSN;
			this.iBPSN				=	oPlayerInfo.BPSN;
			this.DeputyAuthToken		=	oPlayerInfo.DeputyAuthToken;
			
			/*if( sNickName.length >= 10 ){
				sNickName = sNickName.substr( 0 , 3 ) + "..."+ sNickName.substr( sNickName.length-3 , sNickName.length );
			}*/
			
		}
		set  gameData( oPlayerInfo ){
			this.sAgentKey_Game		=	oPlayerInfo.AgentKey;
			this.sPrivateKey_Game	=	oPlayerInfo.PrivateKey;
			this.sBroadcastKey_Game	=	oPlayerInfo.BroadcastKey;
			this.bIsFirstTb			=	oPlayerInfo.IsFirstTb;
			this.bIsLogin			=	oPlayerInfo.IsLogin;
//			bIsTableOwner		=	oPlayerInfo.IsTableOwner;
			this.iSeatNo				=	oPlayerInfo.SeatNo;
			this.iPPSN				=	oPlayerInfo.PPSN;
			this.iBPSN				=	oPlayerInfo.BPSN;
		}
		
		/**
		 * 更新 額度
		 * @param	o
		 */
		public updateBalance( oData ):void {
			if ( oData == null ) {
				return; 
			}
			
			this.balance.AvailableCredit	=	oData.AvailableCredit;
			this.balance.BCoin			=	oData.BCoin;
			this.balance.GCoin			=	oData.GCoin;
			this.balance.RemainingCredit	=	oData.RemainingCredit;
			this.balance.TotalCredit		=	oData.TotalCredit;
			
			
			
			manager.LobbyManager.getInstance().lobbyView.information.updateBalance();
			if(manager.LobbyManager.getInstance().personalinformation){
				manager.LobbyManager.getInstance().personalinformation.refresh();
			}
			
			if(manager.LobbyManager.getInstance().chipPanelLobby){
				if(manager.LobbyManager.getInstance().chipPanelLobby.currentChipItem.uValue > this.balance.GCoin){
					manager.LobbyManager.getInstance().chipPanelLobby.showHint();
				}else{
					manager.LobbyManager.getInstance().chipPanelLobby.hideHint();
				}
			}
			
			if(manager.LobbyManager.getInstance().chipPanelGame_1){
				if(manager.LobbyManager.getInstance().chipPanelGame_1.currentChipItem.uValue > this.balance.GCoin){
					manager.LobbyManager.getInstance().chipPanelGame_1.showHint();
				}else{
					manager.LobbyManager.getInstance().chipPanelGame_1.hideHint();
				}
			}
			
			if(manager.LobbyManager.getInstance().chipPanelGame_2){
				if(manager.LobbyManager.getInstance().chipPanelGame_2.currentChipItem.uValue > this.balance.GCoin){
					manager.LobbyManager.getInstance().chipPanelGame_2.showHint();
				}else{
					manager.LobbyManager.getInstance().chipPanelGame_2.hideHint();
				}
			}
			
		}
		/**
		 * 更新遊戲設定
		 * @param	o
		 */
		public updateGameSetting( oData ):void {
			if ( oData == null ) {
				return; 
			}
			
			this.gameSetting.BetLimitId = oData.BetLimitId;
			this.gameSetting.CustChips = oData.CustChips;
			this.gameSetting.UpperBetLimitId = oData.UpperBetLimitId;
		}
		
		set  DeputyAuthToken( _sValue:string ) {
			this.sDeputyAuthToken = _sValue;
			var _iLen:number= this.m_vecReceiver.length;
			for( var i:number= 0; i < _iLen; i++ ){
				this.m_vecReceiver[i].update(this.sDeputyAuthToken);
			}
		}
		
		get DeputyAuthToken( ):string {
			return this.sDeputyAuthToken;
		}
		
		public addListener(_vecReceiver:iface.IPlayerReceiver):void {
			if( this.m_vecReceiver.indexOf(_vecReceiver) == -1){
				this.m_vecReceiver.push(_vecReceiver);
			}
		}
		
		public removeListener( _vecReceiver:iface.IPlayerReceiver):void {
			var _idx:number=  this.m_vecReceiver.indexOf(_vecReceiver);
			if(_idx != -1){
				this.m_vecReceiver.splice(_idx,1);
			}
		}
		
		public removeAllListenr( ):void {
			this.m_vecReceiver = null;
			this.m_vecReceiver = new Array<iface.IPlayerReceiver>();
		}		
		
		private static m_instance	:	Player;
		
		public static getInstance():Player{
			
			if(this.m_instance == null){
				
				this.m_instance = new Player();
				
			}
			return this.m_instance;
		}
		
		public constructor() {
			if( this.m_vecReceiver==null ){
				this.m_vecReceiver = new Array<iface.IPlayerReceiver>();
			}
			
		}
	}
}
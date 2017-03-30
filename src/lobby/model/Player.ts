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
		
		public balance				:	BalanceStruct;			//玩家余额
		public gameSetting			:	GameSettingStruct;		//游戏设置
		
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
		
		private m_vecReceiver		:	<IPlayerReceiver>;	//偵聽玩家資料更新
		
		get Country():String
		{
			return m_Country;
		}

		set  Country(value:String)
		{
			m_Country = value;
			
		}

		get nCoin():Number
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
			return balance.GCoin;
		}
		

		get iSeatNo():number
		{
			return m_iSeatNo;
		}

		set  iSeatNo(value:number)
		{
				m_iSeatNo = value;
			
		}

		set  PlayerInfo( oPlayerInfo:Object ){
			AccountType		=	oPlayerInfo.AccountType;
			iAgentID			=	oPlayerInfo.AgentID;
			sAgentKey_Lobby		=	oPlayerInfo.AgentKey;
			sPrivateKey_Lobby	=	oPlayerInfo.PrivateKey;
			sBroadcastKey_Lobby	=	oPlayerInfo.BroadcastKey;
			balance				=	new BalanceStruct( oPlayerInfo.Balance );
			gameSetting			=	new GameSettingStruct( oPlayerInfo.GameSetting );
			iPlayerID			=	oPlayerInfo.PlayerID;
			iIdentity			=	oPlayerInfo.Identity;
			bIsFirstTb			=	oPlayerInfo.IsFirstTb;
			bIsLogin			=	oPlayerInfo.IsLogin;
//			bIsTableOwner		=	oPlayerInfo.IsTableOwner;
			sNickName			=	oPlayerInfo.NickName;
			sHiddenNickName		=	oPlayerInfo.HiddenNickName;
			iPairTableID		=	oPlayerInfo.PairTableID;
			iSeatNo				=	oPlayerInfo.SeatNo;
			sLobbyServer		=	oPlayerInfo.LobbyServer;
			sLoginTime			=	oPlayerInfo.LoginTime;
			iPPSN				=	oPlayerInfo.PPSN;
			iBPSN				=	oPlayerInfo.BPSN;
			DeputyAuthToken		=	oPlayerInfo.DeputyAuthToken;
			
			/*if( sNickName.length >= 10 ){
				sNickName = sNickName.substr( 0 , 3 ) + "..."+ sNickName.substr( sNickName.length-3 , sNickName.length );
			}*/
			
		}
		set  gameData( oPlayerInfo:Object ){
			sAgentKey_Game		=	oPlayerInfo.AgentKey;
			sPrivateKey_Game	=	oPlayerInfo.PrivateKey;
			sBroadcastKey_Game	=	oPlayerInfo.BroadcastKey;
			bIsFirstTb			=	oPlayerInfo.IsFirstTb;
			bIsLogin			=	oPlayerInfo.IsLogin;
//			bIsTableOwner		=	oPlayerInfo.IsTableOwner;
			iSeatNo				=	oPlayerInfo.SeatNo;
			iPPSN				=	oPlayerInfo.PPSN;
			iBPSN				=	oPlayerInfo.BPSN;
		}
		
		/**
		 * 更新 額度
		 * @param	o
		 */
		public updateBalance( oData:Object ):void {
			if ( oData == null ) {
				return; 
			}
			
			balance.AvailableCredit	=	oData.AvailableCredit;
			balance.BCoin			=	oData.BCoin;
			balance.GCoin			=	oData.GCoin;
			balance.RemainingCredit	=	oData.RemainingCredit;
			balance.TotalCredit		=	oData.TotalCredit;
			
			
			
			LobbyManager.getInstance().lobbyView.information.updateBalance();
			if(LobbyManager.getInstance().personalinformation){
				LobbyManager.getInstance().personalinformation.refresh();
			}
			
			if(LobbyManager.getInstance().chipPanelLobby){
				if(LobbyManager.getInstance().chipPanelLobby.currentChipItem.uValue > balance.GCoin){
					LobbyManager.getInstance().chipPanelLobby.showHint();
				}else{
					LobbyManager.getInstance().chipPanelLobby.hideHint();
				}
			}
			
			if(LobbyManager.getInstance().chipPanelGame_1){
				if(LobbyManager.getInstance().chipPanelGame_1.currentChipItem.uValue > balance.GCoin){
					LobbyManager.getInstance().chipPanelGame_1.showHint();
				}else{
					LobbyManager.getInstance().chipPanelGame_1.hideHint();
				}
			}
			
			if(LobbyManager.getInstance().chipPanelGame_2){
				if(LobbyManager.getInstance().chipPanelGame_2.currentChipItem.uValue > balance.GCoin){
					LobbyManager.getInstance().chipPanelGame_2.showHint();
				}else{
					LobbyManager.getInstance().chipPanelGame_2.hideHint();
				}
			}
			
		}
		/**
		 * 更新遊戲設定
		 * @param	o
		 */
		public updateGameSetting( oData:Object ):void {
			if ( oData == null ) {
				return; 
			}
			
			gameSetting.BetLimitId = oData.BetLimitId;
			gameSetting.CustChips = oData.CustChips;
			gameSetting.UpperBetLimitId = oData.UpperBetLimitId;
		}
		
		set  DeputyAuthToken( _sValue:String ) {
			sDeputyAuthToken = _sValue;
			var _iLen:number= m_vecReceiver.length;
			for( var i:number= 0; i < _iLen; i++ ){
				m_vecReceiver[i].update(sDeputyAuthToken);
			}
		}
		
		get DeputyAuthToken( ):String {
			return sDeputyAuthToken;
		}
		
		public addListener(_vecReceiver:IPlayerReceiver):void {
			if( m_vecReceiver.indexOf(_vecReceiver) == -1){
				m_vecReceiver.push(_vecReceiver);
			}
		}
		
		public removeListener( _vecReceiver:IPlayerReceiver):void {
			var _idx:number=  m_vecReceiver.indexOf(_vecReceiver);
			if(_idx != -1){
				m_vecReceiver.splice(_idx,1);
			}
		}
		
		public removeAllListenr( ):void {
			m_vecReceiver = null;
			m_vecReceiver = new <IPlayerReceiver>();
		}		
		
		private static m_instance	:	Player;
		
		public static getInstance():Player{
			
			if(m_instance == null){
				
				m_instance = new Player(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor(single:Singleton) {
			
			if(single==null){
				console.log("models.Player初始化异常...");
			}
			if( m_vecReceiver==null ){
				m_vecReceiver = new <IPlayerReceiver>();
			}
			
		}
	}
}
class Singleton{}
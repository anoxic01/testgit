module lobby.model {
	export class Player {

		public var AccountType			:	String;					//账户类型
		
		public var iAgentID				:	int;					//代理序号
		
		public var sAgentKey_Lobby		:	String;					//代理密钥(暂未使用)
		public var sPrivateKey_Lobby	:	String;					//私人密钥
		public var sBroadcastKey_Lobby	:	String;					//公开密钥
		
		public var sAgentKey_Game		:	String;					//代理密钥(暂未使用)
		public var sPrivateKey_Game		:	String;					//私人密钥
		public var sBroadcastKey_Game	:	String;					//公开密钥
		
		public var balance				:	BalanceStruct;			//玩家余额
		public var gameSetting			:	GameSettingStruct;		//游戏设置
		
		public var iPlayerID			:	int;					//玩家序号
		public var iIdentity			:	int;					//玩家身份	- 0: 玩家, 1: 槍手
		public var bIsFirstTb			:	Boolean;				//
		public var bIsLogin 			:	Boolean;				//登陆状态
		public var bIsTableOwner		:	Boolean;				//桌主标志
		
		public var sNickName			:	String;					//玩家昵称
		public var sHiddenNickName		:	String;					//隐藏昵称
		
		public var iPairTableID			:	int;					//桌子序号
		private var m_iSeatNo			:	int;					//座位序号
		
		public var sLobbyServer			:	String;					//大厅地址
		public var sLoginTime			:	String;					//登陆时间
		
		public var iPPSN 				:	int;					//瞇牌位置
		public var iBPSN 				:	int;					//瞇牌位置
		
		private var sDeputyAuthToken 	:	String;					//抢手配对码
		
		//******************************************************************************************************
		public var iFaceID				:	int;					//头像序号
		public var uCurrency			:	uint	=	1;			//货币类型
		public var nBet					:	Number	=	0;			//有效下注
		public var uLevel				:	uint;					//用户等级
		public var uIntegral			:	uint;					//在线积分
		public var uOnline				:	uint;					//在线时间
		
		private var m_Country			:	String	=	"";			//国籍
		
		private var m_nCoin				:	Number;					//当前货币
		
		private var m_vecReceiver		:	Vector.<IPlayerReceiver>;	//偵聽玩家資料更新
		
		public function get Country():String
		{
			return m_Country;
		}

		public function set Country(value:String):void
		{
			m_Country = value;
			
		}

		public function get nCoin():Number
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
		

		public function get iSeatNo():int
		{
			return m_iSeatNo;
		}

		public function set iSeatNo(value:int):void
		{
				m_iSeatNo = value;
			
		}

		public function set PlayerInfo( oPlayerInfo:Object ):void{
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
		public function set gameData( oPlayerInfo:Object ):void{
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
		public function updateBalance( oData:Object ):void {
			if ( oData == null ) {
				return; 
			}
			
			balance.AvailableCredit	=	oData.AvailableCredit;
			balance.BCoin			=	oData.BCoin;
			balance.GCoin			=	oData.GCoin;
			balance.RemainingCredit	=	oData.RemainingCredit;
			balance.TotalCredit		=	oData.TotalCredit;
			
			
			
			LobbyManager.getInstance().lobbyView.infomation.updateBalance();
			if(LobbyManager.getInstance().personalInfomation){
				LobbyManager.getInstance().personalInfomation.refresh();
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
		public function updateGameSetting( oData:Object ):void {
			if ( oData == null ) {
				return; 
			}
			
			gameSetting.BetLimitId = oData.BetLimitId;
			gameSetting.CustChips = oData.CustChips;
			gameSetting.UpperBetLimitId = oData.UpperBetLimitId;
		}
		
		public function set DeputyAuthToken( _sValue:String ):void {
			sDeputyAuthToken = _sValue;
			var _iLen:int = m_vecReceiver.length;
			for( var i:int = 0; i < _iLen; i++ ){
				m_vecReceiver[i].update(sDeputyAuthToken);
			}
		}
		
		public function get DeputyAuthToken( ):String {
			return sDeputyAuthToken;
		}
		
		public function addListener(_vecReceiver:IPlayerReceiver):void {
			if( m_vecReceiver.indexOf(_vecReceiver) == -1){
				m_vecReceiver.push(_vecReceiver);
			}
		}
		
		public function removeListener( _vecReceiver:IPlayerReceiver):void {
			var _idx:int =  m_vecReceiver.indexOf(_vecReceiver);
			if(_idx != -1){
				m_vecReceiver.splice(_idx,1);
			}
		}
		
		public function removeAllListenr( ):void {
			m_vecReceiver = null;
			m_vecReceiver = new Vector.<IPlayerReceiver>();
		}		
		
		private static var m_instance	:	Player;
		
		public static function getInstance():Player{
			
			if(m_instance == null){
				
				m_instance = new Player(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor(single:Singleton) {
			
			if(single==null){
				trace("models.Player初始化异常...");
			}
			if( m_vecReceiver==null ){
				m_vecReceiver = new Vector.<IPlayerReceiver>();
			}
			
		}
	}
}
class Singleton{}
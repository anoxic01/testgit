module lobby.model.player {
	export class SimplePlayer {
		
        /// <summary>
        /// 代理ID
        /// </summary>
        public var AgentID:int;


        /// <summary>
        /// 玩家ID
        /// </summary>
        public var PlayerID:int;

        /// <summary>
        /// 帳戶種類
        /// </summary>
        public var AccountType:String;

        /// <summary>
        /// 身份 - 0: 玩家, 1: 槍手
        /// </summary>
        public var Identity:int;

        /// <summary>
        /// 暱稱
        /// </summary>
        public var NickName:String;

        /// <summary>
        /// 暱稱
        /// </summary>
        public var HiddenNickName:String;

        /// <summary>
        /// 配對桌ID
        /// </summary>
        public var PairTableID:int;

        /// <summary>
        /// 座位號碼
        /// </summary>
        public var SeatNo:int;


        /// <summary>
        /// 玩家餘額
        /// </summary>
        public var Balance:BalanceStruct

        /// <summary>
        /// 玩家遊戲設定
        /// </summary>
        public var GameSetting:GameSettingStruct

        /// <summary>
        /// 玩家加/解秘金鑰
        /// </summary>
        public var PrivateKey:String;

        /// <summary>
        /// 廣播金鑰
        /// </summary>
        public var BroadcastKey:String;


        /// <summary>
        /// 代理金鑰
        /// </summary>
        public var AgentKey:String

        /// <summary>
        /// Lobby Server
        /// </summary>
        public var LobbyServer:String;


        /// <summary>
        /// 是否為桌主
        /// </summary>
        public var IsTableOwner :Boolean;

        /// <summary>
        /// 閒家瞇牌權位置
        /// </summary>
        public var PPSN :int;


        /// <summary>
        /// 庄家瞇牌權位置
        /// </summary>
        public var BPSN :int;

        /// <summary>
        /// 玩家是否登入
        /// </summary>

        public var IsLogin :Boolean;
		
		
		public var DeputyAuthToken	:	String;		//老板重新登陆大厅取得配抢手的配对码
		
		public constructor() {
			Balance = new BalanceStruct();
			GameSetting = new GameSettingStruct();
			
		}
		
		/**
		 * 更新 額度
		 * @param	o
		 */
		public function updateBalance( o:Object ):void {
			if ( o == null ) return; 
			
			Balance.AvailableCredit = o.AvailableCredit;
			Balance.BCoin =  o.BCoin
			Balance.GCoin =  o.GCoin
			Balance.RemainingCredit =  o.RemainingCredit
			Balance.TotalCredit =  o.TotalCredit
		}
		/**
		 * 更新遊戲設定
		 * @param	o
		 */
		public function updateGameSetting( o:Object ):void {
			if ( o == null ) return; 
			
			GameSetting.BetLimitId = o.BetLimitId;
			GameSetting.CustChips = o.CustChips;
			GameSetting.UpperBetLimitId = o.UpperBetLimitId;
		}
		
		
	}
}
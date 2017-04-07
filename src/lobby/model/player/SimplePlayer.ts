module lobby.model.player {
	export class SimplePlayer {
		
        /// <summary>
        /// 代理ID
        /// </summary>
        public AgentID:number;


        /// <summary>
        /// 玩家ID
        /// </summary>
        public PlayerID:number;

        /// <summary>
        /// 帳戶種類
        /// </summary>
        public AccountType:string;

        /// <summary>
        /// 身份 - 0: 玩家, 1: 槍手
        /// </summary>
        public Identity:number;

        /// <summary>
        /// 暱稱
        /// </summary>
        public NickName:string;

        /// <summary>
        /// 暱稱
        /// </summary>
        public HiddenNickName:string;

        /// <summary>
        /// 配對桌ID
        /// </summary>
        public PairTableID:number;

        /// <summary>
        /// 座位號碼
        /// </summary>
        public SeatNo:number;


        /// <summary>
        /// 玩家餘額
        /// </summary>
        public Balance:struct.BalanceStruct

        /// <summary>
        /// 玩家遊戲設定
        /// </summary>
        public GameSetting:struct.GameSettingStruct

        /// <summary>
        /// 玩家加/解秘金鑰
        /// </summary>
        public PrivateKey:string;

        /// <summary>
        /// 廣播金鑰
        /// </summary>
        public BroadcastKey:string;


        /// <summary>
        /// 代理金鑰
        /// </summary>
        public AgentKey:string

        /// <summary>
        /// Lobby Server
        /// </summary>
        public LobbyServer:string;


        /// <summary>
        /// 是否為桌主
        /// </summary>
        public IsTableOwner : boolean;

        /// <summary>
        /// 閒家瞇牌權位置
        /// </summary>
        public PPSN :number;


        /// <summary>
        /// 庄家瞇牌權位置
        /// </summary>
        public BPSN :number;

        /// <summary>
        /// 玩家是否登入
        /// </summary>

        public IsLogin : boolean;
		
		
		public DeputyAuthToken	:	String;		//老板重新登陆大厅取得配抢手的配对码
		
		public constructor() {
			this.Balance = new struct.BalanceStruct();
			this.GameSetting = new struct.GameSettingStruct();
			
		}
		
		/**
		 * 更新 額度
		 * @param	o
		 */
		public updateBalance( o ):void {
			if ( o == null ) return; 
			
			this.Balance.AvailableCredit = o.AvailableCredit;
			this.Balance.BCoin =  o.BCoin
			this.Balance.GCoin =  o.GCoin
			this.Balance.RemainingCredit =  o.RemainingCredit
			this.Balance.TotalCredit =  o.TotalCredit
		}
		/**
		 * 更新遊戲設定
		 * @param	o
		 */
		public updateGameSetting( o ):void {
			if ( o == null ) return; 
			
			this.GameSetting.BetLimitId = o.BetLimitId;
			this.GameSetting.CustChips = o.CustChips;
			this.GameSetting.UpperBetLimitId = o.UpperBetLimitId;
		}
		
		
	}
}
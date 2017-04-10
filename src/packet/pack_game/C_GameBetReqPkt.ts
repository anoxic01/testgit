module packet.pack_game {
	export class C_GameBetReqPkt extends Packet	{
     	/// <summary>
        /// 遊戲ID
        /// </summary>
        public GameID:number;

        /// <summary>
        /// 賭桌ID
        /// </summary>
        public TableID:number;


        /// <summary>
        /// 玩家ID
        /// </summary>
        public PlayerID:number;


        /// <summary>
        /// 是否跨Server
        /// </summary>
        public IsCrossServer : boolean;


        /// <summary>
        /// 押注要求資料
        /// </summary>
        public BetList;
		
		public constructor() {
			super();
			this.BetList = new Array<lobby.model.game.GameBetBase>();

		}

	}
}
module packet.game {
	export class C_GameBetReqPkt extends Packet	{
     	/// <summary>
        /// 遊戲ID
        /// </summary>
        private gameID:number;

        /// <summary>
        /// 賭桌ID
        /// </summary>
        private tableID:number;


        /// <summary>
        /// 玩家ID
        /// </summary>
        private playerID:number;


        /// <summary>
        /// 是否跨Server
        /// </summary>
        private isCrossServer : boolean;


        /// <summary>
        /// 押注要求資料
        /// </summary>
        private betList:<GameBetBase>;
		
		public constructor() {
			this.betList = new <GameBetBase>();

		}

		
		get GameID():number
		{
			return gameID;
		}
		
		set  GameID(value:number) 
		{
			gameID = value;
		}
		
		get TableID():number
		{
			return tableID;
		}
		
		set  TableID(value:number) 
		{
			tableID = value;
		}
		
		get PlayerID():number
		{
			return playerID;
		}
		
		set  PlayerID(value:number) 
		{
			playerID = value;
		}
		
		get IsCrossServer(): boolean 
		{
			return isCrossServer;
		}
		
		set  IsCrossServer(value: boolean) 
		{
			isCrossServer = value;
		}
		
		get BetList():<GameBetBase> 
		{
			return betList;
		}
		
		set  BetList(value:<GameBetBase>) 
		{
			betList = value;
		}
		
	}
}
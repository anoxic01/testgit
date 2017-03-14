module packet.game {
	export class C_GameBetReqPkt extends Packet	{
     	/// <summary>
        /// 遊戲ID
        /// </summary>
        private var gameID:int;

        /// <summary>
        /// 賭桌ID
        /// </summary>
        private var tableID:int;


        /// <summary>
        /// 玩家ID
        /// </summary>
        private var playerID:int;


        /// <summary>
        /// 是否跨Server
        /// </summary>
        private var isCrossServer :Boolean;


        /// <summary>
        /// 押注要求資料
        /// </summary>
        private var betList:Vector.<GameBetBase>;
		
		public constructor() {
			this.betList = new Vector.<GameBetBase>();

		}

		
		public function get GameID():int 
		{
			return gameID;
		}
		
		public function set GameID(value:int):void 
		{
			gameID = value;
		}
		
		public function get TableID():int 
		{
			return tableID;
		}
		
		public function set TableID(value:int):void 
		{
			tableID = value;
		}
		
		public function get PlayerID():int 
		{
			return playerID;
		}
		
		public function set PlayerID(value:int):void 
		{
			playerID = value;
		}
		
		public function get IsCrossServer():Boolean 
		{
			return isCrossServer;
		}
		
		public function set IsCrossServer(value:Boolean):void 
		{
			isCrossServer = value;
		}
		
		public function get BetList():Vector.<GameBetBase> 
		{
			return betList;
		}
		
		public function set BetList(value:Vector.<GameBetBase>):void 
		{
			betList = value;
		}
		
	}
}
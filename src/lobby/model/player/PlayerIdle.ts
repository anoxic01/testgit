module lobby.model.player {
	export class PlayerIdle {
		 /// <summary>
        /// 廳館ID
        /// </summary>
        private var themeID :int;

        /// <summary>
        /// 桌號
        /// </summary>
        private var tableID :int;

        /// <summary>
        /// 代理ID
        /// </summary>
        private var agentID :int;
        /// <summary>
        /// 玩家ID
        /// </summary>
        private var playerID :int;

        /// <summary>
        /// 閒置局數
        /// </summary>
        private var idleRound :int;
        
        /// <summary>
        /// 最大閒置局數
        /// </summary>
        private var maxIdleRound:int;

        /// <summary>
        /// 是否踢出賭桌
        /// </summary>
        private var isKickout :Boolean;
		public constructor() {
		}
		
		public function get ThemeID():int 
		{
			return themeID;
		}
		
		public function set ThemeID(value:int):void 
		{
			themeID = value;
		}
		
		public function get TableID():int 
		{
			return tableID;
		}
		
		public function set TableID(value:int):void 
		{
			tableID = value;
		}
		
		public function get AgentID():int 
		{
			return agentID;
		}
		
		public function set AgentID(value:int):void 
		{
			agentID = value;
		}
		
		public function get PlayerID():int 
		{
			return playerID;
		}
		
		public function set PlayerID(value:int):void 
		{
			playerID = value;
		}
		
		public function get IdleRound():int 
		{
			return idleRound;
		}
		
		public function set IdleRound(value:int):void 
		{
			idleRound = value;
		}
		
		public function get MaxIdleRound():int 
		{
			return maxIdleRound;
		}
		
		public function set MaxIdleRound(value:int):void 
		{
			maxIdleRound = value;
		}
		
		public function get IsKickout():Boolean 
		{
			return isKickout;
		}
		
		public function set IsKickout(value:Boolean):void 
		{
			isKickout = value;
		}
		
		

		

		
	}
}
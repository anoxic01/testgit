module lobby.model.player {
	export class PlayerIdle {
		 /// <summary>
        /// 廳館ID
        /// </summary>
        private themeID :number;

        /// <summary>
        /// 桌號
        /// </summary>
        private tableID :number;

        /// <summary>
        /// 代理ID
        /// </summary>
        private agentID :number;
        /// <summary>
        /// 玩家ID
        /// </summary>
        private playerID :number;

        /// <summary>
        /// 閒置局數
        /// </summary>
        private idleRound :number;
        
        /// <summary>
        /// 最大閒置局數
        /// </summary>
        private maxIdleRound:number;

        /// <summary>
        /// 是否踢出賭桌
        /// </summary>
        private isKickout : boolean;
		public constructor() {
		}
		
		get ThemeID():number
		{
			return this.themeID;
		}
		
		set  ThemeID(value:number) 
		{
			this.themeID = value;
		}
		
		get TableID():number
		{
			return this.tableID;
		}
		
		set  TableID(value:number) 
		{
			this.tableID = value;
		}
		
		get AgentID():number
		{
			return this.agentID;
		}
		
		set  AgentID(value:number) 
		{
			this.agentID = value;
		}
		
		get PlayerID():number
		{
			return this.playerID;
		}
		
		set  PlayerID(value:number) 
		{
			this.playerID = value;
		}
		
		get IdleRound():number
		{
			return this.idleRound;
		}
		
		set  IdleRound(value:number) 
		{
			this.idleRound = value;
		}
		
		get MaxIdleRound():number
		{
			return this.maxIdleRound;
		}
		
		set  MaxIdleRound(value:number) 
		{
			this.maxIdleRound = value;
		}
		
		get IsKickout(): boolean 
		{
			return this.isKickout;
		}
		
		set  IsKickout(value: boolean) 
		{
			this.isKickout = value;
		}
		
		

		

		
	}
}
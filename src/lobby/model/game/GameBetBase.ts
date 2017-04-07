module lobby.model.game {
	export class GameBetBase {
		 /// <summary>
        /// 押注位置
        /// </summary>
        private betPos:string;

        /// <summary>
        /// 押注金額
        /// </summary>
        private amt:number = 0;
		public constructor() {
		}
		
		get BetPos():string 
		{
			return this.betPos;
		}
		
		set  BetPos(value:string) 
		{
			this.betPos = value;
		}
		
		get Amt():number 
		{
			return this.amt;
		}
		
		set  Amt(value:number) 
		{
			this.amt = value;
		}
		
	}
}
module lobby.model.player {
	export class PlayerVo {
		
		public agentID							:		number;				// 代理ID
		
		public id								:		number;				// 玩家ID
		
		public accountType						:		String="C";			// 帳戶種類
		
		public identity							:		number;				// 身份 - 0: 玩家, 1: 槍手
		
		public nickName							:		String;				// 暱稱
		
		public hiddenNickName					:		String;				// 暱稱2
		
		public pairTableID						:		number;				//配對桌ID
		
		private m_iSeatNo						:		number=-1;				// 座位號碼
			
		
		public gold								:		Number				// 玩家餘額
		
		public balance							:		struct.BalanceStruct		// 玩家全部币别餘額
		
		
		/// <summary>
		/// Lobby Server
		/// </summary>
		public lobbyServer						:		String;
		
		
		/// <summary>
		/// 是否為桌主
		/// </summary>
		public isTableOwner						:		 boolean;
		
		/// <summary>
		/// 閒家瞇牌權位置 座位号
		/// </summary>
		public PPSN 							:		number;
		
		
		/// <summary>
		/// 庄家瞇牌權位置 座位号
		/// </summary>
		public BPSN 							:		number;
		
		
		public joinTbType 						:		number;
		
		public isLogin 							:		 boolean;		// 玩家是否登入
		
		
		/**
		 * 莊, 莊對, 和 , 閒 ,閒對 , 大 , 小 
		 * //下注列表  ，百家乐  0不用 庄 1表示 ,轮盘从0开始 
		 *   betList[1]=100
		 * 
		 */
		public betList							:		any[];			
		public totalBet							:		Number=0; 		//总投注额
		public outcomeList						:		any[];			//赢金列表
		public lastBetList						:		any[];			//上次投注
		public sendTmpBetList					:		any[];			//要送給服務端暫存的下注列表
		public winGold							:		Number=0; 		//赢金
		
		public constructor() {
			this.betList=[];
			this.outcomeList=[];
			this.balance= new struct.BalanceStruct();
			this.lastBetList = [];
			this.sendTmpBetList = [];
		}
		
	
		get seatNo():number
		{
			return this.m_iSeatNo;
		}

		set  seatNo(value:number)
		{
				this.m_iSeatNo = value;
		}
		
		public clear():void{
			this.clearBetList();
			this.clearOutcomeList();
			this.clearLastBetList();
			this.clearTmpBetList();
		}
		
		
		
		/**
		 *当前使用货币  统一用G币
		 * @return 
		 * 
		 */
		get nCoin():number
		{
//			var coin:number=0;
//			switch(accountType){
//				case Define.CASH:
//					coin = balance.GCoin;
//					break;
//				case Define.CREDIT:
//					coin = balance.TotalCredit;
//					break;
//			}
			return this.balance.GCoin;
		}
		
		public initBetList(num:number):void{
			for (var i:number= 0; i < num; i++) 
			{
				this.betList[i]=0;
				this.outcomeList[i]=0;
				this.sendTmpBetList[i]=0;
			}
			
		}

		public getBet(id:number):number{
			if (this.betList[id]){
				return this.betList[id];
			}
			return 0;
		}
		public setBet(id:number,value:number):void{
			this.betList[id]= value;
			
		}
		public getTmpBet(id:number):number{
			if (this.sendTmpBetList[id]){
				return this.sendTmpBetList[id];
			}
			return 0;
		}
		public setTmpBet(id:number,value:number):void{
			this.sendTmpBetList[id]= value;
			
		}
		
		/**
		 *总共摆放在下注区 还未提交的筹码数额 
		 * @return 
		 * 
		 */
		get totalTmpBet():number{
			var sum:number=0;
			for (var i:number= 0; i < this.sendTmpBetList.length; i++) 
			{
				if( this.sendTmpBetList[i] ){
					sum+=this.sendTmpBetList[i];
				}
			}
			
			return sum;
		}
		
		/**
		 *上次投注额
		 * @return 
		 * 
		 */
		get lastTotalBet():number{
			var sum:number=0;
			for (var i:number= 0; i < this.lastBetList.length; i++) 
			{
				if( this.lastBetList[i] ){
					sum+=this.lastBetList[i];
				}
			}
			
			return sum;
		}
		
		/**
		 *清空投注金额 
		 * 
		 */
		public clearBetList():void
		{
			for (var i:number= 0; i < this.betList.length; i++) 
			{
				this.betList[i]=0;	
			}
			
		}
		
		/**
		 *清空输赢金额 
		 * 
		 */
		public clearOutcomeList():void
		{
			this.winGold = 0;
			for (var i:number= 0; i < this.outcomeList.length; i++) 
			{
				this.outcomeList[i]=0;	
			}
		}
		
		/**
		 * 清空上一局投注金額
		 */
		public clearLastBetList():void {
			for (var i:number= 0; i < this.lastBetList.length; i++) {
				this.lastBetList[i]=0;	
			}
		}
		
		/**
		 * 清空暫存下注列表
		 */
		public clearTmpBetList():void {
			for (var i:number= 0; i < this.sendTmpBetList.length; i++) {
				this.sendTmpBetList[i]=0;	
			}
		}
		
		public destroy():void {
			if( this.sendTmpBetList ){
				this.sendTmpBetList = null;
			}
			if( this.lastBetList ){
				this.lastBetList = null;
			}
			if( this.betList ){
				this.betList = null;
			}
			if( this.outcomeList ){
				this.outcomeList = null;
			}
			if( this.balance ){
				this.balance = null;
			}
		}
		
		public sortLastBet():void{
			this.clearLastBetList();
			this.lastBetList = this.betList.concat();
		}
		
		public clone():PlayerVo{
			var vo:PlayerVo = new PlayerVo();
			vo.agentID=this.agentID;
			
			vo.id	=this.id;			
			
			vo.accountType	=this.accountType;			
			vo.identity		=this.identity;
			
			vo.nickName		=this.nickName;
			
			vo.hiddenNickName=this.hiddenNickName;
			
			vo.pairTableID		=this.pairTableID;		
			
			this.m_iSeatNo		=this.seatNo;			
			
			vo.gold		=this.gold;
			
			vo.balance	=this.balance;
			vo.lobbyServer	=this.lobbyServer;
			
			vo.isTableOwner		=this.isTableOwner;
			vo.PPSN 			=this.PPSN;
			
			vo.BPSN 		=this.BPSN;
			
			
			vo.joinTbType 		=this.joinTbType;				
			
			vo.isLogin 			=this.isLogin;					
			
			
			vo.betList = this.betList.concat();
			vo.totalBet	=this.totalBet;
			vo.outcomeList	=this.outcomeList.concat();
			vo.lastBetList	=this.lastBetList.concat();
			vo.sendTmpBetList	=this.sendTmpBetList.concat();
			vo.winGold	=this.winGold;
			
			return vo;
		}
		
		
		
	}
}
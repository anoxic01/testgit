module lobby.model.player {
	export class PlayerVo {
		
		public var agentID							:		int;				// 代理ID
		
		public var id								:		int;				// 玩家ID
		
		public var accountType						:		String="C";			// 帳戶種類
		
		public var identity							:		int;				// 身份 - 0: 玩家, 1: 槍手
		
		public var nickName							:		String;				// 暱稱
		
		public var hiddenNickName					:		String;				// 暱稱2
		
		public var pairTableID						:		int;				//配對桌ID
		
		private var m_iSeatNo						:		int=-1;				// 座位號碼
			
		
		public var gold								:		Number				// 玩家餘額
		
		public var balance							:		BalanceStruct		// 玩家全部币别餘額
		
		
		/// <summary>
		/// Lobby Server
		/// </summary>
		public var lobbyServer						:		String;
		
		
		/// <summary>
		/// 是否為桌主
		/// </summary>
		public var isTableOwner						:		Boolean;
		
		/// <summary>
		/// 閒家瞇牌權位置 座位号
		/// </summary>
		public var PPSN 							:		int;
		
		
		/// <summary>
		/// 庄家瞇牌權位置 座位号
		/// </summary>
		public var BPSN 							:		int;
		
		
		public var joinTbType 						:		int;
		
		public var isLogin 							:		Boolean;		// 玩家是否登入
		
		
		/**
		 * 莊, 莊對, 和 , 閒 ,閒對 , 大 , 小 
		 * //下注列表  ，百家乐  0不用 庄 1表示 ,轮盘从0开始 
		 *   betList[1]=100
		 * 
		 */
		public var betList							:		Array;			
		public var totalBet							:		Number=0; 		//总投注额
		public var outcomeList						:		Array;			//赢金列表
		public var lastBetList						:		Array;			//上次投注
		public var sendTmpBetList					:		Array;			//要送給服務端暫存的下注列表
		public var winGold							:		Number=0; 		//赢金
		
		public constructor() {
			betList=[];
			outcomeList=[];
			balance= new BalanceStruct();
			lastBetList = [];
			sendTmpBetList = [];
		}
		
	
		public function get seatNo():int
		{
			return m_iSeatNo;
		}

		public function set seatNo(value:int):void
		{
				m_iSeatNo = value;
		}
		
		public function clear():void{
			clearBetList();
			clearOutcomeList();
			clearLastBetList();
			clearTmpBetList();
		}
		
		
		
		/**
		 *当前使用货币  统一用G币
		 * @return 
		 * 
		 */
		public function get nCoin():Number
		{
//			var coin:Number=0;
//			switch(accountType){
//				case Define.CASH:
//					coin = balance.GCoin;
//					break;
//				case Define.CREDIT:
//					coin = balance.TotalCredit;
//					break;
//			}
			return balance.GCoin;
		}
		
		public function initBetList(num:uint):void{
			for (var i:int = 0; i < num; i++) 
			{
				betList[i]=0;
				outcomeList[i]=0;
				sendTmpBetList[i]=0;
			}
			
		}

		public function getBet(id:Number):Number{
			if (betList[id]){
				return betList[id];
			}
			return 0;
		}
		public function setBet(id:int,value:Number):void{
			betList[id]= value;
			
		}
		public function getTmpBet(id:Number):Number{
			if (sendTmpBetList[id]){
				return sendTmpBetList[id];
			}
			return 0;
		}
		public function setTmpBet(id:int,value:Number):void{
			sendTmpBetList[id]= value;
			
		}
		
		/**
		 *总共摆放在下注区 还未提交的筹码数额 
		 * @return 
		 * 
		 */
		public function get totalTmpBet():Number{
			var sum:Number=0;
			for (var i:int = 0; i < sendTmpBetList.length; i++) 
			{
				if( sendTmpBetList[i] ){
					sum+=sendTmpBetList[i];
				}
			}
			
			return sum;
		}
		
		/**
		 *上次投注额
		 * @return 
		 * 
		 */
		public function get lastTotalBet():Number{
			var sum:Number=0;
			for (var i:int = 0; i < lastBetList.length; i++) 
			{
				if( lastBetList[i] ){
					sum+=lastBetList[i];
				}
			}
			
			return sum;
		}
		
		/**
		 *清空投注金额 
		 * 
		 */
		public function clearBetList():void
		{
			for (var i:int = 0; i < betList.length; i++) 
			{
				betList[i]=0;	
			}
			
		}
		
		/**
		 *清空输赢金额 
		 * 
		 */
		public function clearOutcomeList():void
		{
			winGold = 0;
			for (var i:int = 0; i < outcomeList.length; i++) 
			{
				outcomeList[i]=0;	
			}
		}
		
		/**
		 * 清空上一局投注金額
		 */
		public function clearLastBetList():void {
			for (var i:int = 0; i < lastBetList.length; i++) {
				lastBetList[i]=0;	
			}
		}
		
		/**
		 * 清空暫存下注列表
		 */
		public function clearTmpBetList():void {
			for (var i:int = 0; i < sendTmpBetList.length; i++) {
				sendTmpBetList[i]=0;	
			}
		}
		
		public function destroy():void {
			if( sendTmpBetList ){
				sendTmpBetList = null;
			}
			if( lastBetList ){
				lastBetList = null;
			}
			if( betList ){
				betList = null;
			}
			if( outcomeList ){
				outcomeList = null;
			}
			if( balance ){
				balance = null;
			}
		}
		
		public function sortLastBet():void{
			clearLastBetList();
			lastBetList = betList.concat();
		}
		
		public function clone():PlayerVo{
			var vo:PlayerVo = new PlayerVo();
			vo.agentID=this.agentID;
			
			vo.id	=this.id;			
			
			vo.accountType	=this.accountType;			
			vo.identity		=this.identity;
			
			vo.nickName		=this.nickName;
			
			vo.hiddenNickName=this.hiddenNickName;
			
			vo.pairTableID		=this.pairTableID;		
			
			 m_iSeatNo		=seatNo;			
			
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
module lobby.model.struct {
	export class StaticsInfoBaccarat extends StaticsInfoStruct {
		public BankerBetAmt		:	Number	=	0;			//莊家總押注金額
        public BankerBetCnt		:	Number	=	0;			//莊家押注次數
		public BankerWinCnt		:	Number	=	0;			//庄赢次数
		
		public BankerPairBetAmt :	Number	=	0;			//庄對押注金額
		public BankerPairBetCnt	:	Number	=	0;			//庄對押注次數
		public BankerPairWinCnt	:	Number	=	0;			//庄对次数
		
		public BigBetAmt 		:	Number	=	0;			//大押注金額
		public BigBetCnt 		:	Number	=	0;			//大押注次數
		public BigWinCnt		:	Number	=	0;			//大赢次数
		
		public PlayerBetAmt		:	Number	=	0;			//閒家總押注金額
        public PlayerBetCnt		:	Number	=	0;			//閒家押注次數
		public PlayerWinCnt		:	Number	=	0;			//闲赢次数
		
		public PlayerPairBetAmt :	Number	=	0;			//閒對押注金額
		public PlayerPairBetCnt	:	Number	=	0;			//閒對押注次數
		public PlayerPairWinCnt	:	Number	=	0;			//闲对次数
		
		public SmallBetCnt 		:	Number	=	0;			//小押注次數
		public SmallBetAmt 		:	Number	=	0;			//小押注金額
		public SmallWinCnt		:	Number	=	0;			//小赢次数
		
        public TieBetCnt		:	Number	=	0;			//和押注次數
        public TieBetAmt		:	Number	=	0;			//和押注金額
		public TieWinCnt		:	Number	=	0;			//和赢次数

		
		public constructor() {
			super();
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		 public updateStatic( oData:Object ):void {
			
			this.setData( "BankerBetAmt" , oData );
			this.setData( "BankerBetCnt" , oData );
			this.setData( "BankerWinCnt" , oData );
			
			this.setData( "BankerPairBetAmt" , oData );
			this.setData( "BankerPairBetCnt" , oData );
			this.setData( "BankerPairWinCnt" , oData );
			
			this.setData( "BigBetAmt" , oData );
			this.setData( "BigBetCnt" , oData );
			this.setData( "BigWinCnt" , oData );
			
			this.setData( "PlayerBetAmt" , oData );
			this.setData( "PlayerBetCnt" , oData );
			this.setData( "PlayerWinCnt" , oData );
			
			this.setData( "PlayerPairBetAmt" , oData );
			this.setData( "PlayerPairBetCnt" , oData );
			this.setData( "PlayerPairWinCnt" , oData );
			
			this.setData( "SmallBetCnt" , oData );
			this.setData( "SmallBetAmt" , oData );
			this.setData( "SmallWinCnt" , oData );
			
			this.setData( "TieBetCnt" , oData );
			this.setData( "TieBetAmt" , oData );
			this.setData( "TieWinCnt" , oData );
			
			super.updateStatic(oData);
		}
		
		 public updateSum(oData:Object):void
		{
			this.setData( "BankerWinCnt" , oData );
			this.setData( "BankerPairWinCnt" , oData );
			this.setData( "BigWinCnt" , oData );
			this.setData( "PlayerWinCnt" , oData );
			this.setData( "PlayerPairWinCnt" , oData );
			this.setData( "SmallWinCnt" , oData );
			this.setData( "TieWinCnt" , oData );
			super.updateSum(oData);
		}
		
		 public clear():void
		{
			super.clear();
			this.BankerBetAmt		=	0;			//莊家總押注金額
			this.BankerBetCnt		=	0;			//莊家押注次數
			this.BankerWinCnt		=	0;			//庄赢次数
			
			this.BankerPairBetAmt =	0;			//庄對押注金額
			this.BankerPairBetCnt	=	0;			//庄對押注次數
			this.BankerPairWinCnt	=	0;			//庄对次数
			
			this.BigBetAmt 		=	0;			//大押注金額
			this.BigBetCnt 		=	0;			//大押注次數
			this.BigWinCnt		=	0;			//大赢次数
			
			this.PlayerBetAmt		=	0;			//閒家總押注金額
			this.PlayerBetCnt		=	0;			//閒家押注次數
			this.PlayerWinCnt		=	0;			//闲赢次数
			
			this.PlayerPairBetAmt =	0;			//閒對押注金額
			this.PlayerPairBetCnt	=	0;			//閒對押注次數
			this.PlayerPairWinCnt	=	0;			//闲对次数
			
			this.SmallBetCnt 		=	0;			//小押注次數
			this.SmallBetAmt 		=	0;			//小押注金額
			this.SmallWinCnt		=	0;			//小赢次数
			
			this.TieBetCnt		=	0;			//和押注次數
			this.TieBetAmt		=	0;			//和押注金額
			this.TieWinCnt		=	0;			//和赢次数
		}
		
		
		
		
	}
}
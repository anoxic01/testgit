module lobby.model.struct {
	export class StaticsInfoBaccarat extends StaticsInfoStruct {
		public var BankerBetAmt		:	Number	=	0;			//莊家總押注金額
        public var BankerBetCnt		:	Number	=	0;			//莊家押注次數
		public var BankerWinCnt		:	Number	=	0;			//庄赢次数
		
		public var BankerPairBetAmt :	Number	=	0;			//庄對押注金額
		public var BankerPairBetCnt	:	Number	=	0;			//庄對押注次數
		public var BankerPairWinCnt	:	Number	=	0;			//庄对次数
		
		public var BigBetAmt 		:	Number	=	0;			//大押注金額
		public var BigBetCnt 		:	Number	=	0;			//大押注次數
		public var BigWinCnt		:	Number	=	0;			//大赢次数
		
		public var PlayerBetAmt		:	Number	=	0;			//閒家總押注金額
        public var PlayerBetCnt		:	Number	=	0;			//閒家押注次數
		public var PlayerWinCnt		:	Number	=	0;			//闲赢次数
		
		public var PlayerPairBetAmt :	Number	=	0;			//閒對押注金額
		public var PlayerPairBetCnt	:	Number	=	0;			//閒對押注次數
		public var PlayerPairWinCnt	:	Number	=	0;			//闲对次数
		
		public var SmallBetCnt 		:	Number	=	0;			//小押注次數
		public var SmallBetAmt 		:	Number	=	0;			//小押注金額
		public var SmallWinCnt		:	Number	=	0;			//小赢次数
		
        public var TieBetCnt		:	Number	=	0;			//和押注次數
        public var TieBetAmt		:	Number	=	0;			//和押注金額
		public var TieWinCnt		:	Number	=	0;			//和赢次数

		
		public constructor() {
			super();
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		override public function updateStatic( oData:Object ):void {
			
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
		
		override public function updateSum(oData:Object):void
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
		
		override public function clear():void
		{
			super.clear();
			BankerBetAmt		=	0;			//莊家總押注金額
			BankerBetCnt		=	0;			//莊家押注次數
			BankerWinCnt		=	0;			//庄赢次数
			
			BankerPairBetAmt =	0;			//庄對押注金額
			BankerPairBetCnt	=	0;			//庄對押注次數
			BankerPairWinCnt	=	0;			//庄对次数
			
			BigBetAmt 		=	0;			//大押注金額
			BigBetCnt 		=	0;			//大押注次數
			BigWinCnt		=	0;			//大赢次数
			
			PlayerBetAmt		=	0;			//閒家總押注金額
			PlayerBetCnt		=	0;			//閒家押注次數
			PlayerWinCnt		=	0;			//闲赢次数
			
			PlayerPairBetAmt =	0;			//閒對押注金額
			PlayerPairBetCnt	=	0;			//閒對押注次數
			PlayerPairWinCnt	=	0;			//闲对次数
			
			SmallBetCnt 		=	0;			//小押注次數
			SmallBetAmt 		=	0;			//小押注金額
			SmallWinCnt		=	0;			//小赢次数
			
			TieBetCnt		=	0;			//和押注次數
			TieBetAmt		=	0;			//和押注金額
			TieWinCnt		=	0;			//和赢次数
		}
		
		
		
		
	}
}
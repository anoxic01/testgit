module lobby.model.struct {
	export class StaticsInfoDTF extends StaticsInfoStruct{
		
		public var DragonBetAmt		:	int;					//下注金额
		public var DragonBetCnt		:	Number	=	0;			//下注次数
		public var DragonWinCnt		:	Number	=	0;			//开出数量
		
		public var TieBetAmt		:	Number	=	0;			//和押注金額
		public var TieBetCnt		:	int;					//和押注次數
		public var TieWinCnt		:	Number	=	0;			//开出数量
		
		public var TigerBetAmt 		:	int;					//下注金额
		public var TigerBetCnt 		:	Number	=	0;			//下注次数
		public var TigerWinCnt		:	int;					//开出数量
		
		public constructor() {
			super();
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		override public function updateStatic( oData:Object ):void {
			this.setData( "DragonBetAmt" , oData );
			this.setData( "DragonBetCnt" , oData );
			this.setData( "DragonWinCnt" , oData );
			
			this.setData( "TieBetCnt" , oData );
			this.setData( "TieBetAmt" , oData );
			this.setData( "TieWinCnt" , oData );
			
			this.setData( "TigerBetAmt" , oData );
			this.setData( "TigerBetCnt" , oData );
			this.setData( "TigerWinCnt" , oData );
			
			super.updateStatic(oData);
		}
		
		override public function updateSum(oData:Object):void
		{
			this.setData( "DragonWinCnt" , oData );
			this.setData( "TieWinCnt" , oData );
			this.setData( "TigerWinCnt" , oData );
			
			super.updateSum(oData);
		}
		
		
		
	}
}
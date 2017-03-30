module lobby.model.struct {
	export class BetLimitListStruct {
		public GameID			:	number;							//游戏序号
		public vecBetLimitList	:	BetLimitStruct[];		//限额列表
		
		public constructor( oData=null ) {
			this.vecBetLimitList = new Array<BetLimitStruct>();
			
			this.GameID = oData.GameID;
			
			var _arrBetLimitList : any[] = oData.BetLimitList;
			var _uLen : number = _arrBetLimitList.length;
			var _betLimitStruct : BetLimitStruct;
			for (var i:number= 0; i < _uLen; i++) 
			{
				_betLimitStruct = new BetLimitStruct(_arrBetLimitList[i]);
				this.vecBetLimitList.push(_betLimitStruct);
			}
			_arrBetLimitList = null;
			_betLimitStruct = null;
		}
	}
}
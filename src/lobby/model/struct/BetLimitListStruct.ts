module lobby.model.struct {
	export class BetLimitListStruct {
		public var GameID			:	int;							//游戏序号
        public var vecBetLimitList	:	Vector.<BetLimitStruct>;		//限额列表
		
		public constructor( oData:Object=null ) {
			vecBetLimitList = new Vector.<BetLimitStruct>();
			
			GameID = oData.GameID;
			
			var _arrBetLimitList : Array = oData.BetLimitList;
			var _uLen : uint = _arrBetLimitList.length;
			var _betLimitStruct : BetLimitStruct;
			for (var i:int = 0; i < _uLen; i++) 
			{
				_betLimitStruct = new BetLimitStruct(_arrBetLimitList[i]);
				vecBetLimitList.push(_betLimitStruct);
			}
			_arrBetLimitList = null;
			_betLimitStruct = null;
		}
	}
}
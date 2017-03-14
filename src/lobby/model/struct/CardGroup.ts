module lobby.model.struct {
	export class CardGroup {
		public var aCardData:Array;
		public constructor() {
			aCardData = [];
		}
		
		public function push( _iCardNo:int , _iCSuit:int):void {
			var _cardStruct:CardStruct 		= new CardStruct();
				_cardStruct.CardNumber 		= _iCardNo;
				_cardStruct.CSuit 			= _iCSuit;
				aCardData.push(_cardStruct);
		}
		
		
	}
}
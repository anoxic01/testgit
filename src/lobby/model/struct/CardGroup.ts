module lobby.model.struct {
	export class CardGroup {
		public aCardData:any[];
		public constructor() {
			this.aCardData = [];
		}
		
		public push( _iCardNo:number, _iCSuit:number):void {
			var _cardStruct:CardStruct 		= new CardStruct();
				_cardStruct.CardNumber 		= _iCardNo;
				_cardStruct.CSuit 			= _iCSuit;
				this.aCardData.push(_cardStruct);
		}
		
		
	}
}
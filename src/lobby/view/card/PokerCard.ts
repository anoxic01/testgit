module lobby.view.card {
	export class PokerCard extends CardItem{
		public var flyed		:	Boolean;
		public var value		:	String = "";
		public var ox			:	int;
		public var oy			:	int;
		public var rot			:	int;

		public constructor(_cardId:String,_cardType:uint=0) {
			super(_cardId,_cardType,true);
		}
	}
}
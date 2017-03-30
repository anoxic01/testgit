module lobby.view.card {
	export class PokerCard extends CardItem{
		public flyed		:	 boolean;
		public value		:	String = "";
		public ox			:	number;
		public oy			:	number;
		public rot			:	number;

		public constructor(_cardId:String,_cardType:number=0) {
			super(_cardId,_cardType,true);
		}
	}
}
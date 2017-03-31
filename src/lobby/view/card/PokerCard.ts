module lobby.view.card {
	export class PokerCard extends CardItem{
		public flyed		:	 boolean;
		public value		:	string = "";
		public ox			:	number;
		public oy			:	number;
		public rot			:	number;

		public constructor(_cardId:string,_cardType:number=0) {
			super(_cardId,_cardType,true);
		}
	}
}
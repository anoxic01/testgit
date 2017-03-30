module lobby.model.struct {
	export class CardStruct {
		public CSuit 		:number;
		public CardNumber 	:number;
		
		public constructor() {
			this.CSuit 		= -1;
			this.CardNumber 	= -1;
		}
	}
}
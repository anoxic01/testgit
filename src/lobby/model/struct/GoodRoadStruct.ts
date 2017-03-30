module lobby.model.struct {
	export class GoodRoadStruct {
		public GameID		:	number;
		public TableID		:	number;
		public MatchList	:	any[];
		
		public constructor( oData=null ) {
			if(oData==null){
				return;
			}
			this.GameID 		= 	oData.GameID;
			this.TableID 	= 	oData.TableID;
			this.MatchList 	= 	oData.MatchList;
		}
	}
}
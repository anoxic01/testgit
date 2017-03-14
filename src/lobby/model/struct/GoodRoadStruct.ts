module lobby.model.struct {
	export class GoodRoadStruct {
		public var GameID		:	int;
		public var TableID		:	int;
		public var MatchList	:	Array;
		
		public constructor( oData:Object=null ) {
			if(oData==null){
				return;
			}
			GameID 		= 	oData.GameID;
			TableID 	= 	oData.TableID;
			MatchList 	= 	oData.MatchList;
		}
	}
}
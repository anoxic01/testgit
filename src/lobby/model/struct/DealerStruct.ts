module lobby.model.struct {
	export class DealerStruct {
		public var ThemeID	:	int;
		public var TableID	:	int;
		public var LoginID	:	String;
		public var Name		:	String;
		public var PhotoUrl	:	String;
		
		public constructor() {
			if (_oData){
				ThemeID = _oData.ThemeID;
				TableID = _oData.TableID;
				LoginID = _oData.LoginID;
				Name = _oData.Name;
				PhotoUrl = _oData.PhotoUrl;
			}
			
		}
	}
}
module lobby.model.struct {
	export class DealerStruct {
		public ThemeID	:	number;
		public TableID	:	number;
		public LoginID	:	String;
		public Name		:	String;
		public PhotoUrl	:	String;
		
		public constructor(_oData) {
			if (_oData){
				this.ThemeID = _oData.ThemeID;
				this.TableID = _oData.TableID;
				this.LoginID = _oData.LoginID;
				this.Name = _oData.Name;
				this.PhotoUrl = _oData.PhotoUrl;
			}
			
		}
	}
}
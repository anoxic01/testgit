module lobby.model.struct {
	export class AnnouncementItemStruct {
		public Lang	:	number;				//语系
		public Msg	:	String;				//公告信息
		
		public constructor( _oData ) {
			if( _oData.Lang ){
				this.Lang = _oData.Lang;
			}
			if(  _oData.Msg ){
				this.Msg = _oData.Msg;
			}
		}
	}
}
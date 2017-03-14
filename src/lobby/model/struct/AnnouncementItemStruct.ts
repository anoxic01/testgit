module lobby.model.struct {
	export class AnnouncementItemStruct {
		public var Lang	:	int;				//语系
		public var Msg	:	String;				//公告信息
		
		public constructor( _oData:Object ) {
			if( _oData.Lang ){
				Lang = _oData.Lang;
			}
			if(  _oData.Msg ){
				Msg = _oData.Msg;
			}
		}
	}
}
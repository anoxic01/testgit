module lobby.model.struct {
	export class AnnouncementStruct {
		public var Lang		:	int;			//语系 0-简体中文		1-繁体中文		2-英文
		public var Title	:	String;			//标题
		public var Msg		:	String;			//公告信息
		
		public constructor(_oData:Object) {
			if(_oData==null){
				return;
			}
			
			Lang = _oData.Lang;
			Title = _oData.Title;
			Msg = _oData.Msg;
			
			//没有数据暂不解析
		}
	}
}
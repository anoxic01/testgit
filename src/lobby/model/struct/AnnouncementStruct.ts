module lobby.model.struct {
	export class AnnouncementStruct {
		public Lang		:	number;			//语系 0-简体中文		1-繁体中文		2-英文
		public Title	:	String;			//标题
		public Msg		:	String;			//公告信息
		
		public constructor(_oData) {
			if(_oData==null){
				return;
			}
			
			this.Lang = _oData.Lang;
			this.Title = _oData.Title;
			this.Msg = _oData.Msg;
			
			//没有数据暂不解析
		}
	}
}
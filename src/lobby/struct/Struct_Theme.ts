module lobby.struct {
	export class Struct_Theme {

		public TableCnt			:	number;						//桌子数量
		public ThemeID			:	number;						//厅馆序号
		
		public ThemeName_TW		:	String;						//厅馆名称
        public ThemeName_CN		:	String;						//厅馆名称
        public ThemeName_EN		:	String;						//厅馆名称
		
		public TableList		:	Struct_Table[];				//桌子信息
		
		public IsTelBet			:	Boolean 	=	false;		//是否电投
		public IsMaintaining	:	Boolean;					//维护状态
		public SN				:	number;						//排列序号

		public constructor() {
		}
	}
}
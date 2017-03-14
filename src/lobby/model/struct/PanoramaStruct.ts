module lobby.model.struct {
	export class PanoramaStruct {
		 public var PanoramaID		:	int;		//全景序号
		
        public var PanoramaName_TW	:	String;		//全景名称
        public var PanoramaName_CN :	String;		//全景名称
        public var PanoramaName_EN :	String;		//全景名称
		
        public var StreamUrl 		:	String;		//视讯地址
        public var StreamName 		:	String;		//视讯名称
        public var StreamAppName	:	String;		//串流名称
		
        public var CreateDataTime 	:	String;		//创建时间
		
		public var PriorityNo		:	int;		//优先顺序
		public var IsDef			:	Boolean;	//是否预设

		public constructor( oData:Object=null ) {
			if(oData==null)
			{
				return;
			}
			
			update(oData);
		}
		
		public function update(oData:Object):void{
			PanoramaID = oData.PanoramaID;
			
			PanoramaName_TW = oData.PanoramaName_TW;
			PanoramaName_CN = oData.PanoramaName_CN;
			PanoramaName_EN = oData.PanoramaName_EN;
			
			StreamUrl = oData.StreamUrl;
			StreamName = oData.StreamName;
			StreamAppName = oData.StreamAppName;
			
			CreateDataTime = oData.CreateDataTime;
			
			PriorityNo = oData.PriorityNo;
			IsDef = oData.IsDef;
		}
		
	}
}
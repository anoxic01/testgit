module lobby.model.struct {
	export class PanoramaStruct {
		 public PanoramaID		:	number;		//全景序号
		
        public PanoramaName_TW	:	String;		//全景名称
        public PanoramaName_CN :	String;		//全景名称
        public PanoramaName_EN :	String;		//全景名称
		
        public StreamUrl 		:	String;		//视讯地址
        public StreamName 		:	String;		//视讯名称
        public StreamAppName	:	String;		//串流名称
		
        public CreateDataTime 	:	String;		//创建时间
		
		public PriorityNo		:	number;		//优先顺序
		public IsDef			:	 boolean;	//是否预设

		public constructor( oData=null ) {
			if(oData==null)
			{
				return;
			}
			
			this.update(oData);
		}
		
		public update(oData):void{
			this.PanoramaID = oData.PanoramaID;
			
			this.PanoramaName_TW = oData.PanoramaName_TW;
			this.PanoramaName_CN = oData.PanoramaName_CN;
			this.PanoramaName_EN = oData.PanoramaName_EN;
			
			this.StreamUrl = oData.StreamUrl;
			this.StreamName = oData.StreamName;
			this.StreamAppName = oData.StreamAppName;
			
			this.CreateDataTime = oData.CreateDataTime;
			
			this.PriorityNo = oData.PriorityNo;
			this.IsDef = oData.IsDef;
		}
		
	}
}
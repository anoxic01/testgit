module packet.pack_lobby {
	export class C_Log_Req_Pkt  extends Packet{
		public Ver			:	String;			//版本
		public Platform		:	number;			//平台
		public ProjectID	:	number;			//专案ID
		public LogID		:	String;			//LogToken
		public LogType		:	number;			//信息种类
		public PID			:	number;			//协议ID
		public ClassName	:	String;			//类名
		public LineNumber	:	number;			//行数
		public ETrace		:	String;			//来源追踪
		public Log			:	String;			//携带信息
		
		public constructor() {
			super();
			this.Ver = config.TemConfig.VERSION;
			this.Platform = 11;
			this.ProjectID = -1;
			this.LogType = -1;
			this.PID = -1;
			this.ClassName = "";
			this.LineNumber = -1;
			this.ETrace = "";
		}
	}
}
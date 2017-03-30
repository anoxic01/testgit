module packet.lobby {
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
			Ver = TemConfig.VERSION;
			Platform = 11;
			ProjectID = -1;
			LogType = -1;
			PID = -1;
			ClassName = "";
			LineNumber = -1;
			ETrace = "";
		}
	}
}
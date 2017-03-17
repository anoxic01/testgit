module packet.lobby {
	export class C_Log_Req_Pkt  extends Packet{
		public var Ver			:	String;			//版本
		public var Platform		:	int;			//平台
		public var ProjectID	:	int;			//专案ID
		public var LogID		:	String;			//LogToken
		public var LogType		:	int;			//信息种类
		public var PID			:	int;			//协议ID
		public var ClassName	:	String;			//类名
		public var LineNumber	:	int;			//行数
		public var ETrace		:	String;			//来源追踪
		public var Log			:	String;			//携带信息
		
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
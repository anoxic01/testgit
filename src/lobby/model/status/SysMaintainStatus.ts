module lobby.model.status {
	export class SysMaintainStatus {
		
		public static Undefined	:	number	=	0;			//初始使用
		public static Start		:	number	=	1;			//开始维护
		public static Stop		:	number	=	2;			//结束维护
		public static Remind	:	number	=	3;			//维护提醒
		
		public constructor() {
		}
	}
}
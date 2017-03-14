module lobby.model.status {
	export class SysMaintainStatus {
		
		public static const Undefined	:	int	=	0;			//初始使用
		public static const Start		:	int	=	1;			//开始维护
		public static const Stop		:	int	=	2;			//结束维护
		public static const Remind		:	int	=	3;			//维护提醒
		
		public constructor() {
		}
	}
}
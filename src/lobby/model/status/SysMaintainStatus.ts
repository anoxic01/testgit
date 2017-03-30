module lobby.model.status {
	export class SysMaintainStatus {
		
		public staticUndefined	:	number	=	0;			//初始使用
		public staticStart		:	number	=	1;			//开始维护
		public staticStop		:	number	=	2;			//结束维护
		public staticRemind		:	number	=	3;			//维护提醒
		
		public constructor() {
		}
	}
}
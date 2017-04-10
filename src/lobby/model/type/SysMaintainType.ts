module lobby.model.type {
	export class SysMaintainType {
		
		public static Maintenance_Non		:	number	=	0;			//非维护中（client不需要）
		public static Maintenance_FullSite	:	number	=	1;			//全站维护
		public static Maintenance_Theme		:	number	=	2;			//厅馆维护
		public static Maintenance_Table		:	number	=	3;			//赌桌维护
		public static Maintenance_TopAgent	:	number	=	4;			//代理维护
		
		public constructor() {
		}
	}
}
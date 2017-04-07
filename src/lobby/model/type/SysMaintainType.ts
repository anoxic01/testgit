module lobby.model.type {
	export class SysMaintainType {
		
		public static Maintenance_Non			:	int	=	0;			//非维护中（client不需要）
		public static Maintenance_FullSite	:	int	=	1;			//全站维护
		public static Maintenance_Theme		:	int	=	2;			//厅馆维护
		public static Maintenance_Table		:	int	=	3;			//赌桌维护
		public static Maintenance_TopAgent	:	int	=	4;			//代理维护
		
		public constructor() {
		}
	}
}
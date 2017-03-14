module lobby.model.type {
	export class SysMaintainType {
		
		public static const Maintenance_Non			:	int	=	0;			//非维护中（client不需要）
		public static const Maintenance_FullSite	:	int	=	1;			//全站维护
		public static const Maintenance_Theme		:	int	=	2;			//厅馆维护
		public static const Maintenance_Table		:	int	=	3;			//赌桌维护
		public static const Maintenance_TopAgent	:	int	=	4;			//代理维护
		
		public constructor() {
		}
	}
}
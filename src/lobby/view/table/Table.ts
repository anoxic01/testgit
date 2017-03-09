module lobby.view.table {
	export class Table extends egret.DisplayObjectContainer {
		protected m_mcAsset						;					//房间资源
		protected m_mcContent					;					//缓存内容
		protected m_bmpBg						;						//桌子背景
		protected m_bmpIcon						;						//桌子图标
		protected m_bmpTable					;						//桌子序号
		protected m_bmpTime						;						//倒计时
		protected m_bmpTableHint				;						//桌子提示
		protected m_bmpHintShuffle				;						//洗牌提示
//		private m_bmpFace						;						//头像位图
		protected m_imgLoader					;				//加载头像
		protected m_imgLoaderNew				;				//下载头像
		protected m_sFaceUrl					:	string	=	"";				//头像路径
		protected m_spFaceContainer				;
		
		protected m_mcHot						;					//鼠标热区
		protected m_struct						:	lobby.struct.Struct_Table;				//数据结构
		
//		protected m_btnLimit					;			//限红选择
		public tableLoginType					:	TableLogin;					//进桌方式
		protected m_iCountDown					:	number;						//时间记录
		protected m_iGameNo						:	number;						//本地局号
		protected m_iShoeNo						:	number;						//本地靴号
		protected m_bNotFinished				:	boolean;					//路纸异常
		protected m_bSettled					:	boolean;					//结算状态
		
		protected m_bHotOver					:	boolean;					//
		
		protected m_timer						;
		protected m_bmpBgOver					;
		protected m_uCurrentFrame				:	number;
		protected m_uTotaleFrame				:	number;
		
		protected m_spstatisticContain			;
		protected m_panelStatistic				:	StatisticsUI;				//统计面板
		protected m_spStatisticMask				;						//统计遮罩
		protected m_btnStatistics_cn			;				//统计按钮
		protected m_btnStatistics_tw			;				//统计按钮
		protected m_btnStatistics_en			;				//统计按钮
		protected m_bStatistic					:	boolean;					//按钮状态
		
		protected m_Statistic_topY				:	number;
		protected m_Statistic_bottomY			:	number;
		protected m_Statistic_bottom_offsetY	:	number;

		public constructor() {
			super();

			this.m_bmpBg = tool.BitmapTool.getInstance().createBitmapByName("table_bg_lobby_default_png");
			this.addChild(this.m_bmpBg);
			this.m_bmpBgOver = tool.BitmapTool.getInstance().createBitmapByName("table_bg_lobby_over.png");
		}
	}
}
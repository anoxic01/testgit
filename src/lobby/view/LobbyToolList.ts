module lobby.view {
	export class LobbyToolList extends egret.DisplayObjectContainer {

		private btn_refresh;				//刷新视讯
		private btn_sd;						//标清模式
		private btn_hd;						//高清模式
		private btn_channel;				//频道选择
		private btn_detail;					//桌子详情
		private btn_fullscreen;				//全屏显示
		private btn_exit_fullscreen;		//退出全屏
		private btn_personal_info;			//玩家信息
		private btn_record;					//账户记录
		private btn_other;					//其他功能
		private btn_setting;				//系统设置
		private btn_exit;					//退出游戏、退出大厅

		public constructor() {
			super();

			this.btn_refresh = new ui.button.Button_Refresh();
			this.addChild(this.btn_refresh);

			let cut_off_line_0 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_0);
			cut_off_line_0.x = 45;
			cut_off_line_0.y = 1;
			
			this.btn_sd = new ui.button.Button_SD();
			this.addChild(this.btn_sd);
			this.btn_sd.x = 65;
			this.btn_sd.y = 0;

			this.btn_hd = new ui.button.Button_HD();
			// this.addChild(this.btn_hd);
			this.btn_hd.x = 65;
			this.btn_hd.y = 0;

			let cut_off_line_1 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_1);
			cut_off_line_1.x = 110;
			cut_off_line_1.y = 1;

			this.btn_channel = new ui.button.Button_Channel();
			this.addChild(this.btn_channel);
			this.btn_channel.x = 130;
			this.btn_channel.y = 0;

			let cut_off_line_2 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_2);
			cut_off_line_2.x = 175;
			cut_off_line_2.y = 1;

			this.btn_detail = new ui.button.Button_Detail();
			this.addChild(this.btn_detail);
			this.btn_detail.x = 196;
			this.btn_detail.y = 1;

			let cut_off_line_3 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_3);
			cut_off_line_3.x = 240;
			cut_off_line_3.y = 1;

			this.btn_fullscreen = new ui.button.Button_FullScreen();
			this.addChild(this.btn_fullscreen);
			this.btn_fullscreen.x = 261;
			this.btn_fullscreen.y = 1;

			this.btn_exit_fullscreen = new ui.button.Button_Exit_FullScreen();
			// this.addChild(this.btn_exit_fullscreen);
			this.btn_exit_fullscreen.x = 261;
			this.btn_exit_fullscreen.y = 1;

			let cut_off_line_4 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_4);
			cut_off_line_4.x = 304;
			cut_off_line_4.y = 1;

			this.btn_personal_info = new ui.button.Button_PersonInfo();
			this.addChild(this.btn_personal_info);
			this.btn_personal_info.x = 326;
			this.btn_personal_info.y = 0;

			let cut_off_line_5 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_5);
			cut_off_line_5.x = 369;
			cut_off_line_5.y = 1;

			this.btn_record = new ui.button.Button_Record();
			this.addChild(this.btn_record);
			this.btn_record.x = 389;
			this.btn_record.y = 0;

			let cut_off_line_6 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_6);
			cut_off_line_6.x = 430;
			cut_off_line_6.y = 1;

			this.btn_other = new ui.button.Button_Other();
			this.addChild(this.btn_other);
			this.btn_other.x = 451;
			this.btn_other.y = 0;

			let cut_off_line_7 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_7);
			cut_off_line_7.x = 495;
			cut_off_line_7.y = 1;

			this.btn_setting = new ui.button.Button_Setting();
			this.addChild(this.btn_setting);
			this.btn_setting.x = 516;
			this.btn_setting.y = 0;

			let cut_off_line_8 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_8);
			cut_off_line_8.x = 554;
			cut_off_line_8.y = 1;

			this.btn_exit = new ui.button.Button_Exit();
			this.addChild(this.btn_exit);
			this.btn_exit.x = 573;
			this.btn_exit.y = 0;
			
			// console.log("toollist初始化完成...");
			// console.log(this.width);
			// console.log(".........................");
		}
	}
}
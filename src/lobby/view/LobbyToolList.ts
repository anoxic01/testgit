module lobby.view {
	export class LobbyToolList extends BSprite {
		private m_mcAsset				;							//美术资源
		
		private m_btnRefresh			:	ui.button.SingleButtonMC;				//重整视讯
		
		private m_btnResolution			:	Resolution;					//分辨率
		private m_btnChannel			:	ui.button.SingleButtonMC;				//频道选择
		private m_btnPersonalInfomation	:	ui.button.SingleButtonMC;				//个人资讯
		private m_btnContact			:	ui.button.SingleButtonMC;				//联系客服
		private m_btnFull				:	ui.button.SingleButtonMC;				//全屏按钮
		private m_btnNormal				:	ui.button.SingleButtonMC;				//退出全屏
		private m_btnDetail				:	ui.button.SingleButtonMC;				//桌子详情
		private m_btnRecord				:	ui.button.SingleButtonMC;				//账户记录
		private m_btnSetting			:	ui.button.SingleButtonMC;				//设置按钮
		public btnExit					:	ui.button.SingleButtonMC;				//退出按钮
		
		public fRefresh					:	Function;					//重整视讯
		public fDetail					:	Function;					//桌子详情
		public fExitGame				:	Function;					//退出游戏
		
		public iExitLevel				:	number;						//退出等级	0-大厅，1-游戏
//		public wifi						:	Tool_Wifi;					//网络信号
		public toolContact				:	tool.Tool_Contact;				//联系客服
		private m_bmpBg					;							//功能列背景
		private m_spParent				:	egret.Sprite;						//外部容器
		
		private m_currentResolution		:	number;						//当前模式
		
		private m_mcHint				;					//全屏提示
		private m_mcHintFull			;
		private m_btnHintClose			:	ui.button.SingleButtonMC;				//关闭按钮
		private m_mcHintLabel			:	egret.MovieClip;					//提示标签
		private m_bHint					:	number;					//提示状态
		public iMode					:	number;						//当前模式

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

			let cut_off_line_0 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
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

			let cut_off_line_1 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_1);
			cut_off_line_1.x = 110;
			cut_off_line_1.y = 1;

			this.btn_channel = new ui.button.Button_Channel();
			this.addChild(this.btn_channel);
			this.btn_channel.x = 130;
			this.btn_channel.y = 0;

			let cut_off_line_2 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_2);
			cut_off_line_2.x = 175;
			cut_off_line_2.y = 1;

			this.btn_detail = new ui.button.Button_Detail();
			this.addChild(this.btn_detail);
			this.btn_detail.x = 196;
			this.btn_detail.y = 1;

			let cut_off_line_3 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
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

			let cut_off_line_4 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_4);
			cut_off_line_4.x = 304;
			cut_off_line_4.y = 1;

			this.btn_personal_info = new ui.button.Button_PersonInfo();
			this.addChild(this.btn_personal_info);
			this.btn_personal_info.x = 326;
			this.btn_personal_info.y = 0;

			let cut_off_line_5 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_5);
			cut_off_line_5.x = 369;
			cut_off_line_5.y = 1;

			this.btn_record = new ui.button.Button_Record();
			this.addChild(this.btn_record);
			this.btn_record.x = 389;
			this.btn_record.y = 0;

			let cut_off_line_6 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_6);
			cut_off_line_6.x = 430;
			cut_off_line_6.y = 1;

			this.btn_other = new ui.button.Button_Other();
			this.addChild(this.btn_other);
			this.btn_other.x = 451;
			this.btn_other.y = 0;

			let cut_off_line_7 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_7);
			cut_off_line_7.x = 495;
			cut_off_line_7.y = 1;

			this.btn_setting = new ui.button.Button_Setting();
			this.addChild(this.btn_setting);
			this.btn_setting.x = 516;
			this.btn_setting.y = 0;

			let cut_off_line_8 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
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

		
		public destroy():void
		{
			
			if(this.fExitGame!=null){
				this.fExitGame = null;
			}
			
			if(this.m_btnPersonalInfomation){
				this.m_btnPersonalInfomation.destroy();
				this.m_btnPersonalInfomation = null;
			}
			
			if(this.m_btnRecord){
				this.m_btnRecord.destroy();
				this.m_btnRecord = null;
			}
			
			if(this.m_btnContact){
				this.m_btnContact.destroy();
				this.m_btnContact = null;
			}
			
			if(this.toolContact){
				this.toolContact.destroy();
				this.toolContact = null;
			}
			
			if(this.m_mcAsset){
				if(this.m_mcAsset.parent){
					this.m_mcAsset.parent.removeChild(this.m_mcAsset);
				}
				this.m_mcAsset = null;
			}
			if( this.m_bmpBg ){
				if( this.m_bmpBg.parent ) {
					this.m_bmpBg.parent.removeChild( this.m_bmpBg );
				}
//				m_bmpBg.dispose();
				this.m_bmpBg = null;
			}
			if(this.m_spParent){
				this.m_spParent = null;
			}
			
		}
		
		public cleanGameFun():void{
			this.fRefresh=null;
			this.fDetail=null;
			this.fExitGame=null;
		}
		
		
		public resize():void{
			if(this.m_mcAsset){
				this.m_mcAsset.x = manager.LobbyManager.getInstance().stage.stageWidth - 630;
				this.m_mcAsset.y = 0;
			}
		}
		
		public getView():egret.Sprite{
			return this.m_mcAsset as egret.Sprite;
		}
		
		public toLobby():void{
		
//			manager.LobbyManager.getInstance().videoMaxBytePerSecond = manager.LobbyManager.getInstance().lobbyView.liveVideo;
			if( this.m_bmpBg ){
				if( this.m_bmpBg.parent){
					this.m_bmpBg.parent.removeChild( this.m_bmpBg );
				}
//				m_bmpBg.dispose();
				this.m_bmpBg = null;
			}
			
//			m_mcAsset.mc_bg.visible = false;
			
			this.m_btnRefresh.visible = false;
			this.m_mcAsset.mc_0.visible = false;
			this.m_btnResolution.visible = false;
			this.m_mcAsset.mc_1.visible = false;
			this.m_btnChannel.visible = false;
			this.m_mcAsset.mc_2.visible = false;
			this.m_btnDetail.visible = false;
			this.m_btnRecord.visible=true;
			
			for (var i:number = 3; i < 9; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = true;
			}
			
			if(manager.LobbyManager.getInstance().lobbyView.advertisement){
				manager.LobbyManager.getInstance().lobbyView.advertisement.start();
			}
			if(this.m_bHint){
				this.showHint();
			}else{
				this.hideHint();
			}
			
//			m_mcAsset.mc_wifi.visible = true;
			this.m_mcAsset.mc_8.visible = true;
			
			var uInitX:	number	=	45;
			var uW : number = 65;
			var uY : number = 0;
			this.m_mcAsset.mc_refresh.x = 0;
			this.m_mcAsset.mc_refresh.y = uY;
			
			this.m_btnResolution.x = uW;
			this.m_btnResolution.y = uY;
			
			
			this.m_mcAsset.mc_channel.x = uW*2;
			this.m_mcAsset.mc_channel.y = uY;
			
			
			this.m_mcAsset.mc_detail.x = uW*3;
			this.m_mcAsset.mc_detail.y = uY;
			
			this.m_mcAsset.mc_full.x = uW*4;
			this.m_mcAsset.mc_full.y = uY;
			this.m_mcAsset.mc_normal.x = uW*4;
			this.m_mcAsset.mc_normal.y = uY;
			
			this.m_mcAsset.mc_personal.x = uW*5;
			this.m_mcAsset.mc_personal.y = uY;
			
			this.m_mcAsset.mc_record.x = uW*6;
			this.m_mcAsset.mc_record.y = uY;
			
			this.m_mcAsset.mc_contact.x = uW*7;
			this.m_mcAsset.mc_contact.y = uY;
			this.m_mcAsset.mc_contact_view.x = uW*6;
			this.m_mcAsset.mc_contact_view.y = 55;
			
			this.m_mcAsset.mc_setting.x = uW*8;
			this.m_mcAsset.mc_setting.y = uY;
			
			this.m_mcAsset.mc_exit.x = uW*9;
			this.m_mcAsset.mc_exit.y = uY;
			
			this.m_mcAsset.mc_0.x = uInitX;
			this.m_mcAsset.mc_1.x = uInitX + uW;
			this.m_mcAsset.mc_2.x = uInitX + uW*2;
			this.m_mcAsset.mc_3.x = uInitX + uW*3;
			this.m_mcAsset.mc_4.x = uInitX + uW*4;
			this.m_mcAsset.mc_5.x = uInitX + uW*5;
			this.m_mcAsset.mc_6.x = uInitX + uW*6;
			this.m_mcAsset.mc_7.x = uInitX + uW*7;
			this.m_mcAsset.mc_8.x = uInitX + uW*8;
			
			this.m_mcAsset.mc_0.y = 1;
			this.m_mcAsset.mc_1.y = 1;
			this.m_mcAsset.mc_2.y = 1;
			this.m_mcAsset.mc_3.y = 1;
			this.m_mcAsset.mc_4.y = 1;
			this.m_mcAsset.mc_5.y = 1;
			this.m_mcAsset.mc_6.y = 1;
			this.m_mcAsset.mc_7.y = 1;
			this.m_mcAsset.mc_8.y = 1;
			
			this.resize();
		}
		
		//个人资讯
		public getBtnDetailPoint():egret.Point{
			var point:egret.Point = this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_detail.x+15,this.m_mcAsset.mc_detail.y+30));;
			return point;
		}
		
		//频道
		public getBtnChannelPoint():egret.Point{
			var point:egret.Point = this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_channel.x+15,this.m_mcAsset.mc_channel.y+30));;
			return point;
		}
		
		//系统设置
		public getBtnSettingPoint():egret.Point{
			var point:egret.Point = this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_setting.x+15,this.m_mcAsset.mc_setting.y+30));;
			return point;
		}
		
		public toGame(_fQuality:Function, _fRefresh:Function, _fDetail:Function, _fExit:Function,isMachine=false):void{
			if(this.fRefresh!=null){
				this.fRefresh = null;
			}
			if(this.fDetail!=null){
				this.fDetail = null;
			}
			if(this.fExitGame!=null){
				this.fExitGame = null;
			}
			
			manager.LobbyManager.getInstance().lobbyView.advertisement.stop();
			this.hideHint();
			
			this.fRefresh = _fRefresh;
			this.fExitGame = _fExit;
			this.fDetail = _fDetail;
			
			if( !this.m_bmpBg ){
				this.m_bmpBg = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Tool_Bg_Asset");
				this.m_bmpBg.width = 657;
				this.m_bmpBg.height = 55;
				this.m_mcAsset.addChildAt(this.m_bmpBg,0);
				this.m_bmpBg.x = -25;
				this.m_bmpBg.y = -15;
				
			}
			
		
				this.m_bmpBg.visible=true;
			
			
//			m_mcAsset.mc_bg.visible = true;
			this.m_btnRefresh.visible = true;
			this.m_btnResolution.visible = true;
			this.m_btnChannel.visible = true;
			this.m_btnDetail.visible = true;
//			m_btnQulity.visible = true;
			
			for (var i: number = 0 ; i < 9; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = true;
			}
			
			var uInitX:	number	=	45;
			var uW : number = 65;
			var uY : number = 0;
			this.m_mcAsset.mc_refresh.x = 0;
			this.m_mcAsset.mc_refresh.y = uY;
			
			this.m_btnResolution.x = uW;
			this.m_btnResolution.y = uY;
			
			
			this.m_mcAsset.mc_channel.x = uW*2;
			this.m_mcAsset.mc_channel.y = uY;
			
			
			this.m_mcAsset.mc_detail.x = uW*3;
			this.m_mcAsset.mc_detail.y = uY;
			
			this.m_mcAsset.mc_full.x = uW*4;
			this.m_mcAsset.mc_full.y = uY;
			this.m_mcAsset.mc_normal.x = uW*4;
			this.m_mcAsset.mc_normal.y = uY;
			
			this.m_mcAsset.mc_personal.x = uW*5;
			this.m_mcAsset.mc_personal.y = uY;
			
			this.m_mcAsset.mc_record.x = uW*6;
			this.m_mcAsset.mc_record.y = uY;
			
			this.m_mcAsset.mc_contact.x = uW*7;
			this.m_mcAsset.mc_contact.y = uY;
			this.m_mcAsset.mc_contact_view.x = uW*6;
			this.m_mcAsset.mc_contact_view.y = 55;
			
			this.m_mcAsset.mc_setting.x = uW*8;
			this.m_mcAsset.mc_setting.y = uY;
			
			this.m_mcAsset.mc_exit.x = uW*9;
			this.m_mcAsset.mc_exit.y = uY;
			
			this.m_mcAsset.mc_0.x = uInitX;
			this.m_mcAsset.mc_1.x = uInitX + uW;
			this.m_mcAsset.mc_2.x = uInitX + uW*2;
			this.m_mcAsset.mc_3.x = uInitX + uW*3;
			this.m_mcAsset.mc_4.x = uInitX + uW*4;
			this.m_mcAsset.mc_5.x = uInitX + uW*5;
			this.m_mcAsset.mc_6.x = uInitX + uW*6;
			this.m_mcAsset.mc_7.x = uInitX + uW*7;
			this.m_mcAsset.mc_8.x = uInitX + uW*8;
			
			this.m_mcAsset.mc_0.y = 1;
			this.m_mcAsset.mc_1.y = 1;
			this.m_mcAsset.mc_2.y = 1;
			this.m_mcAsset.mc_3.y = 1;
			this.m_mcAsset.mc_4.y = 1;
			this.m_mcAsset.mc_5.y = 1;
			this.m_mcAsset.mc_6.y = 1;
			this.m_mcAsset.mc_7.y = 1;
			this.m_mcAsset.mc_8.y = 1;
			
			if(isMachine){
				if(this.m_mcAsset){
					this.m_mcAsset.x = manager.LobbyManager.getInstance().stage.stageWidth - 630 - 268;
					this.m_mcAsset.y = 37;
					manager.LobbyManager.getInstance().lobbyView.setMachineMask();
				}
			}else{
				this.resize();
			}
			
			if(this.m_bHint && this.m_mcHintFull){
				setTimeout(function():void{
					this.m_mcHintFull.gotoAndPlay(1);
				},5)
			}
		}
		
		public toMulti():void{
			if( this.m_bmpBg ){
				if( this.m_bmpBg.parent){
					this.m_bmpBg.parent.removeChild( this.m_bmpBg );
				}
//				m_bmpBg.dispose();
				this.m_bmpBg = null;
			}
			this.m_btnRefresh.visible = false;
			this.m_mcAsset.mc_0.visible = false;
			this.m_btnResolution.visible = false;
			this.m_mcAsset.mc_1.visible = false;
			this.m_btnChannel.visible = false;
			this.m_mcAsset.mc_2.visible = false;
			this.m_btnDetail.visible = false;
//			m_mcAsset.mc_wifi.visible = false;
			this.m_mcAsset.mc_8.visible = false;
			
			for (var i: number = 3 ; i < 8; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = true;
			}
			
			manager.LobbyManager.getInstance().lobbyView.advertisement.stop();
			this.hideHint();
			
			var iInitX : number = 340;
			var uW : number = 50;
			var uY : number = 0;
//			m_mcAsset.mc_wifi.x = iInitX;
//			m_mcAsset.mc_wifi.y = uY;
			
			this.m_mcAsset.mc_full.x = iInitX;
			this.m_mcAsset.mc_full.y = uY;
			this.m_mcAsset.mc_normal.x = iInitX;
			this.m_mcAsset.mc_normal.y = uY;
			
			this.m_mcAsset.mc_personal.x = iInitX+uW;
			this.m_mcAsset.mc_personal.y = uY;
			
			this.m_mcAsset.mc_record.x = iInitX+uW*2;
			this.m_mcAsset.mc_record.y = uY;
			
			this.m_mcAsset.mc_contact.x = iInitX+uW*3;
			this.m_mcAsset.mc_contact.y = uY;
			
			this.m_mcAsset.mc_contact_view.x = iInitX+uW*2;
			this.m_mcAsset.mc_contact_view.y = 55;
			
			this.m_mcAsset.mc_setting.x = iInitX+uW*4;
			this.m_mcAsset.mc_setting.y = uY;
			
			this.m_mcAsset.mc_exit.x = iInitX+uW*5;
			this.m_mcAsset.mc_exit.y = uY;
			
			this.m_mcAsset.mc_3.x = iInitX + uW  - 10;
			this.m_mcAsset.mc_4.x = iInitX + uW*2 - 10;
			this.m_mcAsset.mc_5.x = iInitX + uW*3 - 10;
			this.m_mcAsset.mc_6.x = iInitX + uW*4 - 10;
			this.m_mcAsset.mc_7.x = iInitX + uW*5 - 10;
			this.m_mcAsset.mc_8.x = iInitX + uW*6 - 10;
			
			this.m_mcAsset.mc_3.y = 2;
			this.m_mcAsset.mc_4.y = 2;
			this.m_mcAsset.mc_5.y = 2;
			this.m_mcAsset.mc_6.y = 2;
			this.m_mcAsset.mc_7.y = 2;
			this.m_mcAsset.mc_8.y = 2;
			
			this.resize();
			
			if(this.m_bHint && this.m_mcHintFull){
				setTimeout(function():void{
					this.m_mcHintFull.gotoAndPlay(1);
				},5)
			}
		}
		
		public toMachine(_fQuality:Function, _fRefresh:Function, _fDetail:Function, _fExit:Function):void{
			if (this.m_bmpBg){
				this.m_bmpBg.visible=false;
			}
			if(this.fRefresh!=null){
				this.fRefresh = null;
			}
			if(this.fDetail!=null){
				this.fDetail = null;
			}
			if(this.fExitGame!=null){
				this.fExitGame = null;
			}
			
			manager.LobbyManager.getInstance().lobbyView.advertisement.stop();
			this.hideHint();
			
			this.fRefresh = _fRefresh;
			this.fExitGame = _fExit;
			this.fDetail = _fDetail;
			this.hideHint();
			
			this.m_btnRefresh.visible = true;
			this.m_btnResolution.visible = true;
			this.m_btnChannel.visible = true;
			this.m_btnDetail.visible = true;
			
			for (var i: number = 0; i < 9; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = false;
			}
			
			
			
			
			var _nY : number = 23;
			var _nY2 : number = 70;
			var _nX	 : number = 410;
			var _offX: number = 40;
			
			//第一列組件
			
			this.m_mcAsset.mc_full.x = _nX;
			this.m_mcAsset.mc_full.y = _nY;
			
			this.m_mcAsset.mc_normal.x = this.m_mcAsset.mc_full.x;
			this.m_mcAsset.mc_normal.y = this.m_mcAsset.mc_full.y;
			
			this.m_mcAsset.mc_personal.x = _nX + _offX;
			this.m_mcAsset.mc_personal.y = _nY;
			
			this.m_mcAsset.mc_contact.x	= _nX + _offX*2;
			this.m_mcAsset.mc_contact.y	= _nY;
			
			this.m_mcAsset.mc_contact_view.x = _nX + 20;
			this.m_mcAsset.mc_contact_view.y = _nY+55;			
			
			this.m_mcAsset.mc_setting.x	= _nX + _offX*3;
			this.m_mcAsset.mc_setting.y	= _nY;
			
			this.m_mcAsset.mc_exit.x		= _nX + _offX*4;
			this.m_mcAsset.mc_exit.y		= _nY;
			
			//第二列組件
			this.m_mcAsset.mc_refresh.x	= _nX;
			this.m_mcAsset.mc_refresh.y	= _nY2;
//			m_mcAsset.mc_quality.x	= m_mcAsset.mc_personal.x;
//			m_mcAsset.mc_quality.y	= _nY2 + 2;

			this.m_btnResolution.x = this.m_mcAsset.mc_personal.x;
			this.m_btnResolution.y = _nY2;

			this.m_mcAsset.mc_detail.x	= this.m_mcAsset.mc_contact.x;
			this.m_mcAsset.mc_detail.y	= _nY2;
			
			this.m_mcAsset.mc_channel.x	= this.m_mcAsset.mc_setting.x;
			this.m_mcAsset.mc_channel.y	= _nY2;	
			
			this.m_mcAsset.mc_record.x	= this.m_mcAsset.mc_exit.x;
			this.m_mcAsset.mc_record.y	= _nY2;	
		}
		
		public onChangeLanguage():void{
			if(this.toolContact){
				this.toolContact.onChangeLanguage();
			}
			if(this.m_mcHintLabel){
				this.m_mcHintLabel.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
				
		
		
		public screenFull(_bValue:boolean):void{
			this.m_btnNormal.visible = _bValue;
			this.m_btnFull.visible = !_bValue;
		}
		
		public changeResolution():void{
			this.m_btnResolution.changeResolution();
		}
		
		
		get currentResolution(): number
		{
			return this.m_currentResolution;
		}
		
		set currentResolution(value: number)
		{
			this.m_currentResolution = value;
		}
		
		public setBtnChannelValue(_uValue: number):void{
			if(this.m_mcAsset){
				if(_uValue>4){
					_uValue = 5;
					console.log(this, "频道设置异常。。。");
				}
				(this.m_mcAsset.mc_channel.mc_label as egret.MovieClip).gotoAndStop(_uValue);
			}
		}
		
		public setData():void{
			if(manager.SharedObjectManager.getResolution()==null){
				if(lobby.model.LobbyData.getInstance().lobbyInfo.currentResolution)
				{
					this.currentResolution = lobby.model.LobbyData.getInstance().lobbyInfo.currentResolution.PriorityNo;
				}
			}else{
				this.currentResolution = manager.SharedObjectManager.getResolution().PriorityNo;
			}
			this.m_btnResolution.setData();
			this.m_btnResolution.visible = false;
		}
		
		
		private initHint():void{
			this.m_mcHint = this.m_mcAsset.mc_hint;
			this.m_mcHintLabel =this. m_mcHint.mc_label;
			if(this.m_mcHintLabel){
				this.m_mcHintLabel.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			this.m_btnHintClose = new ui.button.SingleButtonMC(this.m_mcHint.mc_close,function():void{
//				m_mcHint.removeEventListener(mouse.MouseEvent.MOUSE_OVER, hintOver);
//				m_mcHint.removeEventListener(mouse.MouseEvent.MOUSE_OUT, hintOut);
//				m_mcHint.gotoAndStop(1);
				if(this.m_mcHint.parent){
					this.m_mcHint.parent.removeChild(this.m_mcHint);
				}
				this.m_mcHint = null;
			});
//			m_mcHint.gotoAndPlay(1);
//			
//			var hintOver : = function():void{
//				m_mcHint.gotoAndStop(m_mcHint.currentFrame);
//			};
//			
//			var hintOut : = function():void{
//				m_mcHint.gotoAndPlay(m_mcHint.currentFrame);
//			};
//			
//			m_mcHint.addEventListener(mouse.MouseEvent.MOUSE_OVER, hintOver);
//			m_mcHint.addEventListener(mouse.MouseEvent.MOUSE_OUT, hintOut);
			
		}
		private showHint():void{
			if(this.m_mcHint){
//				m_mcHint.gotoAndPlay(1);
				this.m_mcHint.visible = true;
			}
			if(this.m_mcHintFull){
				this.m_mcHintFull.gotoAndPlay(1);
			}
		}
		private hideHint():void{
			if(this.m_mcHint){
//				m_mcHint.gotoAndStop(1);
				this.m_mcHint.visible = false;
			}
			if(this.m_mcHintFull){
				this.m_mcHintFull.gotoAndStop(1);
			}
		}
		
	}

	export class Resolution{
	private m_btnSD					:	ui.button.SingleButtonMC;				//标清频道
	private m_btnHD					:	ui.button.SingleButtonMC;				//高清频道
	private m_btnCurrent			:	ui.button.SingleButtonMC;
	private m_mcAsset				;
	
	public constructor(_mcAsset){
		this.m_mcAsset = _mcAsset;
		
		this.m_btnSD = new ui.button.SingleButtonMC(_mcAsset.mc_sd, function(evt:MouseEvent):void{
			
			if(manager.LobbyManager.getInstance().IsLiveConnected()){
				manager.LobbyManager.getInstance().bClickResolution = true;
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			manager.TipManager.getInstance().hide();

			manager.LobbyManager.getInstance().lobbyView.toolView.currentResolution = define.Define.HD;
			
			manager.SharedObjectManager.setResolution(lobby.model.LobbyData.getInstance().lobbyInfo.getResolutionByIndex(define.Define.HD));
			manager.SharedObjectManager.flush();
			
			this.changeResolution();
			
			if(manager.LobbyManager.getInstance().fChangChannel != null){
				manager.LobbyManager.getInstance().fChangChannel();
			}
			
			manager.LobbyManager.getInstance().hideChannel();
			manager.LobbyManager.getInstance().hidePanelDetail();
			manager.LobbyManager.getInstance().hidePersonalInformation();
			manager.LobbyManager.getInstance().lobbyView.toolView.toolContact.hide();
		});
		this.m_btnSD.fOnOver = function():void{
			manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_SD),manager.TipManager.UP, this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_sd.x+15, this.m_mcAsset.mc_sd.y+30)),1);
		};
		this.m_btnSD.fOnOut = function():void{
			manager.TipManager.getInstance().hide();
		};
		this.m_btnSD.visible = false;
		
		this.m_btnHD = new ui.button.SingleButtonMC(_mcAsset.mc_hd, function(evt:MouseEvent):void{
			
			if(manager.LobbyManager.getInstance().IsLiveConnected()){
				manager.LobbyManager.getInstance().bClickResolution = true;
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			manager.TipManager.getInstance().hide();
			
			manager.LobbyManager.getInstance().lobbyView.toolView.currentResolution = define.Define.SD;
			
			manager.SharedObjectManager.setResolution(lobby.model.LobbyData.getInstance().lobbyInfo.getResolutionByIndex(define.Define.SD));
			manager.SharedObjectManager.flush();
			
			this.changeResolution();
			
			if(manager.LobbyManager.getInstance().fChangChannel != null){
				manager.LobbyManager.getInstance().fChangChannel();
			}
			
			manager.LobbyManager.getInstance().hideChannel();
			manager.LobbyManager.getInstance().hidePanelDetail();
			manager.LobbyManager.getInstance().hidePersonalInformation();
			manager.LobbyManager.getInstance().lobbyView.toolView.toolContact.hide();
		});
		this.m_btnHD.fOnOver = function():void{
			manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_HD),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_hd.x+15,this.m_mcAsset.mc_hd.y+30)),1);
		};
		this.m_btnHD.fOnOut = function():void{
			manager.TipManager.getInstance().hide();
		};
		this.m_btnHD.visible = false;
		
		
	}
	
	public setData():void{
		this.changeResolution();
	}
	
	 set visible(_bValue:boolean){
		if(this.m_btnCurrent){
			this.m_btnCurrent.visible = _bValue;
		}
		
		if(!_bValue){
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
		}else{
			this.IsQualified();
		}
	}
	
	set x(_iValue: number){
		this.m_mcAsset.mc_sd.x = _iValue;
		this.m_mcAsset.mc_hd.x = _iValue;
	}
	
	set y(_iValue: number){
		this.m_mcAsset.mc_sd.y = _iValue;
		this.m_mcAsset.mc_hd.y = _iValue;
	}
	
	public IsQualified():Boolean{
		//检测视讯解析度资料笔数和priorityNo是否正确
		var data = lobby.model.LobbyData.getInstance().lobbyInfo.vecResolutionList;
		if(!data || data.length != 3){//解析度資料筆數必须为3筆
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
			return false;
		}
		
		if(data[0].PriorityNo != 1 || data[1].PriorityNo != 2 || data[2].PriorityNo != 3){//PriorityNo必须为1~3
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
			return false;
		}
		
		return true;
	}
	
	public changeResolution():void{
		if(!this.IsQualified()){
			return;
		}
		
		if( manager.SharedObjectManager.getResolution() == null ){
			
			if(lobby.model.LobbyData.getInstance().lobbyInfo.currentResolution)
			{
				switch(lobby.model.LobbyData.getInstance().lobbyInfo.currentResolution.PriorityNo){
					case define.Define.HD:
						this.m_btnCurrent = this.m_btnHD;
						this.m_btnCurrent.visible = true;
						this.m_btnSD.visible = false;
						break;
					
					case define.Define.SD:
						this.m_btnCurrent = this.m_btnSD;
						this.m_btnCurrent.visible = true;
						this.m_btnHD.visible = false;
						break;
				}
			}
			
		}else{
			switch(manager.SharedObjectManager.getResolution().PriorityNo){
				case define.Define.HD:
					this.m_btnCurrent = this.m_btnHD;
					this.m_btnCurrent.visible = true;
					this.m_btnSD.visible = false;
					break;
				
				case define.Define.SD:
					this.m_btnCurrent = this.m_btnSD;
					this.m_btnCurrent.visible = true;
					this.m_btnHD.visible = false;
					break;
			}
		}
		
		if(manager.LobbyManager.getInstance().exitLevel!=define.Define.EXIT_GAME){
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
		}
		
	}
}
}


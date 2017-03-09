module lobby.view {
	export class LobbyView extends egret.DisplayObjectContainer {

		public spMainLayer				:	egret.Sprite;							//主类容器
		public spTableLayer				:	egret.Sprite;							//房间容器
		public spTelLobbyLayer			:	egret.Sprite;							//電投容器
		public spGameLayer				:	egret.Sprite;							//游戏容器
		public spGame					:	game.SpGame;							//游戏容器
		public spTweenGame				:	egret.Sprite;							//游戏退出
		public spMultiTableLayer		:	egret.Sprite;							//多桌容器
		public spQuickLayer				:	egret.Sprite;							//转桌列表
		private m_spQuickLayerMask		:	egret.Sprite;							//转桌遮罩
		public spToolLayer				:	egret.Sprite;							//功能列
		public spShieldLayer			:	egret.Sprite;							//屏蔽层
		public spChipLayer				:	egret.Sprite;							//自订筹码
		public spChipMask				:	egret.Sprite;							//筹码遮罩
		public spPanelChip				:	egret.Sprite;							//筹码面板
		public spWindowLayer			:	egret.Sprite;							//窗口容器
		private m_spWindowMask			:	egret.Sprite;							//窗口遮罩
		public spTextLayer				:	egret.Sprite;							//文本容器
		public spAnimationLayer			:	egret.Sprite;							//动画容器
		public spWarn					:	egret.Sprite;							//警告窗口
		
//		private var m_bmpBanner				:	Bitmap;							//过渡广告
		public spUrgentNotice			:	egret.Sprite;							//紧急公告
		
		private m_stage					:	egret.Stage;							//舞台引用
		
		private m_lobbyViewAsset		;								//美术资源
		public information				:	LobbyInformation;				//个人资讯
		public toolView					:	LobbyToolList;							//功能列表
		public themeList				:	theme.ThemeList;						//大厅类别
		public liveVideo				:	lives.LiveVideo;						//直播视讯
		public advertisement			:	advertisements.Advertisement;					//广告区域
		public quickThemeList			:	theme.QuickThemeList;					//快速转桌
		
//		public urgentNotice				:	UrgentNoticeList;				//紧急公告
//		public urgentNotice_game		:	UrgentNoticeList;				//游戏中使用
		public noticeMgr				:	notice.NoticeManeger;
		
		public vecTablesFront			:	table.Table[];					//前页列表
		public vecTablesCurrent			:	table.Table[];					//当前列表
		public vecTablesNext			:	table.Table[];					//下页列表
		public spTableListFront			:	egret.Sprite;							//前页列表
		private m_spTableListMask		:	egret.Sprite;							//维护遮罩
		public spTableListCurrent		:	egret.Sprite;							//当前列表
		public spTableListNext			:	egret.Sprite;							//下页列表
		private m_spTableListFake		:	egret.Sprite;							//假的桌子
		private m_spTableListTransition	:	egret.Sprite;							//过渡动画
		public scroll_current 			:	eui.Scroller;
		public scroll_Front 			:	eui.Scroller;
		public scroll_Next	 			:	eui.Scroller;
		
//		public mobileApp				:	MobileAppManager				//手机客户端面板
//		
		public vecQuickTables			:	quick.QuickTable[];			//所有桌子
		
//		private m_vectorThemeList		:	Vector.<Sprite>;				//房间列表
		public uCurrentThemeID			:	number;							//当前列表
		public uCurrentThemeIDTemp		:	number;							
		
//		private m_vecSpQuickList		:	Vector.<Sprite>;				//房间列表
		public quickTableList			:	quick.QuickTableList;					//
//		public iCurrentQuick			:	number	=	255;					//当前列表
		public scroll_quick 			:	eui.Scroller;
		
		private m_vecFrame				:	BFrame[];				//enterframe对象
		private m_frameLen				:	number;							//数组长度
		
		public mouseFollow				:	other.MouseFollow;					//筹码跟随鼠标
		
//		private m_iComplete				:	number;							//缓动完成次数
		
//		private m_bmpSnapshot			:	Bitmap;							//截屏
		private m_iSnapshotX			:	number	=	-16;
		private m_iSnapshotY			:	number	=	400;
//		private m_bmpTableList			:	Bitmap;							//空桌列表
		private m_transition_4			:	egret.MovieClip;
//		private _transition				:	ThemeTransition;
		
		private m_iSpace				:	number	=	100;					//滚动间距
		public bWheelToTop				:	boolean;						//边界判断,厅馆列表到达顶部
//		private var m_bWheelToBottom		:	boolean;						//边界判断,厅馆列表到达底部
		private m_uScrollHeight			:	number;							//重绘高度
		private m_bResizeForUp			:	boolean;						//重绘状态,滚轮往上
		private m_bResizeForDown		:	boolean;						//重绘状态,滚轮往下
		private m_iWheelY				:	number	=	286;					//当前坐标
		
		protected m_lobbyAuth			:	lobby.data.LobbyAuth;
		
		
		private m_spLoading				:	egret.Sprite;
		private m_loading				:	egret.DisplayObjectContainer;								//加载图标
		private m_fLoadComplete			:	Function;
		
		private m_themeMaintain			:	windows.GameMsgWnd;						//厅馆维护
		
		public PhoneBetID				:	number;							//预设厅馆
		
		public constructor() {
			super();

			let lobbyAuth;
			lobbyAuth = new lobby.data.LobbyAuth();

			manager.LobbyManager.getInstance().initialize(lobbyAuth, this);

			this.information = new LobbyInformation();
			this.addChild(this.information);

			this.toolView = new lobby.view.LobbyToolList();
			this.addChild(this.toolView);
			// console.log(this.toolList.width);
			this.toolView.x = manager.LobbyManager.getInstance().stageW - 605;
			this.toolView.y = 15;

			this.advertisement = new advertisements.Advertisement();
			this.addChild(this.advertisement);
			this.advertisement.x = 0;
			this.advertisement.y = 56;

			this.liveVideo = new lives.LiveVideo();
			this.addChild(this.liveVideo);
			this.liveVideo.x = 1496;
			this.liveVideo.y = 56;

			this.themeList = new theme.ThemeList();
			this.addChild(this.themeList);
			this.themeList.x = 0;
			this.themeList.y = 296;

			
		}

		public initTableList( _spContent:egret.DisplayObjectContainer, _scroll:egret.DisplayObjectContainer, _vec:table.Table[], _iIndex:number, _bInit:boolean=true):void{
			// console.log("初始化桌子：>> ",System.totalMemory);
			// var time : number = getTimer();
			
			// _scroll.resize( 1920, m_uScrollHeight );
			
			//大厅列表
			let _themeVec : lobby.struct.Struct_Theme[] = lobby.data.LobbyData.getInstance().lobbyInfo.themeVec;
			let _tableVec : lobby.struct.Struct_Table[] = _themeVec[_iIndex].TableList;
			
			this.uCurrentThemeID = _themeVec[_iIndex].ThemeID;
			
			/** 试玩过滤 **/
			var bShow : boolean;
			
			var _tableVecLen : number = _tableVec.length;
			var _table : table.Table;
			var _tableStruct : lobby.struct.Struct_Table;
			for (var i:number = 0; i < _tableVecLen; i++) 
			{
				_tableStruct = _tableVec[i];
				switch(_tableStruct.GameID){
					case define.GameDefine.BAC:
						_table = new table.TableBaccarat();
						break;
					
					case define.GameDefine.SIC:
						_table = new table.TableSic();
						break;
					
					case define.GameDefine.ROU:
						_table = new table.TableRoulette();
						break;
					
					case define.GameDefine.DTF:
						_table = new table.TableDTF();
						break;
				}
				_table.visible = true;
				_table.setData(_tableStruct);
//				_table.cacheAsBitmap = true;
				_table.x = <number>((i%2)*950);
				_table.y = <number>(<number>(i/2)*281);
				_scroll.add(_table);
				_vec.push(_table);
				
//				if(themeList.currentTheme && themeList.currentTheme.struct.IsMaintaining){
//					_table.hideMaintain();
//				}
				
			}
			
			this.m_bResizeForUp = false;
			this.m_bResizeForDown = true;
			_spContent.addChild(_scroll);
			
			if(this.themeList.currentTheme){
				if(this.themeList.currentTheme.themeStruct.IsMaintaining){
					this.m_spTableListMask.graphics.clear();
					this.m_spTableListMask.graphics.beginFill(0x00000,0.5);
					this.m_spTableListMask.graphics.drawRoundRect(0,0,1900,1080,10,10);
					this.m_spTableListMask.graphics.endFill();
					this.m_spTableListMask.addChild(this.m_themeMaintain);
					this.showThemeMaintenance();
				}else{
					this.m_spTableListMask.graphics.clear();
					this.hideThemeMaintenance();
				}
			}
			
			if(_spContent.numChildren>1){
				console.log("子容器大于1&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			}
			
			if(this.m_transition_4){
				this.m_transition_4.visible = false;
			}
//			if(_transition)
//			{
//				_transition.removeFromParent();
//			}
			
			//恢复厅馆按钮
			this.themeList.enable(true);
			var _ve : struct.Struct_Theme[] = data.LobbyData.getInstance().lobbyInfo.themeVec;
			
			// console.log("初始桌子需要时间：",getTimer()-time, "********************************************************************************");
			
			if(_bInit){
				this.vecTablesCurrent = this.vecTablesFront;
			}
		}


		//厅馆维护
		public showThemeMaintenance():void{
			if(this.m_themeMaintain){
				this.m_spTableListMask.graphics.clear();
				this.m_spTableListMask.graphics.beginFill(0x000000,0.5);
				this.m_spTableListMask.graphics.drawRoundRect(0,0,2000,this.m_uScrollHeight,10,10);
				this.m_spTableListMask.graphics.endFill();
				this.m_spTableListMask.addChild(this.m_themeMaintain);
				
				this.m_themeMaintain.container = this.spTableListFront;
				this.m_themeMaintain.show(language.Language.sMaintain_Theme,true);
			}
		}
	
		public hideThemeMaintenance():void{
			if(this.m_themeMaintain){
				this.m_themeMaintain.hide();
				this.m_spTableListMask.graphics.clear();
			}
		}



	}
}
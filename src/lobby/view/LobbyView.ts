module lobby.view {
	export class LobbyView extends egret.DisplayObjectContainer {

		public spMainLayer				;							//主类容器
		public spTableLayer				;							//房间容器
		public spTelLobbyLayer			;							//電投容器
		public spGameLayer				;							//游戏容器
		public spGame					;							//游戏容器
		public spTweenGame				;							//游戏退出
		public spMultiTableLayer		;							//多桌容器
		public spQuickLayer				;							//转桌列表
		private m_spQuickLayerMask		;							//转桌遮罩
		public spToolLayer				;							//功能列
		public spShieldLayer			;							//屏蔽层
		public spChipLayer				;							//自订筹码
		public spChipMask				;							//筹码遮罩
		public spPanelChip				;							//筹码面板
		public spWindowLayer			;							//窗口容器
		private m_spWindowMask			;							//窗口遮罩
		public spTextLayer				;							//文本容器
		public spAnimationLayer			;							//动画容器
		public spWarn					;							//警告窗口
		
//		private m_bmpBanner				:	Bitmap;							//过渡广告
		public spUrgentNotice			;							//紧急公告
		
		private m_stage					;							//舞台引用
		
		private m_lobbyViewAsset		;								//美术资源
		public infomation				;				//个人资讯
		public toolView					;							//功能列表
		public themeList				;						//大厅类别
		public liveVideo				;						//直播视讯
		public advertisement			;					//广告区域
		public quickThemeList			;					//快速转桌
		
//		public urgentNotice				:	UrgentNoticeList;				//紧急公告
//		public urgentNotice_game		:	UrgentNoticeList;				//游戏中使用
		public noticeMgr				;
		
		public vecTablesFront			;					//前页列表
		public vecTablesCurrent			;					//当前列表
		public vecTablesNext			;					//下页列表
		public spTableListFront			;							//前页列表
		private m_spTableListMask		;							//维护遮罩
		public spTableListCurrent		;							//当前列表
		public spTableListNext			;							//下页列表
		private m_spTableListFake		;							//假的桌子
		private m_spTableListTransition	;							//过渡动画
		public scroll_current 			;
		public scroll_Front 			;
		public scroll_Next	 			;
		
//		public mobileApp				:	MobileAppManager				//手机客户端面板
//		
		public vecQuickTables			;			//所有桌子
		
//		private m_vectorThemeList		:	Vector.<Sprite>;				//房间列表
		public uCurrentThemeID			;							//当前列表
		public uCurrentThemeIDTemp		;							
		
//		private m_vecSpQuickList		:	Vector.<Sprite>;				//房间列表
		public quickTableList			;					//
//		public iCurrentQuick				=	255;					//当前列表
		public scroll_quick 			;
		
		private m_vecFrame				;				//enterframe对象
		private m_frameLen				;							//数组长度
		
		public mouseFollow				;					//筹码跟随鼠标
		
//		private m_iComplete				;							//缓动完成次数
		
//		private m_bmpSnapshot			:	Bitmap;							//截屏
		private m_iSnapshotX				=	-16;
		private m_iSnapshotY				=	400;
//		private m_bmpTableList			:	Bitmap;							//空桌列表
		private m_transition_4			;
//		private _transition				:	ThemeTransition;
		
		private m_iSpace					=	100;					//滚动间距
		public bWheelToTop				:	Boolean;						//边界判断,厅馆列表到达顶部
//		private m_bWheelToBottom		:	Boolean;						//边界判断,厅馆列表到达底部
		private m_uScrollHeight			;							//重绘高度
		private m_bResizeForUp			:	Boolean;						//重绘状态,滚轮往上
		private m_bResizeForDown		:	Boolean;						//重绘状态,滚轮往下
		private m_iWheelY					=	286;					//当前坐标
		
		protected m_lobbyAuth			;
		
		
		private m_spLoading				;
		private m_loading				;								//加载图标
		private m_fLoadComplete			:	Function;
		
		private m_themeMaintain			;						//厅馆维护
		
		public PhoneBetID				;							//预设厅馆
		
		public constructor(_stage, _fLoadComplete:Function, _PhoneBetID) {
			super();
//			this.alpha = 0;
			this.m_stage = _stage;
			this.m_fLoadComplete = _fLoadComplete;
			this.PhoneBetID = _PhoneBetID;
			
			this.loadAuth();
			
			// if(this.m_stage && this.m_stage.hasEventListener(StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY)==false){
			// 	this.m_stage.addEventListener(StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY, onStageVideoState);
			// }
			
			if(this.liveVideo){
				this.liveVideo.onAddToStage();
			}
			
		}

		// private onStageVideoState(event:StageVideoAvailabilityEvent):void       
		// {
		// 	manager.LobbyManager.getInstance().bStageVideoAvailable = Boolean(event.availability==StageVideoAvailability.AVAILABLE);
			
		// 	var vecRtmp : Vector.<RTMPPlayer> = model.LobbyData.getInstance().RtmpPlayers;
		// 	if(vecRtmp){
		// 		var len : int = vecRtmp.length;
		// 		for (var i:number = 0; i < len; i++) 
		// 		{
		// 			vecRtmp[i].onStageVideoState(event);
		// 		}
		// 	}
		// }
		
		private loadAuth():void{
			//			Log.getInstance().log(this,"loadAuth");
			//
			
			
			console.log("loadAuth");
			//这里做法不太合理，暂时不修改
			this.m_lobbyAuth = new model.LobbyAuth();
						
			this.initLayer();
			
			this.m_uScrollHeight = 670;
			
//			m_bmpBanner = new egret.Bitmap(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "banner_Asset_001") as BitmapData);
//			spWarn.addChild(m_bmpBanner);
			
			this.mouseFollow = new other.MouseFollow();
			this.addChild(this.mouseFollow);
			
			//这种初始化方式不对，这里是临时处理
			manager.SharedObjectManager.initialize();
			manager.LobbyManager.getInstance().initialize(this.m_stage, this.m_lobbyAuth, this, null);
			manager.TipManager.getInstance().initialize();
			
			this.m_lobbyViewAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LobbyViewAsset");
			this.spMainLayer.addChildAt(this.m_lobbyViewAsset,0);
			
			this.infomation = new InfomationLobby(this.m_lobbyViewAsset);
			
			this.toolView = new tool.Tool(this.spToolLayer);	
			
//			urgentNotice = new UrgentNoticeList(spUrgentNotice);
//			urgentNotice_game = new UrgentNoticeList(spUrgentNotice,1);
//			urgentNotice_game.hide();
//			urgentNotice_game.toGamgeUrgentNotice();
			this.noticeMgr = manager.NoticeManager.getInstance();
			this.noticeMgr.init(this.spUrgentNotice);
			this.noticeMgr.toGamgeUrgentNotice();
			
			this.themeList = new theme.ThemeList();
			this.m_lobbyViewAsset.mc_theme.addChild(this.themeList);
			
			this.liveVideo = new lives.LiveVideo(this.m_lobbyViewAsset.mc_live);
//			manager.LobbyManager.getInstance().videoMaxBytePerSecond = liveVideo;
			//toolView = new Tool(spToolLayer);			
			
			this.advertisement = new advertisements.Advertisement();
			this.m_lobbyViewAsset.mc_adversement.addChild(this.advertisement);
			
			this.quickThemeList = new theme.QuickThemeList();
			this.spQuickLayer.addChild(this.quickThemeList);
			this.quickThemeList.visible = false;
			
			this.vecTablesFront = new Array<table.Table>();
			this.vecTablesNext = new Array<table.Table>();
			this.vecQuickTables = new Array<quick.QuickTable>();
			
			this.m_spTableListFake = new egret.Sprite();
			this.spTableLayer.addChild(this.m_spTableListFake);
			
			
			this.m_spTableListTransition = new egret.Sprite();
			this.spTableLayer.addChild(this.m_spTableListTransition);
			this.m_spTableListTransition.y = this.m_lobbyViewAsset.mc_theme.y+108;
			
			
			this.spTableListNext = new egret.Sprite();
			this.spTableLayer.addChild(this.spTableListNext);
			
			this.spTableListFront = new egret.Sprite();
			this.spTableLayer.addChild(this.spTableListFront);
			this.spTableListFront.y = this.m_spTableListTransition.y;
			
//			this.m_spTableListMask = new egret.Sprite();
//			spTableLayer.addChild(this.m_spTableListMask);
			this.m_spTableListMask.y = this.spTableListFront.y;
			
//			m_bmpSnapshot = new egret.Bitmap();
//			spTableLayer.addChild(m_bmpSnapshot);
			
			this.scroll_Front = new Scroll_2(false, new LobbyScrollBar(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"ScrollHandlerAsset"), function():void{}), manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Scroll_Line_Asset"), true);
			//			scroll_Front.x = 0;
			//			scroll_Front.y = this.m_lobbyViewAsset.mc_theme.y + 115;
			
			this.scroll_Next = new Scroll_2(false, new LobbyScrollBar(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"ScrollHandlerAsset"), function():void{}), manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Scroll_Line_Asset"), true);
			//			scroll_Next.x = 0;
			//			scroll_Next.y = this.m_lobbyViewAsset.mc_theme.y + 115;
			
			this.quickTableList = new quick.QuickTableList();
			this.spQuickLayer.addChildAt(this.quickTableList,0);
			this.quickTableList.visible = false;
			
			this.scroll_quick = new Scroll_2(false, new LobbyScrollBar(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"ScrollHandlerAsset"), function():void{}), manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Scroll_Line_Asset"), true);
			this.scroll_quick.x = 132;
			this.scroll_quick.y = 150;
			this.scroll_quick.resize(754,712);
			
			//连接大厅
			manager.LobbyManager.getInstance().connect( this.m_lobbyAuth.serverIP , this.m_lobbyAuth.serverPort );
			
			//全局的enterframe对象
			this.m_vecFrame = new Array<BFrame>();
			this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
			this.addFrame(this.mouseFollow);
			
//			m_bmpTableList = new egret.Bitmap();
//			this.m_spTableListTransition.addChild(m_bmpTableList);
//			var _table : *;
//			for (var i:number = 0; i < 8; i++) 
//			{
//				_table = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Default_Asset");
//				m_spTableListFake.addChild(_table);
//				_table.x = int(10 + (i%2)*954);
//				_table.y = int(Math.floor(i/2)*(281));
//				_table.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			}
//			if(_table){
//				_table = null;
//			}
			
			this.m_transition_4 = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Lobby_Transition_Asset");
			this.m_transition_4.gotoAndStop(1);
			this.m_spTableListTransition.addChild(this.m_transition_4);
			this.m_transition_4.visible = false;
			this.changeLanguageTransitionTable(this.m_transition_4);
			this.m_transition_4.addFrameScript(19,this.initList);
//			_transition = new ThemeTransition(this.m_spTableListTransition);
//			_transition.fOnComp = initList;
			
//			m_bmpTableList.bitmapData = BitmapUtil.snapshot_2(m_spTableListFake, m_spTableListFake.width, m_spTableListFake.height);
//			m_bmpTableList.visible = false;
//			m_bmpTableList.smoothing = true;
			this.m_spTableListFake.visible = false;
			
			//			m_bmpTableList.x = 0;
			//			m_bmpTableList.y = this.m_iSnapshotY;
			//			m_bmpTableList.visible = false;
			//			m_bmpTableList.smoothing = true;
			//			while(spTableListNext.numChildren>0){
			//				spTableListNext.removeChildAt(0);
			//			}
			
			this.spMainLayer.addEventListener(MouseEvent.MOUSE_WHEEL, this.onMouseWheelHandler);
//			stage.displayState=StageDisplayState.FULL_SCREEN_INTERACTIVE;
			
			this.m_themeMaintain = new windows.GameMsgWnd();
			this.m_themeMaintain.x = 550;
			this.m_themeMaintain.y = 240;
			
//			mobileApp = MobileAppManager.getInstance();
			
//			var card : CardItem;
//			card= new CardItem("Jc",3);
//			this.addChild(card);
//			card = new CardItem("Jd",3);
//			card.x = 237;
//			this.addChild(card);
//			card = new CardItem("Jh",3);
//			card.x = 237*2;
//			this.addChild(card);
//			card = new CardItem("Js",3);
//			card.x = 237*3;
//			this.addChild(card);
//			
//			card= new CardItem("Qc",3);
//			card.y = 330;
//			this.addChild(card);
//			card = new CardItem("Qd",3);
//			card.x = 237;
//			card.y = 330;
//			this.addChild(card);
//			card = new CardItem("Qh",3);
//			card.x = 237*2;
//			card.y = 330;
//			this.addChild(card);
//			card = new CardItem("Qs",3);
//			card.x = 237*3;
//			card.y = 330;
//			this.addChild(card);
//			
//			card= new CardItem("Kc",3);
//			card.y = 330*2;
//			this.addChild(card);
//			card = new CardItem("Kd",3);
//			card.x = 237;
//			card.y = 330*2;
//			this.addChild(card);
//			card = new CardItem("Kh",3);
//			card.x = 237*2;
//			card.y = 330*2;
//			this.addChild(card);
//			card = new CardItem("Ks",3);
//			card.x = 237*3;
//			card.y = 330*2;
//			this.addChild(card);
			
			
			if(config.TemConfig.getInstance().version != config.TemConfig.VERSION){
				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString( language.Language.sVersion_Error ),manager.LobbyManager.getInstance().leaveLobby,null,true);
			}
		}
		
		private initLayer():void{
			
			this.spMainLayer = new egret.Sprite();
			this.addChild(this.spMainLayer);
			this.spMainLayer.alpha = 0;
			
			this.spTableLayer = new egret.Sprite();
			this.spMainLayer.addChild(this.spTableLayer);
			
			this.m_spTableListMask = new egret.Sprite();
			this.spMainLayer.addChild(this.m_spTableListMask);
			
			this.spTelLobbyLayer = new egret.Sprite();
			this.addChild(this.spTelLobbyLayer);
			
			this.spGameLayer = new egret.Sprite();
			this.addChild(this.spGameLayer);
			this.spGameLayer.tabChildren = false;
			this.spGame = new game.SpGame();
			this.spGameLayer.addChild(this.spGame);
			this.spTweenGame = new egret.Sprite();
			this.addChild(this.spTweenGame);
			
			this.spMultiTableLayer = new egret.Sprite();
			this.addChild(this.spMultiTableLayer);
			
			this.spQuickLayer = new egret.Sprite();
			this.addChild(this.spQuickLayer);
			
			this.m_spQuickLayerMask = new egret.Sprite();
			this.addChild(this.m_spQuickLayerMask);
			this.m_spQuickLayerMask.graphics.beginFill(0x000000);
			this.m_spQuickLayerMask.graphics.drawRect(0,0,1920,1080);
			this.m_spQuickLayerMask.graphics.endFill();
			this.spQuickLayer.mask = this.m_spQuickLayerMask;
			
			this.spToolLayer = new egret.Sprite();
			this.addChild(this.spToolLayer);
			this.spToolLayer.y = 10;
			this.spToolLayer.alpha = 0;
			
			this.spUrgentNotice = new egret.Sprite();
			this.spUrgentNotice.mouseEnabled = false;
			this.spUrgentNotice.mouseChildren= false;
			this.addChild(this.spUrgentNotice);
			
			this.spShieldLayer = new egret.Sprite;
			this.addChild(this.spShieldLayer);
			
			this.spChipLayer = new egret.Sprite();
			this.addChild(this.spChipLayer);
			
			this.spChipMask = new egret.Sprite();
			this.addChild(this.spChipMask);
			this.spChipMask.graphics.beginFill(0x000000);
			this.spChipMask.graphics.drawRect(0,50,1920,823);
			this.spChipMask.graphics.endFill();
			this.spChipMask.visible=false;
			this.spChipLayer.mask = this.spChipMask;
			
			this.spPanelChip = new egret.Sprite();
			this.addChild(this.spPanelChip);
			
			this.spWindowLayer = new egret.Sprite();
			this.addChild(this.spWindowLayer);
			
			this.m_spWindowMask = new egret.Sprite();
			this.addChild(this.m_spWindowMask);
			this.setLobbyMask();
			
			this.spTextLayer = new egret.Sprite();
			this.spTextLayer.mouseEnabled = this.spTextLayer.mouseChildren=false;
			this.addChild(this.spTextLayer);
			
			this.spAnimationLayer = new egret.Sprite();
			this.addChild(this.spAnimationLayer);
			
			this.m_spLoading = new egret.Sprite();
			this.addChild(this.m_spLoading);
			this.m_spLoading.graphics.beginFill(0x000000,0.5);
			this.m_spLoading.graphics.drawRoundRect(0,0,1920,1080,15,15);
			this.m_spLoading.graphics.endFill();
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
			this.m_spLoading.addChild(this.m_loading);
			this.m_loading.x = 960;
			this.m_loading.y = 540;
			this.m_loading.tf_label.text = "";
			this.hideLoading();
			
			this.spWarn = new egret.Sprite();
			this.addChild(this.spWarn);
			
		}
				
		public destroy():void{
			
			this.clearTable();
			
			if(this.liveVideo){
				this.liveVideo.destroy();
				this.liveVideo = null;
			}
			
			if(this.infomation){
				this.infomation.destroy();
				this.infomation = null;
			}
			
			if(this.m_lobbyViewAsset){
				this.removeChild(this.m_lobbyViewAsset);
				this.m_lobbyViewAsset = null;
			}
			
			if(this.m_loading){
				if(this.m_loading.parent){
					this.m_loading.parent.removeChild(this.m_loading);
				}
				this.m_loading = null;
			}
			if(this.m_spLoading){
				if(this.m_spLoading.parent){
					this.m_spLoading.parent.removeChild(this.m_spLoading);
				}
				this.m_spLoading = null;
			}
			
		}
		
		public clearTable():void{
			var date = egret.getTimer();
			if(this.vecTablesCurrent){
				var _len  = this.vecTablesCurrent.length;
				var _table ;
				for (var i:number = 0; i < _len; i++) 
				{
					_table = this.vecTablesCurrent.pop();
					if(_table.parent){
						_table.parent.removeChild(_table);
						_table.destroy();
					}
				}
				if(_table){
					_table = null;
				}
			}
			this.spTableListFront.visible = true;
			if(this.scroll_Front.parent){
				this.scroll_Front.parent.removeChild(this.scroll_Front);
			}
			console.log("清除桌子需要时间：", egret.getTimer()-date);
			// console.log("清除桌子后：>> ",System.totalMemory);
		}
		public clearQuickTable():void{
			var date  = egret.getTimer();
			
			if(this.vecQuickTables){
				var _len  = this.vecQuickTables.length;
				var _table ;
				for (var i:number = 0; i < _len; i++) 
				{
					_table = this.vecQuickTables.pop() ;
					if(_table.parent){
						_table.parent.removeChild(_table);
						_table.destroy();
					}
				}
				if(_table){
					_table = null;
				}
			}
			
			if(this.scroll_quick.parent){
				this.scroll_quick.parent.removeChild(this.scroll_quick);
			}
			console.log("清除快速桌子需要时间：", egret.getTimer()-date);
		}
		
		private m_iFrame					 = 0;
		private m_iCycleIndex				 = 10;
		private m_iCurrentTime				;
		public iCurrentFps					;
		protected onFrame(event:Event):void
		{
			for (var i:number = 0; i < this.m_frameLen; i++) 
			{
				if(i<this.m_frameLen){
					if(this.m_vecFrame[i] != null){
						this.m_vecFrame[i].exe();
					}
				}
			}
			
			//当前帧率
			this.m_iFrame++; 
			if(this.m_iFrame >= this.m_iCycleIndex)   {
				this.m_iFrame = 0;
				this.iCurrentFps = (1000 * this.m_iCycleIndex / (egret.getTimer() - this.m_iCurrentTime));
				this.m_iCurrentTime = egret.getTimer();
			} 
		}
		public addFrame(_frame:BFrame):void{
			if(this.m_vecFrame.indexOf(_frame) == -1){
				this.m_vecFrame.push(_frame);
				this.m_frameLen = this.m_vecFrame.length;
			}
		}
		public removeFrame(_frame:BFrame):void{
			for (var i:number = 0; i < this.m_frameLen; i++) 
			{
				if(this.m_vecFrame[i] == _frame){
					this.m_vecFrame.splice(i,1);
					this.m_frameLen = this.m_vecFrame.length;
					break;
				}
			}
		}
		
		public setData():void{
			this.toolView.setData();
			this.themeList.setData();
			this.liveVideo.setData();
//			manager.LobbyManager.getInstance().videoMaxBytePerSecond = liveVideo;
			this.initTableList(this.spTableListFront, this.scroll_Front, this.vecTablesFront, 0);
			this.scroll_Front.enableWheel = false;
//			scroll_Front.x = -960;
//			scroll_Front.y = -335;
//			spTableListFront.x = 960;
//			spTableListFront.y = 736;
			
			this.quickThemeList.setData();
			this.hideQuickThemeList();
			
//			if( spWarn.contains(m_bmpBanner ) ){
//				spWarn.removeChild(m_bmpBanner);
//			}
			
			
			//初始面板
			manager.LobbyManager.getInstance().chipPanelGame_1 = new chip.ChipPanelGame();
			manager.LobbyManager.getInstance().chipPanelGame_2 = new chip.ChipPanelGame(1);
			manager.LobbyManager.getInstance().chipPanelLobby = new chip.ChipPanelLobby();
			
			
			//临时测试
//			var chip1 : ChipPanelLobby = new ChipPanelLobby();
//			spGameLayer.addChild(chip1);
//			chip1.y = 50;
//			chip1.x = 100;
//			manager.LobbyManager.getInstance().chipPanelGame = chip1;
			
			//临时测试
//			manager.LobbyManager.getInstance().showAnimationGameWin(10000);
			
			if(this.infomation){
				this.infomation.setData();
			}
			if(this.advertisement){
				this.advertisement.setData();
			}
			
			this.stage.addEventListener(MouseEvent.CLICK, this.stageClick);
			
			if(this.m_fLoadComplete!=null){
				this.m_fLoadComplete();
				this.alpha = 1;
				this.spMainLayer.alpha = 1;
				this.spToolLayer.alpha = 1;
			}
			
		}
		
		public initTableList( _spContent, _scroll, _vec, _iIndex:number, _bInit:boolean=true):void{
			// console.log("初始化桌子：>> ",System.totalMemory);
			var time  = egret.getTimer();
			
			_scroll.resize( 1920, this.m_uScrollHeight );
			
			//大厅列表
			var _themeVec  = model.LobbyData.getInstance().lobbyInfo.themeVec;
			var _tableVec  = _themeVec[_iIndex].TableList;
			
			this.uCurrentThemeID = _themeVec[_iIndex].ThemeID;
			
			/** 试玩过滤 **/
			var bShow : boolean;
			
			var _tableVecLen  = _tableVec.length;
			var _table ;
			var _tableStruct ;
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
				_table.x = ((i%2)*950);
				_table.y = ((i/2)*281);
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
				if(this.themeList.currentTheme.struct.IsMaintaining){
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
			var _ve  = model.LobbyData.getInstance().lobbyInfo.themeVec;
			
			console.log("初始桌子需要时间：",egret.getTimer()-time, "********************************************************************************");
			
			if(_bInit){
				this.vecTablesCurrent = this.vecTablesFront;
			}
		}
		
		public initQuickTableList(_iIndex:number):void{
			var time  = egret.getTimer();
			
			this.quickTableList.hideLoding();
			
			//大厅列表
			var _themeVec  = model.LobbyData.getInstance().lobbyInfo.themeVec;
			var _tableVec  = _themeVec[_iIndex].TableList;
			
//			uCurrentThemeID = _themeVec[_iIndex].ThemeID;
			
			var _tableVecLen  = _tableVec.length;
			var _quickTable ;
			var _tableStruct ;
			
			for (var i:number = 0; i < _tableVecLen; i++) 
			{
				_tableStruct = _tableVec[i];
				switch(_tableStruct.GameID){
					case define.GameDefine.BAC:
						_quickTable	=	new quick.QuickTableBac();
						break;
					
					case define.GameDefine.SIC:
						_quickTable	=	new quick.QuickTableSicBo();
						break;
					
					case define.GameDefine.ROU:
						_quickTable	=	new quick.QuickTableRou();
						break;
					
					case define.GameDefine.DTF:
						_quickTable	=	new quick.QuickTableDrTi();
						break;
				}
				_quickTable.visible = true;
				_quickTable.setData(_tableStruct);
				_quickTable.x = 10 + (i%2)*362;
				_quickTable.y = (i/2)*167;
				_quickTable.cacheAsBitmap = true;
				this.scroll_quick.add(_quickTable);
				this.vecQuickTables.push(_quickTable);
//				if(_themeVec[_iIndex].IsMaintaining){
//					_quickTable.hideMaintain();
//				}
			}
			
			this.scroll_quick.initStatus();
			this.quickTableList.spMain.addChild(this.scroll_quick);
			this.spQuickLayer.addChildAt(this.quickTableList,0);
			
			if(_themeVec[_iIndex].IsMaintaining){
				this.quickTableList.showThemeMaintenance();
			}else{
				this.quickTableList.hideThemeMaintenance();
			}
			//恢复厅馆按钮
			this.themeList.enable(true);
			var _ve  = model.LobbyData.getInstance().lobbyInfo.themeVec;
			
			console.log("初始 快速换桌 需要时间：",egret.getTimer()-time, "********************************************************************************");
			
		}
		
		/**
		 *快速转桌启用状态控制 
		 * @param value
		 * 
		 */
		public enableQuick(value:boolean):void{
			this.quickThemeList.enable(value);
			this.quickTableList.mouseEnabled=this.quickTableList.mouseChildren=value;
			if(value==true && this.quickThemeList.currentTheme){
				this.quickThemeList.currentTheme.setSelect(false);
			}
		}
		
		private updateTableStruct():void{
			var _themeVec  = model.LobbyData.getInstance().lobbyInfo.themeVec;
			var _tableVec  = _themeVec[model.LobbyData.getInstance().lobbyInfo.getThemeIndex(this.uCurrentThemeID)].TableList;
			var _tableVecLen  = _tableVec.length;
			if(_tableVecLen != this.vecTablesCurrent.length){
				console.log("桌子数量和struct数量异常....");
				return;
			}
			for (var i:number = 0; i < _tableVecLen; i++) 
			{
				if(this.vecTablesCurrent[i].struct.TableID==_tableVec[i].TableID){
					this.vecTablesCurrent[i].setData(_tableVec[i]);
				}
				
//				if(themeList.currentTheme && themeList.currentTheme.struct.IsMaintaining){
//					vecTablesCurrent[i].hideMaintain();
//				}
			}
		}
		
		protected stageClick(event:MouseEvent):void
		{
			if(this.toolView && this.toolView.toolContact){
				this.toolView.toolContact.hide();
			}
			manager.LobbyManager.getInstance().hideChannel();
			manager.LobbyManager.getInstance().hidePersonalInformation();
			manager.LobbyManager.getInstance().hideSystemSetting();
			manager.LobbyManager.getInstance().hidePanelDetail();
		}
		
		
		

		public resize(_w:number=0, _h:number=0):void{
			if(this.spGame){
				this.spGame.x = 960;//-int(manager.LobbyManager.getInstance().gamePoint.x);
				this.spGame.y = 540;//-int(manager.LobbyManager.getInstance().gamePoint.y);
				this.spGame.resize();
			}
			
		}
		
		public onChangeLanguage():void{
			if(this.toolView){
				this.toolView.onChangeLanguage();
			}
			if(this.themeList){
				this.themeList.onChangeLanguage();
			}
			if(this.liveVideo){
				this.liveVideo.onChangeLanguage();
			}
			if(this.vecTablesCurrent){
				var _table ;
				var _uLen  = this.vecTablesCurrent.length;
				for (var i:number = 0; i < _uLen; i++) 
				{
					_table = this.vecTablesCurrent[i];
					_table.onChangeLanguage();
				}
			}
			if(this.vecQuickTables){
				var _quickTable ;
				var _uLenQ  = this.vecQuickTables.length;
				for (var j:number = 0; j < _uLenQ; j++) 
				{
					_quickTable = this.vecQuickTables[j];
					_quickTable.onChangeLanguage();
				}
			}
			
			if(this.infomation){
				this.infomation.onChangeLanguage();
			}
			
//			if(urgentNotice){
//				urgentNotice.onChangeLanguage();
//			}
//			if(urgentNotice_game){
//				urgentNotice_game.onChangeLanguage();
//			}
			if(this.noticeMgr)
			{
				this.noticeMgr.onChangeLanguage();
			}
			
			if(this.toolView){
				this.toolView.onChangeLanguage();
			}
			
			if(this.quickThemeList){
				this.quickThemeList.onChangeLanguage();
			}
			
			if(manager.LobbyManager.getInstance().chipPanelGame_1){
				manager.LobbyManager.getInstance().chipPanelGame_1.onChangeLanguage();
			}
			if(manager.LobbyManager.getInstance().chipPanelGame_2){
				manager.LobbyManager.getInstance().chipPanelGame_2.onChangeLanguage();
			}
			if(manager.LobbyManager.getInstance().chipPanelLobby){
				manager.LobbyManager.getInstance().chipPanelLobby.onChangeLanguage();
			}
			
			if(this.m_transition_4){
				this.changeLanguageTransitionTable(this.m_transition_4);
			}
			
			
//			var _len : int = m_spTableListFake.numChildren;
//			for (var k:number = 0; k < _len; k++) 
//			{
//				(m_spTableListFake.getChildAt(k) as MovieClip).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			}
//			if(m_bmpTableList.bitmapData){
//				m_bmpTableList.bitmapData.dispose();
//			}
//			m_bmpTableList.bitmapData = BitmapUtil.snapshot_2(m_spTableListFake, m_spTableListFake.width, m_spTableListFake.height);
//			m_bmpTableList.visible = false;
//			m_bmpTableList.smoothing = true;
			
			if(this.m_themeMaintain){
				this.m_themeMaintain.onChangeLanguage();
			}
			
			if(this.m_loading){
			//	this.m_loading.setLabel(manager.LobbyManager.getInstance().getLanguageString(language.Language.sLiveVideo));
			}
			
//			if(mobileApp){
//				mobileApp.onChangeLanguage();
//			}
		}
		
		public changeTheme(_iThemeID:number):void{
//			if(m_vectorThemeList){
//				if(m_uCurrentThemeID < m_vectorThemeList.length){
//					m_vectorThemeList[m_uCurrentThemeID].visible = false;
//				}
			
			//进多桌时，只是取消订阅当前桌，不需要订阅
			if(_iThemeID==-1){
				return;
			}
			if(this.uCurrentThemeID == _iThemeID){
				this.updateTableStruct();
				return;
			}
						
			//判断滑动方向
//			var _x : int;
//			var _arrow : int;
//			if(_iThemeID > uCurrentThemeID){
//				_x = -2000;
//				_arrow = 2;
//			}else{
//				_x = 2000;
//				_arrow = 1;
//			}
			
//			switch(_arrow){
//				case 0:	//居中
//					scroll_Next.x = -960;
//					scroll_Next.y = -335;
//					spTableListNext.x = 960;
//					spTableListNext.y = 736;
//					break;
//				case 1:	//偏左下
//					scroll_Next.x = 0;
//					scroll_Next.y = -535;
//					spTableListNext.x = -100;
//					spTableListNext.y = 936;
//					m_bmpTableList.x = 0;
//					m_bmpTableList.y = -564;
//					this.m_spTableListTransition.x = 0;
//					this.m_spTableListTransition.y = this.m_lobbyViewAsset.mc_theme.y + 110 + 564;
//					break;
//				case 2:	//偏右下
//					scroll_Next.x = -1920;
//					scroll_Next.y = -535;
//					spTableListNext.x = 2020;
//					spTableListNext.y = 936;
					
//					m_bmpTableList.x = -1920;
//					m_bmpTableList.y = -564;
//					this.m_spTableListTransition.x = 1920;
//					this.m_spTableListTransition.y = this.m_lobbyViewAsset.mc_theme.y+110 + 564;
//					break;
//			}
			
			
			this.uCurrentThemeID = _iThemeID;
//			m_iComplete = 0;
			
			
			//缓动前隐藏滚动条
			this.scroll_Front.visibleBar(false);
			
			//隐藏维护提示
			this.hideThemeMaintenance();
			
			//截屏
//			if(m_bmpSnapshot.bitmapData){
//				m_bmpSnapshot.bitmapData.dispose();
//			}
//			m_bmpSnapshot.bitmapData = scroll_Front.snapshot();//BitmapUtil.snapshot_2(spTableListFront,spTableListFront.width, scroll_Front.uLogHeight);
//			m_bmpSnapshot.x = this.m_iSnapshotX;
//			m_bmpSnapshot.y = this.m_lobbyViewAsset.mc_theme.y+110;
//			spTableListFront.visible = false;
//			m_bmpSnapshot.smoothing = true;
//			console.log("缓动准备-front.x",m_bmpSnapshot.x,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","m_bmpSnapshot.width",m_bmpSnapshot.width);
//			TweenLite.to(m_bmpSnapshot, 0.4, {x:_x, ease:RoughEase.ease.config({strength:0.3, points:2, template:Back.easeIn, randomize:false}), onComplete:function():void{
//				tweenComplete("front");
//				console.log("缓动结束-front.x",m_bmpSnapshot.x,"/////////////////////////////////////////////////////////////","m_bmpSnapshot.width",m_bmpSnapshot.width);
//			}});
			
//			m_bmpTableList.bitmapData = BitmapUtil.snapshot_2(m_spTableListFake, m_spTableListFake.width, this.m_uScrollHeight);
//			m_bmpTableList.smoothing = true;
//			m_bmpTableList.visible = true;
//			this.m_spTableListTransition.addChild(m_bmpTableList);
//			this.m_spTableListTransition.scaleX = 0.6;
//			this.m_spTableListTransition.scaleY = 0.6;
//			this.m_spTableListTransition.alpha = 0;
//			scroll_Next.visibleBar(false);
//			
//			TweenLite.to(this.m_spTableListTransition, 0.8, {scaleX:1, scaleY:1, alpha:1, onComplete:function():void{
//				this.m_spTableListTransition.scaleX = 1;
//				this.m_spTableListTransition.scaleY = 1;
//				scroll_Next.visibleBar(true);
//				tweenComplete("next");
//			},delay:0.1});
			
				
				this.clearTable();
//				m_uCurrentThemeID = _uThemeID;
//				initTableList(model.LobbyData.getInstance().lobbyInfo.getThemeIndex(m_uCurrentThemeID));
			
//				if(m_uCurrentThemeID < m_vectorThemeList.length ){
//					m_vectorThemeList[m_uCurrentThemeID].visible = true;
//				}
//			}
			
			this.playTransition();
				
		}
//		private tweenComplete(_sValue:String):void{
//			m_iComplete++;
//			console.log("缓动完成-"+_sValue);
//			if(m_iComplete>=2){
//				clearTable();
				
//				if(m_bmpTableList.bitmapData){
//					m_bmpTableList.bitmapData.dispose();
//				}
//				m_bmpTableList.visible = false;
//				if(m_bmpTableList.parent){
//					m_bmpTableList.parent.removeChild(m_bmpTableList);
//				}
				
//				spTableListNext.y = spTableListFront.y;
//				initTableList(spTableListNext, scroll_Next, vecTablesNext, model.LobbyData.getInstance().lobbyInfo.getThemeIndex(uCurrentThemeID), false);
				
				//spTableListFron 和 spTableListNext 换位
//				spTableListCurrent = spTableListNext;
//				spTableListNext = spTableListFront;
//				spTableListFront = spTableListCurrent;
//				
//				scroll_current = scroll_Next;
//				scroll_Next = scroll_Front;
//				scroll_Front = scroll_current;
//				
//				vecTablesCurrent = vecTablesNext;
//				vecTablesNext = vecTablesFront;
//				vecTablesFront = vecTablesCurrent;
//				
//				spTableLayer.swapChildren(spTableListFront, spTableListNext);
//			}
//		}
		//房间列表
		public showQuickTheme(_iThemeID:number):void{
			if(_iThemeID==-1){
				return;
			}
//			if(iCurrentQuick == _iThemeID){	
//				m_spQuickTableList.visible = !m_spQuickTableList.visible;
//				return;
//			}
//			clearQuickTable();
			
//			iCurrentQuick = _iThemeID;
			
			this.initQuickTableList(model.LobbyData.getInstance().lobbyInfo.getThemeIndex(_iThemeID));
		}
		public showQuickTableList(_bLoading:boolean):void{
//			m_spQuickTableList.hideThemeMaintenance();
			this.quickTableList.visible = true;
			this.quickThemeList.enable(false);
			this.quickTableList.x = -500;
			this.quickTableList.showLoading(_bLoading);
			manager.LobbyManager.getInstance().bQuickTableListTween = true;
			egret.Tween.get(this.quickTableList).to({x:0}, define.Define.SPEED, egret.Ease.backOut).call(function():void{
				manager.LobbyManager.getInstance().bQuickTableListTween = false;
				if(this.quickTableList){
					this.quickTableList.hideLoding();
				}
				setTimeout(function():void
				{
					if(manager.ActionManager.getInstance().fInitQuickTable!=null){
						manager.ActionManager.getInstance().fInitQuickTable();
					}
					if(this.quickThemeList){
						this.quickThemeList.enable(true);
					}
				},1);
			});
			manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
		}
		public hideQuickTableList(_bTween:boolean=true):void{
			if(this.quickTableList.visible==false){
				return;
			}
			this.quickThemeList.enable(false);
			if(_bTween){
				egret.Tween.get(this.quickTableList).to({x:-500}, define.Define.SPEED, egret.Ease.backIn).call(function():void{
					if(this.quickTableList){
						this.quickTableList.visible = false;
						this.quickThemeList.enable(true);
					}
					
					this.clearQuickTable();
				});
			}else{
				this.quickTableList.x = -500;
				this.quickTableList.visible = false;
				this.quickThemeList.enable(true);
				this.clearQuickTable();
			}
			
		}
		
		/**
		 * 設定廳按鈕是否顯示
		 */
		set themeListVisible( _bValue:boolean ) {
			this.m_lobbyViewAsset.mc_theme.visible = _bValue;
		}
		
		get themeListVisible():boolean {
			return this.m_lobbyViewAsset.mc_theme.visible;
		}
		
		/**
		 *	查找桌子 
		 */		
		public findTableByGT(GameID:number, TableID:number):table.Table{
			
			var _len  = this.vecTablesCurrent.length;
			for (var i:number = 0; i < _len; i++) 
			{
				if((this.vecTablesCurrent[i].struct.GameID==GameID) && (this.vecTablesCurrent[i].struct.TableID == TableID)){
					
					return this.vecTablesCurrent[i];
				}
			}
			
			return null;
		}
		public findTableByTT(ThemeID:number, TableID:number):table.Table{
			var _len  = this.vecTablesCurrent.length;
			for (var i:number = 0; i < _len; i++) 
			{
				if((this.vecTablesCurrent[i].struct.ThemeID==ThemeID) && (this.vecTablesCurrent[i].struct.TableID == TableID)){
					
					return this.vecTablesCurrent[i];
				}
			}
			
			return null;
		}
		
		public findQuickTableByGT(GameID:number, TableID:number):quick.QuickTable{
//			console.log("开始查找",(new Date).time);
			var _len  = this.vecQuickTables.length;
			for (var i:number = 0; i < _len; i++) 
			{
				if((this.vecQuickTables[i].struct.GameID==GameID) && (this.vecQuickTables[i].struct.TableID == TableID)){
//					console.log("结束查找",(new Date).time);
					return this.vecQuickTables[i];
				}
			}
//			console.log("结束查找",(new Date).time);
			return null;
		}
		public findQuickTableByTT(ThemeID:number, TableID:number):quick.QuickTable{
			//			console.log("开始查找",(new Date).time);
			var _len  = this.vecQuickTables.length;
			for (var i:number = 0; i < _len; i++) 
			{
				if((this.vecQuickTables[i].struct.ThemeID==ThemeID) && (this.vecQuickTables[i].struct.TableID == TableID)){
					//					console.log("结束查找",(new Date).time);
					return this.vecQuickTables[i];
				}
			}
			//			console.log("结束查找",(new Date).time);
			return null;
		}
		
		//厅别列表
		public showQuickThemeList():void{
			if( this.quickThemeList ){
				this.quickThemeList.visible = true;
				this.quickThemeList.setType(manager.LobbyManager.getInstance().getGameID());
			}
			
		}
		
		public hideQuickThemeList():void{
			if( this.quickThemeList ){
				this.quickThemeList.visible = false;
			}
			
		}
		
		/**
		 * 電投大廳 元件設定位置 
		 */
		public setTelPosition():void {
			var _iPos:number = 104;
			this.m_lobbyViewAsset.mc_live.y = _iPos;
			this.m_lobbyViewAsset.mc_adversement.y = _iPos;
		}
		/**
		 * 網投大廳 元件設定位置 
		 */
		public setNetPosition():void {
			var _iPos:number = 46;
			this.m_lobbyViewAsset.mc_live.y = _iPos;
			this.m_lobbyViewAsset.mc_adversement.y = _iPos;
		}
		
		public clearBanner():void {
//			if( spWarn && m_bmpBanner ){
//				if( spWarn.contains(m_bmpBanner )){
//					spWarn.removeChild(m_bmpBanner);
//				}
//			}
		}
		
		protected onMouseWheelHandler(evt):void{
			if(evt.delta<0){		//往下滚动
				
				this.m_iWheelY -= this.m_iSpace;
				
				if(this.m_iWheelY < 46){
					this.m_iWheelY = 46;
				}
				
				if(this.m_iWheelY<=46 || this.m_lobbyViewAsset.mc_theme.y<=46){
					if(!this.bWheelToTop){
						//到达顶部
						this.bWheelToTop = true;
						if(this.liveVideo){
							this.liveVideo.stop();
						}
						if(this.advertisement){
							this.advertisement.stop();
						}
						this.m_uScrollHeight = 910;
						this.resizeTableListMask();
						this.scroll_Front.resize(this.scroll_Front.uLogWidth, this.m_uScrollHeight);
						this.adjust();
					}
				}else{
					this.bWheelToTop = false;
				}
				
				if(!this.bWheelToTop){
					this.m_bResizeForDown = true;
				}else{
					this.m_bResizeForDown = false;
				}
//				console.log("m_bResizeTop",this.m_bResizeForDown);
				if(this.m_bResizeForDown){
					if((this.m_iSpace <= Math.abs(286-this.m_lobbyViewAsset.mc_theme.y)) || this.m_lobbyViewAsset.mc_theme.y==286){
						this.m_uScrollHeight += this.m_iSpace;
					}else{
						this.m_uScrollHeight = 670 + Math.abs(286-this.m_lobbyViewAsset.mc_theme.y);
					}
					this.resizeTableListMask();
					this.scroll_Front.resize(this.scroll_Front.uLogWidth, this.m_uScrollHeight);
					this.adjust();
				}
				
			}else if(evt.delta>0){	//往上滚动
				if(this.bWheelToTop){
					if(this.liveVideo){
						this.liveVideo.play();
					}
					if(this.advertisement){
						this.advertisement.start();
					}
					this.bWheelToTop = false;
				}
				if(this.m_lobbyViewAsset.mc_theme.y==286){
					return;
				}
				
				if(this.scroll_Front.enableWheel && this.scroll_Front.spContent().y==0){
					this.scroll_Front.enableWheel = false;
//					this.m_iWheelY = 46+this.m_iSpace;
				}
				
				if(this.scroll_Front.enableWheel==false){
					
					this.m_iWheelY += this.m_iSpace;
					
					if(this.m_iWheelY>286){
						this.m_iWheelY = 286;
						
						//到达底部
						this.m_uScrollHeight = 670;
						this.resizeTableListMask();
						this.scroll_Front.resize(this.scroll_Front.uLogWidth, this.m_uScrollHeight);
						this.adjust();
						return;
					}
					
					
					if(!this.scroll_Front.enableWheel){
						this.m_bResizeForUp = true;
					}else{
						this.m_bResizeForUp = false;
					}
					
					//				console.log("m_bResizeTop",this.m_bResizeForUp);
					if(this.m_bResizeForUp){
						if((this.m_iSpace <= Math.abs(286-this.m_lobbyViewAsset.mc_theme.y)) || this.m_lobbyViewAsset.mc_theme.y==46){
							this.m_uScrollHeight -= this.m_iSpace;
						}else{
							this.m_uScrollHeight = 670 + Math.abs(286-this.m_lobbyViewAsset.mc_theme.y);
						}
						this.resizeTableListMask();
						this.scroll_Front.resize(this.scroll_Front.uLogWidth, this.m_uScrollHeight);
						this.adjust();
					}
				}
				
			}
			
			console.log("this.m_iWheelY",this.m_iWheelY,"this.m_uScrollHeight",this.m_uScrollHeight);
		}
		private adjust():void{
//			this.m_lobbyViewAsset.mc_adversement.y = this.m_iWheelY;
//			this.m_lobbyViewAsset.mc_live.y = this.m_iWheelY;
			this.m_lobbyViewAsset.mc_theme.y = this.m_iWheelY;
			this.m_spTableListTransition.y = this.m_lobbyViewAsset.mc_theme.y+108;
			this.spTableListFront.y = this.m_spTableListTransition.y;
			this.m_spTableListMask.y = this.spTableListFront.y;
			
			
			if(this.m_lobbyViewAsset.mc_theme.y<=46){
				this.scroll_Front.enableWheel = true;
			}else{
				this.scroll_Front.enableWheel = false;
			}
		}
		private resizeTableListMask():void{
			if(this.themeList.currentTheme && this.themeList.currentTheme.struct.IsMaintaining){
				this.m_spTableListMask.graphics.clear();
				this.m_spTableListMask.graphics.beginFill(0x000000,0.5);
				this.m_spTableListMask.graphics.drawRoundRect(0,0,2000,this.m_uScrollHeight,10,10);
				this.m_spTableListMask.graphics.endFill();
				this.m_spTableListMask.addChild(this.m_themeMaintain);
			}
		}
		
		/**
		 *	屏蔽桌子 
		 */		
//		public removeChildTableList():void{
////			spTableLayer.visible = false;
//			var _len : int = m_vectorThemeList.length;
//			for (var i:number = 0; i < _len; i++) 
//			{
//				if(m_vectorThemeList[i].parent){
//					m_vectorThemeList[i].parent.removeChild(m_vectorThemeList[i]);
//				}
//			}
//		}
//		public addChildTableList():void{
////			spTableLayer.visible = true;
//			var _len : int = m_vectorThemeList.length;
//			for (var i:number = 0; i < _len; i++) 
//			{
//				spTableLayer.addChild(m_vectorThemeList[i]);
//			}
//		}
		
		
		public showLoading(_bShowBg:boolean=true):void{
			if(this.m_spLoading){
				this.m_spLoading.visible = _bShowBg;
			}
			if(this.m_loading){
				this.m_loading.gotoAndPlay(1);
				this.m_loading.visible = true;
			}
		}
		
		public hideLoading():void{
			if(this.m_spLoading){
				this.m_spLoading.visible = false;
			}
			if(this.m_loading){
				this.m_loading.gotoAndStop(1);
				this.m_loading.visible = false;
			}
			
		}
		
		private changeLanguageTransitionTable(_mcTransition):void{
			if(_mcTransition==null){
				return;
			}
			var bmp ;
			var _mc ;
			for (var j:number = 0; j < 8; j++) 
			{
				_mc = _mcTransition.getChildByName("mc_"+String(j));
				if(_mc.numChildren==0){
					bmp = new egret.Bitmap();
					_mc.addChild(bmp);
				}else{
					bmp = _mc.getChildAt(0);
				}
				if(bmp){
					bmp.bitmapData = manager.BitmapManager.getInstance().getTableDefault(manager.LobbyManager.getInstance().lobbyAuth.Lang);
					bmp.smoothing = true;
				}else{
					console.log("大厅换厅过渡图片获取异常...");
				}
			}
			if(_mc){
				_mc = null;
			}
			if(bmp){
				bmp = null;
			}
		}
		private initList():void{
			this.m_transition_4.gotoAndStop(20);
			//播放完过渡动画要做的事情
			this.initTableList(this.spTableListFront, this.scroll_Front, this.vecTablesFront, model.LobbyData.getInstance().lobbyInfo.getThemeIndex(this.uCurrentThemeID), false);
		}
		//播放过渡动画
		public playTransition():void{
			if(this.m_transition_4){
				this.m_transition_4.visible = true;
				this.m_transition_4.gotoAndPlay(1);
			}
//			if(_transition)
//			{
//				_transition.start();
//			}
		}
		
		//增、减桌子，重新排序
		public changeTableList(uMode, _tableStruct):void{
			
			var _table ;
			var _len ;
			if(this.vecTablesCurrent){
				_len = this.vecTablesCurrent.length;
			}
			if(_len>0 && this.themeList.currentTheme.struct.ThemeID==_tableStruct.ThemeID){
				switch(uMode){
					case 0:
						this.setMaintainTable(_tableStruct);
						break;
					
					case 2:
						this.addTable(_tableStruct);
						this.sortTable();
						break;
				}
			}
			
			
			var _quickTable ;
			var _quickLen ;
			if(this.vecQuickTables){
				_quickLen = this.vecQuickTables.length;
			}
			if(_quickLen>0 && this.quickThemeList.currentTheme && this.quickThemeList.currentTheme.struct.ThemeID==_tableStruct.ThemeID){
				switch(uMode){
					case 0:
						this.removeQuickTable(_quickLen,_tableStruct);
						break;
					
					case 2:
						this.addQuickTable(_tableStruct);
						this.sortQuickTable();
						break;
				}
			}
		}
		
		private setMaintainTable(_tableStruct):void{
			var _len ;
			if(this.vecTablesCurrent){
				_len = this.vecTablesCurrent.length;
			}
			for (var i:number = 0; i < _len; i++) {
				if(this.vecTablesCurrent[i].struct.TableID == _tableStruct.TableID){
					this.vecTablesCurrent[i].updateHint(language.Language.sMaintenance);
					this.vecTablesCurrent[i].showMaintain();
					break;
				}
			}
		}
		public removeTable(_tableStruct):void{
			var _len ;
			if(this.vecTablesCurrent){
				_len = this.vecTablesCurrent.length;
			}
			var _table ;
			for (var i:number = 0; i < _len; i++) {
				if(this.vecTablesCurrent[i].struct.TableID == _tableStruct.TableID){
					_table = this.vecTablesCurrent[i];
					this.vecTablesCurrent.splice(i,1);
					if(_table){
//						_table.struct.DealerName = "";
//						_table.struct.IsChangingShoe = false;
//						_table.struct.GameStatus = GameStatus.WAIT_NEXT_NEWGAME;
//						_table.updateHint(language.Language.sMaintenance);
//						_table.showMaintain();
//						_table.updateDealerName();
//						_table.mcAsset.mc_shuffle.visible = false;
						if(_table.parent){
							_table.parent.removeChild(_table);
						}
						_table.destroy();
						_table = null;
					}
					this.sortTable();
					break;
				}
			}
		}
		private addTable(oData):void{
			var _tableStruct = model.LobbyData.getInstance().getTableStructByTableID(oData.TableID);
			if(_tableStruct){
				_tableStruct.update(oData);
			}else{
				_tableStruct = new model.struct.TableStruct(oData);
			}
			var _table ;
			if(this.IsAddTable(_tableStruct)){
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
				_table.cacheAsBitmap = true;
				
				this.scroll_Front.add(_table);
				this.vecTablesCurrent.push(_table);
				this.vecTablesCurrent.sort(function(a,b):number{
					if(a.struct.TableID>b.struct.TableID){
						return 1;
					}else if(a.struct.TableID<b.struct.TableID){
						return -1;
					}else{
						return 0;
					}
					
				});
			}
		}
		private removeQuickTable(_len:number,_tableStruct):void{
			var _table ;
			for (var i:number = 0; i < _len; i++) {
				if(this.vecQuickTables[i].struct.TableID == _tableStruct.TableID){
					_table = this.vecQuickTables[i];
					if(_table){
						_table.updateHint(language.Language.sMaintenance);
						_table.showMaintain();
//						if(_table.parent){
//							_table.parent.removeChild(_table);
//						}
//						_table.destroy();
						_table = null;
					}
					break;
				}
			}
		}
		private addQuickTable(oData):void{
			var _tableStruct = model.LobbyData.getInstance().getTableStructByTableID(oData.TableID);
			if(_tableStruct){
				_tableStruct.update(oData);
			}else{
				_tableStruct = new model.struct.TableStruct(oData);
			}
			if(this.IsAddQuickTable(_tableStruct)){
				var _quickTable ;
				switch(_tableStruct.GameID){
					case define.GameDefine.BAC:
						_quickTable	=	new quick.QuickTableBac();
						break;
					
					case define.GameDefine.SIC:
						_quickTable	=	new quick.QuickTableSicBo();
						break;
					
					case define.GameDefine.ROU:
						_quickTable	=	new quick.QuickTableRou();
						break;
					
					case define.GameDefine.DTF:
						_quickTable	=	new quick.QuickTableDrTi();
						break;
				}
				_quickTable.visible = true;
				_quickTable.setData(_tableStruct);
				this.scroll_quick.add(_quickTable);
				this.vecQuickTables.push(_quickTable);
				this.vecQuickTables.sort(function(a:quick.QuickTable,b:quick.QuickTable):number{
					if(a.struct.TableID>b.struct.TableID){
						return 1;
					}else if(a.struct.TableID<b.struct.TableID){
						return -1;
					}else{
						return 0;
					}
					
				});
//				if(quickThemeList.currentTheme && quickThemeList.currentTheme.struct.IsMaintaining){
//					_quickTable.hideMaintain();
//				}
			}
		}
		
		private IsAddTable(_tableStruct):boolean{
			if(this.vecTablesCurrent){
				var _len  = this.vecTablesCurrent.length;
				for (var i:number = 0; i < _len; i++) {
					if(this.vecTablesCurrent[i].struct.TableID == _tableStruct.TableID){
						console.log("添加重复的桌子");
						return false;
					}
				}
			}
			return true;
		}
		private IsAddQuickTable(_tableStruct):boolean{
			if(this.vecQuickTables){
				var _len  = this.vecQuickTables.length;
				for (var i:number = 0; i < _len; i++) {
					if(this.vecQuickTables[i].struct.TableID == _tableStruct.TableID){
						console.log("添加重复的桌子");
						return false;
					}
				}
			}
			return true;
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
		
		public upDataThemeTableMaintenance():void{
			if(this.vecTablesCurrent){
				for (var j:number = 0; j < this.vecTablesCurrent.length; j++) 
				{
					this.vecTablesCurrent[j].updateMaintenanceStatus();
				}
			}
			
			if(this.quickTableList){
//				quickTableList.hideThemeMaintenance();
				for (var i:number = 0; i < this.vecQuickTables.length; i++) 
				{
					this.vecQuickTables[i].updateMaintenanceStatus();
				}
			}
		
		}
		
		//赌桌维护
		public tableMaintenance(_tableID):void{
			if(this.vecTablesCurrent){
				var table ;
				for (var i:number = 0; i < _tableID.length; i++) 
				{
					for (var j:number = 0; j < this.vecTablesCurrent.length; j++) 
					{
						if(this.vecTablesCurrent[j].struct.TableID==_tableID[i].TableID){
							this.vecTablesCurrent[j].struct.IsMaintaining = true;
							this.vecTablesCurrent[j].updateMaintenanceStatus();
							break;
						}
					}
					for (var k:number = 0; k < this.vecQuickTables.length; k++) 
					{
						if(this.vecQuickTables[k].struct.TableID==_tableID[i].TableID){
							this.vecQuickTables[k].struct.IsMaintaining = true;
							this.vecQuickTables[k].updateMaintenanceStatus();
							break;
						}
					}
					
				}
			}
		}
		//恢复赌桌维护
		public tableMaintenanceRestore(RecoveryData):void{
			var bFind : boolean;
			if(this.vecTablesCurrent){
				for (var i:number = 0; i < RecoveryData.length; i++) 
				{
					bFind = false;
					for (var j:number = 0; j < this.vecTablesCurrent.length; j++) 
					{
						if(this.vecTablesCurrent[j].struct.TableID==RecoveryData[i].TableID){
							this.vecTablesCurrent[j].struct.update(RecoveryData[i]);
							bFind = true;
							break;
						}
					}
					if(bFind==false && RecoveryData[i].ThemeID==this.themeList.currentTheme.struct.ThemeID){
						this.addTable(RecoveryData[i]);
					}
					
					bFind = false;
					for (var k:number = 0; k < this.vecQuickTables.length; k++) 
					{
						if(this.vecQuickTables[k].struct.TableID==RecoveryData[i].TableID){
							this.vecQuickTables[k].struct.update(RecoveryData[i]);
							bFind = true;
							break;
						}
					}
					if(bFind==false && this.vecQuickTables.length>0 && this.quickThemeList.currentTheme && RecoveryData[i].ThemeID==this.quickThemeList.currentTheme.struct.ThemeID){
						this.addQuickTable(RecoveryData[i]);
					}
				}
				
				this.sortTable();
				this.sortQuickTable();
			}
		}
		
		//进入游戏
		public toGame():void{
			this.m_lobbyViewAsset.mc_tool_bg.visible = false;
			this.infomation.visible = false;
			this.m_lobbyViewAsset.mc_theme.visible = false;
			this.m_lobbyViewAsset.mc_adversement.visible = false;
			this.m_lobbyViewAsset.mc_live.visible = false;
			this.spTableLayer.visible = false;
			this.m_spTableListMask.visible = false;
		}
		
		public toLobby():void{
			this.m_lobbyViewAsset.mc_tool_bg.visible = true;
			this.infomation.visible = true;
			this.m_lobbyViewAsset.mc_theme.visible = true;
			this.m_lobbyViewAsset.mc_adversement.visible = true;
			this.m_lobbyViewAsset.mc_live.visible = true;
			this.spTableLayer.visible = true;
			this.m_spTableListMask.visible = true;
			this.spToolLayer.alpha = 1;
			this.quickThemeList.alpha = 1;
		}
		
		public exitMachineBac():void{
			if(this.spToolLayer){
				egret.Tween.get(this.spToolLayer).to({alpha:0}, 0.6);
			}
			if(this.quickThemeList){
				egret.Tween.get(this.quickThemeList).to({alpha:0}, 0.6);
			}
		}
		
		

		private sortTable():void{
			var _len  = this.vecTablesCurrent.length;
			for (var j:number = 0; j < _len; j++) 
			{
				this.vecTablesCurrent[j].x = (10 + (j%2)*949);
				this.vecTablesCurrent[j].y = ((j/2)*(286-5));
			}
		}
		private sortQuickTable():void{
			var _quickLen  = this.vecQuickTables.length;
			for (var i:number = 0; i < _quickLen; i++) 
			{
				this.vecQuickTables[i].x = 10 + (i%2)*362;
				this.vecQuickTables[i].y = (i/2)*167;
			}
		}
		
		public setMachineMask():void{//进入机械百家时，调整spWindowLayer的遮罩y值
			this.m_spWindowMask.graphics.clear();
			this.m_spWindowMask.graphics.beginFill(0xffffff,0.1);
			this.m_spWindowMask.graphics.drawRect(0,83,1920,1034);
			this.m_spWindowMask.graphics.endFill();
			this.spWindowLayer.mask = this.m_spWindowMask;
		}
		
		public setLobbyMask():void{//退出机械百家时，调整spWindowLayer的遮罩y值
			this.m_spWindowMask.graphics.clear();
			this.m_spWindowMask.graphics.beginFill(0xffffff,0.1);
			this.m_spWindowMask.graphics.drawRect(0,46,1920,1034);
			this.m_spWindowMask.graphics.endFill();
			this.spWindowLayer.mask = this.m_spWindowMask;
		}
		

	}
}
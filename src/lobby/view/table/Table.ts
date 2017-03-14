module lobby.view.table {
	export class Table extends BSprite {
		protected m_mcAsset						:	egret.MovieClip;					//房间资源
		protected m_mcContent					;					//缓存内容
		protected m_bmpBg						;						//桌子背景
		protected m_bmpIcon						;						//桌子图标
		protected m_bmpTable					;						//桌子序号
		protected m_bmpTime						;						//倒计时
		protected m_bmpTableHint				;						//桌子提示
		protected m_bmpHintShuffle				;						//洗牌提示
//		private m_bmpFace						;						//头像位图
		protected m_imgLoader					:	egret.ImageLoader;				//加载头像
		protected m_sFaceUrl					:	string	=	"";				//头像路径
		protected m_spFaceContainer				;
		
		protected m_mcHot						;					//鼠标热区
		protected m_struct						:	struct.Struct_Table;				//数据结构
		
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
		protected m_panelStatistic				:	route.StatisticsUI;				//统计面板
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

			this.m_bmpBg = manager.ResourceManager.getInstance().createBitmapByName("table_bg_lobby_default_png");
			this.addChild(this.m_bmpBg);
			this.m_bmpBgOver = manager.ResourceManager.getInstance().createBitmapByName("table_bg_lobby_over.png");

			this.m_mcContent.cacheAsBitmap = true;
			
			this.m_uTotaleFrame = manager.BitmapManager.getInstance().aTableBgHover.length;
			
			
			this.m_bmpBgOver.x = 3;
			this.m_bmpBgOver.y = 2;
			
			this.m_bmpIcon = new egret.Bitmap();
			this.addChild(this.m_bmpIcon);
			this.m_bmpIcon.x = 9;
			this.m_bmpIcon.y = 3;
			
			this.m_bmpTime = new egret.Bitmap();
			this.addChild(this.m_bmpTime);
			this.m_bmpTime.x = 314;
			this.m_bmpTime.y = 22;
			
			// this.m_mcAsset.mc_hint.cacheAsBitmap = true;
			this.m_mcHot.cacheAsBitmap = true;
			this.m_mcHot.addEventListener(mouse.MouseEvent.ROLL_OVER, this.over, this);
			this.m_mcHot.addEventListener(mouse.MouseEvent.ROLL_OUT, this.out, this);
			
			this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.bgOver, this);
			this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.bgOut, this);
			
			/*m_timer = new Timer(50);
			m_timer.addEventListener(TimerEvent.TIMER, onTimer);*/
			// this.m_timer = JTimer.getTimer(50);
			// this.m_timer.addTimerCallback(onTimer);
			
			this.m_btnStatistics_cn = new ui.button.Button_Language([],this.setStatisticsStatus );
			this.m_btnStatistics_tw = new ui.button.Button_Language([], this.setStatisticsStatus);
			this.m_btnStatistics_en = new ui.button.Button_Language([], this.setStatisticsStatus);
			
			this.m_Statistic_topY = 143;
			this.m_Statistic_bottomY = 230;
			this.m_Statistic_bottom_offsetY = 3;
			
			this.m_spStatisticMask = new egret.Sprite();
			this.m_spStatisticMask.graphics.beginFill(0xff0000,0.5);
			this.m_spStatisticMask.graphics.drawRect(0,0,717,83);
			this.m_spStatisticMask.graphics.endFill();
			this.m_spStatisticMask.x = 137;
			this.m_spStatisticMask.y = this.m_Statistic_topY;
			
			this.m_spstatisticContain.x = 128;
			this.m_spstatisticContain.y = this.m_Statistic_bottomY;
			this.addChild(this.m_spStatisticMask);
			this.m_spstatisticContain.mask = this.m_spStatisticMask;
//			m_spstatisticContain.mouseChildren = false;
//			m_spstatisticContain.mouseEnabled = false;
			
		}
		
		get mcAsset():egret.MovieClip
		{
			return this.m_mcAsset;
		}

		set mcAsset(value:egret.MovieClip)
		{
			this.m_mcAsset = value;
		}

		protected onTimer():void
		{
			// TODO Auto-generated method stub
			this.m_uCurrentFrame++;
			if(this.m_uCurrentFrame > this.m_uTotaleFrame){
				this.m_uCurrentFrame = 0;
			}
			this.m_bmpBgOver.bitmapData = manager.BitmapManager.getInstance().getTableBgHover(this.m_uCurrentFrame);
			this.m_bmpBgOver.smoothing = true;
		}
		
		public  destroy():void{
			this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.bgOver, this);
			this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.bgOut, this);
			
			if(this.m_timer){
				/*m_timer.stop();
				m_timer.removeEventListener(TimerEvent.TIMER, onTimer);*/
				this.m_timer.dispose();
				this.m_timer = null;
			}
			
			if(this.m_bmpBgOver){
				this.removeChild(this.m_bmpBgOver);
				if(this.m_bmpBgOver.bitmapData){
					this.m_bmpBgOver.bitmapData = null;
				}
				this.m_bmpBgOver = null;
			}
			
			if(this.m_bmpBg){
				if(this.m_bmpBg.parent){
					this.m_bmpBg.parent.removeChild(this.m_bmpBg);
				}
				if(this.m_bmpBg.bitmapData){
					this.m_bmpBg.bitmapData = null;
				}
				this.m_bmpBg = null;
			}
			
//			if(m_btnLimit){
//				m_btnLimit.destroy();
//				m_btnLimit = null;
//			}
			
			if(this.m_bmpIcon){
				if(this.m_bmpIcon.parent){
					this.m_bmpIcon.parent.removeChild(this.m_bmpIcon);
				}
				if(this.m_bmpIcon.bitmapData){
					this.m_bmpIcon.bitmapData = null;
				}
				this.m_bmpIcon = null;
			}
			
			if(this.m_bmpTable){
				if(this.m_bmpTable.parent){
					this.m_bmpTable.parent.removeChild(this.m_bmpTable);
				}
				if(this.m_bmpTable.bitmapData){
					this.m_bmpTable.bitmapData = null;
				}
				this.m_bmpTable = null;
			}
			
			if(this.m_bmpTime){
				this.removeChild(this.m_bmpTime);
				if(this.m_bmpTime.bitmapData){
					this.m_bmpTime.bitmapData = null;
				}
				this.m_bmpTime = null;
			}
			
			if(this.m_bmpTableHint){
				if(this.m_bmpTableHint.parent){
					this.m_bmpTableHint.parent.removeChild(this.m_bmpTableHint);
				}
				if(this.m_bmpTableHint.bitmapData){
					this.m_bmpTableHint.bitmapData = null;
				}
				this.m_bmpTableHint = null;
			}
			
			if(this.m_bmpHintShuffle){
				if(this.m_bmpHintShuffle.parent){
					this.m_bmpHintShuffle.parent.removeChild(this.m_bmpHintShuffle);
				}
				if(this.m_bmpHintShuffle.bitmapData){
					this.m_bmpHintShuffle.bitmapData = null;
				}
				this.m_bmpHintShuffle = null;
			}
			
//			if(m_bmpFace){
//				if(m_bmpFace.parent){
//					m_bmpFace.parent.removeChild(m_bmpFace);
//				}
//				m_bmpFace = null;
//			}
			
			if(this.m_imgLoader){
				this.m_imgLoader = null;
			}
			
			this.destroyFaceContainer();
			if(this.m_spFaceContainer){
				this.m_spFaceContainer = null;
			}
			if(this.m_struct){
//				m_struct.removeEventListener(TableEvent.CHANGE, onChange);
//				trace("移除struct侦听，tableid：",m_struct.TableID);
				// this.m_struct.destroy();
				this.m_struct = null;
			}
			
			if(this.tableLoginType){
				if(this.tableLoginType.parent){
					this.tableLoginType.parent.removeChild(this.tableLoginType);
				}
				this.tableLoginType.destroy();
				this.tableLoginType = null;
			}
			
			if(this.m_spStatisticMask){
				this.m_spStatisticMask.graphics.clear();
				if(this.m_spStatisticMask.parent){
					this.m_spStatisticMask.parent.removeChild(this.m_spStatisticMask);
				}
				this.m_spStatisticMask = null;
			}
			
			if(this.m_panelStatistic){
				if(this.m_panelStatistic.parent){
					this.m_panelStatistic.parent.removeChild(this.m_panelStatistic);
				}
				this.m_panelStatistic.destroy();
				this.m_panelStatistic = null;
			}
			
			if(this.m_spstatisticContain){
				if(this.m_spstatisticContain.parent){
					this.m_spstatisticContain.parent.removeChild(this.m_spstatisticContain);
				}
				this.m_spstatisticContain = null;
			}
			
			if(this.m_mcHot){
				this.m_mcHot.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.over, this);
				this.m_mcHot.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.out, this);
				this.m_mcHot = null;
			}
			
			if(this.m_btnStatistics_cn){
				this.m_btnStatistics_cn.destroy();
				this.m_btnStatistics_cn = null;
			}
			if(this.m_btnStatistics_tw){
				this.m_btnStatistics_tw.destroy();
				this.m_btnStatistics_tw = null;
			}
			if(this.m_btnStatistics_en){
				this.m_btnStatistics_en.destroy();
				this.m_btnStatistics_en = null;
			}
			
			if(this.m_mcContent){
				this.m_mcContent = null;
			}
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
			super.destroy();
		}
		private destroyFaceContainer():void{
			if(this.m_spFaceContainer){
//				trace("m_spFaceContainer.numChildren:>>",m_spFaceContainer.numChildren);
				var imgloader : egret.ImageLoader;
				while(this.m_spFaceContainer.numChildren>0){
					imgloader = this.m_spFaceContainer.getChildAt(0) as egret.ImageLoader;
					if(imgloader){
						imgloader = null;
					}else{
						this.m_spFaceContainer.removeChildAt(0);
					}
				}
			}
		}
		
		public setData(_struct:struct.Struct_Table):void{
			if(_struct==null){
//				m_struct.removeEventListener(TableEvent.CHANGE, onChange);
//				trace("移除struct侦听，tableid：",m_struct.TableID);
				return;
			}
			
			if(this.m_struct && (this.m_struct != _struct)){
//				m_struct.removeEventListener(TableEvent.CHANGE, onChange);
//				trace("移除struct侦听，tableid：",m_struct.TableID);
			}
			
			this.m_struct = _struct;
			this.m_struct.setTable(this);
//			m_struct.addEventListener(TableEvent.CHANGE, onChange);
			
			this.setFace(_struct.DealerPhotoUrl);
			
			this.updateDealerName();
			this.updateStaticsInfo();
			this.onChangeLanguage();
		}
		
		//更新桌子
		public update(_bInit:boolean=false):void{
			
		}
		
		//更新在线人数
		public updateOnlinePlayers(_iOnlinePlayers:number):void{
			if(this.m_struct.OnlinePlayers != _iOnlinePlayers){
				this.m_mcContent.tf_8.text = _iOnlinePlayers.toString();
				this.m_struct.OnlinePlayers = _iOnlinePlayers;
			}
		}
		
		//更新计时
		public updateCountDown():void{
			if(this.m_struct.IsOffline){
				this.m_bmpTime.bitmapData = null;
				return;
			}
			
			if(this.m_struct.GameStatus == define.GameStatus.BETTING){
				if(this.m_iCountDown!= this.m_struct.CountDownTime){
					this.m_iCountDown = this.m_struct.CountDownTime;
					
					if(this.m_iCountDown<6){
						this.m_bmpTime.bitmapData = manager.BitmapManager.getInstance().numberTimeRed.conversion(this.m_iCountDown);
					}else{
						this.m_bmpTime.bitmapData = manager.BitmapManager.getInstance().numberTime.conversion(this.m_iCountDown);
					}
					this.m_bmpTime.smoothing = true;
				}
			}else{
				this.m_bmpTime.bitmapData = null;
			}
		}
		
		//更新荷官
		public updateDealer():void{
			if(this.m_sFaceUrl != this.m_struct.DealerPhotoUrl){
				if(this.m_struct.DealerPhotoUrl==null || this.m_struct.DealerPhotoUrl==""){
					this.m_sFaceUrl = "";
					
					this.destroyFaceContainer();
				}else{
					this.setFace(this.m_struct.DealerPhotoUrl);
				}
			}
			this.updateDealerName();
			this.updateMaintenanceStatus();
		}
		
		
		public updateDealerName():void{
			var str : String = this.m_struct.DealerName?this.m_struct.DealerName:"";
			this.m_mcContent.mc_6.tf_label.text = str;
			if((this.m_mcContent.mc_6.tf_label as egret.TextField).textWidth>115){
				str = str.slice(0,2) + "..." + str.slice(str.length-2,str.length);
				this.m_mcContent.mc_6.tf_label.text = str;
			}
		}
		
		//荷官头像
		public setFace( _sUrl:string):void{
			if(_sUrl==""){
				return;
			}
			if(this.m_sFaceUrl!= _sUrl){
				this.m_sFaceUrl = _sUrl;
				this.m_imgLoader = new egret.ImageLoader();
				this.m_imgLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
				this.m_imgLoader.load(_sUrl);
			}
			
		}
		private loadCompleteHandler(evt:egret.Event):void{
			this.m_imgLoader.removeEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);

			var bitmap:egret.Bitmap = new egret.Bitmap(this.m_imgLoader.data);
			this.m_spFaceContainer.addChild(bitmap);
		}
//		public setFace( _bmpdFace:BitmapData):void{
//			m_bmpFace.bitmapData = _bmpdFace;
//		}
		
		//更新路纸
		public updateRoad(_bInit:boolean):void{
			
		}
		
		//更新彩池
		public updateStaticsInfo():void{
			
		}
		
		//更新维护状态
		public updateMaintenanceStatus():void{
			
		}
		
		/** 维护状态 **/
		public showMaintain(_bMc:boolean=true):void{
			// this.m_mcAsset.mc_mask.visible = _bMc;
			// this.m_mcAsset.mc_hint.visible = true;
			if(this.m_struct.GameStatus==define.GameStatus.FAILING_GAME||this.m_struct.GameStatus==define.GameStatus.FAIL_GAME)
			{
				
			}else{
				this.touchEnabled = false;
				this.touchChildren = false;
				this.hideStatistics();
			}
			
			
			if(this.m_mcContent.mc_alone){
				this.m_mcContent.mc_alone.visible = false;
			}
			
//			if(m_mcAsset.mc_30.visible == true){
//				m_btnLimit.enable(false);
//			}
		}
		public hideMaintain():void{
			// this.m_mcAsset.mc_mask.visible = false;
			// this.m_mcAsset.mc_hint.visible = false;
			this.m_mcContent.mc_shuffle.visible = false;
			this.touchEnabled = true;
			this.touchChildren = true;
//			if(m_mcAsset.mc_30.visible == true){
//				m_btnLimit.enable(true);
//			}
		}
		
		public onChangeLanguage():void{
//			if(m_btnLimit){
//				(m_btnLimit.mcAsset.getChildByName("mc_label") as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
//			}
			
			switch(manager.LobbyManager.getInstance().lobbyAuth.Lang){
				case define.Define.LANGUAGE_CN:
					this.m_btnStatistics_cn.visible = true;
					this.m_btnStatistics_tw.visible = false;
					this.m_btnStatistics_en.visible = false;
					break;
				
				case define.Define.LANGUAGE_TW:
					this.m_btnStatistics_cn.visible = false;
					this.m_btnStatistics_tw.visible = true;
					this.m_btnStatistics_en.visible = false;
					break;
				
				case define.Define.LANGUAGE_EN:
					this.m_btnStatistics_cn.visible = false;
					this.m_btnStatistics_tw.visible = false;
					this.m_btnStatistics_en.visible = true;
					break;
			}
		}
		
		get struct():struct.Struct_Table{
			return this.m_struct;
		}
		
		get road():Object{
			return null;
		}
		
		public rest():void{
			
		}
		
		//重绘路纸
		public initRoad(_sRoad:string):void{
			
		}
		
		//更新提示
		public updateHint(_sKey:string):void{
			this.m_bmpTableHint.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, _sKey);
			this.m_bmpTableHint.smoothing = true;
			// this.m_mcAsset.mc_hint.visible = true;
			if(_sKey!=language.Language.sQuickFailGame)
			{
				// this.m_mcAsset.mc_hint.x = <number>((this.m_mcAsset.mc_mask.width - this.m_bmpTableHint.width)*0.5);
				// this.m_mcAsset.mc_hint.y = <number>(this.m_mcAsset.mc_mask.y + (this.m_mcAsset.mc_mask.height - this.m_bmpTableHint.height)*0.5);
			}else
			{
				// this.m_mcAsset.mc_hint.x = this.m_mcContent.mc_shuffle.x;
				// this.m_mcAsset.mc_hint.y = this.m_mcContent.mc_shuffle.y;
			}
			
		}
		
		//游戏进行中
		public isGameStart():boolean{
			// 如果游戏处于下注或者发牌阶段，说明游戏已经开始
			switch(this.m_struct.GameStatus){
				case define.GameStatus.BETTING:
				case define.GameStatus.DEALING:
				case define.GameStatus.SETTLING:
					return true;
			}
			return false;
		}
		
		//显示统计
		public showStatistics():void{
			this.m_bStatistic = true;
			if(this.m_spstatisticContain){
				// TweenLite.to(this.m_spstatisticContain, define.Define.SPEED, {y:this.m_Statistic_topY-this.m_Statistic_bottom_offsetY});
			}
		}
		
		public hideStatistics():void{
			this.m_bStatistic = false;
			if(this.m_spstatisticContain){
				// TweenLite.to(this.m_spstatisticContain, define.Define.SPEED, {y:this.m_Statistic_bottomY});
			}
		}
		
		public setStatisticsStatus(event:MouseEvent=null):void{
			if(this.m_bStatistic){
				this.hideStatistics();
			}else{
				this.showStatistics();
			}
		}
		
		//判断是否支持使用
		protected isSupportTrial():boolean{
			
			switch(this.m_struct.TableType){
				case define.Define.TABLE_TYPE_NORMAL:
				case define.Define.TABLE_TYPE_SPEEDY:
				case define.Define.TABLE_TYPE_ROBOT:
				case define.Define.TABLE_TYPE_DTF:
				case define.Define.TABLE_TYPE_ROU:
				case define.Define.TABLE_TYPE_SIC:	
				case define.GameDefine.MACHINE_BAC:
					return true;
			}
			
			return false;
		}
		
		protected isHaveDealer():boolean{
			if(this.m_struct.DealerLoginID==null || this.m_struct.DealerLoginID==""){
				return false;
			}
			return true;
		}
		
		protected isNotFinish():boolean{
			return Boolean(this.m_struct.GameStatus==define.GameStatus.NOT_FINISHED);
		}
		
		protected  over(event:MouseEvent):void
		{
			this.hotOver();
//			m_bHotOver = true;
		}
		
		protected out(event:MouseEvent):void
		{
			this.hotOut();
//			m_bHotOver = false;
		}
		
		protected hotOver():void{
			if(this.m_struct.TableID==10){
				trace("struct.TableID:",this.m_struct.TableID,"hotOver");
			}
			if(this.tableLoginType){
				this.tableLoginType.show();
			}
//			if(m_mcBg){
//				m_mcBg.gotoAndPlay("HOVER");
//			}
		}
		
		protected hotOut():void{
			if(this.tableLoginType){
				this.tableLoginType.hide();
			}
//			if(m_mcBg){
//				m_mcBg.gotoAndStop("DEFAULT");
//			}
		}
		
		
		protected bgOver(event:MouseEvent):void
		{
			if(manager.LobbyManager.getInstance().uRenderMode==0){
				this.m_timer.start();
			}
			
//			if(m_mcBg){
//				m_mcBg.gotoAndPlay("HOVER");
//			}
//			if(m_bHotOver){
//				hotOver();
//			}
			if(this.m_bmpBg){
				this.m_bmpBg.bitmapData = manager.BitmapManager.getInstance().getTableBg(1);
				this.m_bmpBg.smoothing = true;
				this.m_bmpBg.x = -4;
				this.m_bmpBg.y = -4;
			}
		}
		
		protected bgOut(event:MouseEvent):void
		{
			this.m_timer.stop();
			this.m_bmpBgOver.bitmapData = null;
//			if(m_mcBg){
//				m_mcBg.gotoAndStop("DEFAULT");
//			}
//			hotOut();
			if(this.m_bmpBg){
				this.m_bmpBg.bitmapData = manager.BitmapManager.getInstance().getTableBg(0);
				this.m_bmpBg.smoothing = true;
				this.m_bmpBg.x = 0;
				this.m_bmpBg.y = 0;
			}
		}
		
		set setBetLimitVisible(_bValue:boolean) {
//			if( m_btnLimit && m_btnLimit.mcAsset ){
//				m_btnLimit.mcAsset.visible = _bValue;
//			}
		}


	}
}
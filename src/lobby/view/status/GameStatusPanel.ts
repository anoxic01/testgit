module lobby.view.status {
	export class GameStatusPanel extends BSprite{
		protected view;
		protected countDownView:GameCountDownView;
		protected currentStatus:string;
		protected countDownContainer;
		protected watcher:CountDownWatcher;
		protected isUnfold: boolean = true;
		protected mParent;
		protected frameDict;
		public constructor(p) {
			super();
		
			this.mParent = p;
			this.initViews();
			this.rollUpCountDown(false);
			this.setGameStatus(model.status.GameStatus.WAIT_NEXT_NEWGAME);
		}
		
		protected initViews():void
		{
			this.view = this.createPanel();
			this.view.cacheAsBitmap=true;
			this.setFrameLabels(this.view.mc_1);
			
			this.mParent.addChild(view);
			this.countDownView = new GameCountDownView();
			this.countDownView.x = 65;
			this.countDownView.y = 10;
			this.countDownContainer = this.view.mc_0;
			this.countDownContainer.stop();
			this.watcher = new CountDownWatcher(this.countDownContainer,this.countDownView);
		}
		
		//存储状态帧标签 
		protected setFrameLabels(statusMc):void{
			
			this.frameDict = {};
			var len:number = statusMc.currentLabels.length;
			var fr;
			for (var i:number= 0; i < len; i++) 
			{
				fr = statusMc.currentLabels[i];
				this.frameDict[fr.name]=fr.frame;
			}
		}
		
		protected createPanel():egret.MovieClip
		{
			var v = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Game_Status_Asset");
			v.x = 128;
			v.y = 12;
		
			
			
			return v;
		}
		public getView():egret.DisplayObject
		{
			return this.view;
		}
		 public onChangeLanguage():void
		{
			super.onChangeLanguage();
			this.setGameStatus(this.currentStatus);
		}
		/**
		 * 增加直接通过gameModel显示倒计时和更新状态
		 */		
		public updateGameModel(model):void
		{
			this.setGameStatus(model.tableStruct.GameStatus);
			if(model.tableStruct && model.tableStruct.GameStatus==model.status.GameStatus.BETTING){
				this.setCountDown(model.tableStruct.CountDownTime);
			}
		}
		public setCountDown(value:number):void
		{
			this.countDownView.setCountDown(value,this.currentStatus);
		}
		public setGameStatus(value:string):void
		{
			this.currentStatus = value;
			var statusMc=this.view.mc_1;
			var frame:number=0;	
			if(this.currentStatus==model.status.GameStatus.WAIT_NEXT_NEWGAME)// 等待新局
			{
				frame = this.frameDict[language.Language.sGameStaus_WaitNextNewgame];
				this.rollUpCountDown();
			}else if(this.currentStatus==model.status.GameStatus.BETTING)// 下注中
			{
				frame = this.frameDict[language.Language.sGameStaus_Betting];
				this.unfoldCountDown();
			}else if(this.currentStatus==model.status.GameStatus.DEALING)// 发牌中
			{
				frame = this.frameDict[language.Language.sGameStaus_Dealing];
				this.rollUpCountDown();
			}else if(this.currentStatus==model.status.GameStatus.SETTLING)// 结算中
			{
				frame = this.frameDict[language.Language.sGameStaus_Settling];
				this.rollUpCountDown();
			}else if(this.currentStatus==model.status.GameStatus.SETTLED)// 结算完
			{
				frame = this.frameDict[language.Language.sGameStaus_Settled];
				this.rollUpCountDown();
			}else if(this.currentStatus==model.status.GameStatus.FIRST_PEEK||this.currentStatus==model.status.GameStatus.BANKER_SECOND_PEEK||this.currentStatus==model.status.GameStatus.PLAYER_SECOND_PEEK)// 咪牌
			{
				frame = this.frameDict[language.Language.sGameStaus_Peeking];
				this.unfoldCountDown();
			}else if(this.currentStatus==model.status.GameStatus.CHANGING_SHOE)// 清靴
			{
				frame = this.frameDict[language.Language.sGameStaus_Changing_Shoe];
				this.rollUpCountDown();
			}else if(this.currentStatus==model.status.GameStatus.FAILING_GAME||this.currentStatus==model.status.GameStatus.FAIL_GAME)// 废局
			{
				frame = this.frameDict[language.Language.sGameStaus_Fail_Game];
				this.rollUpCountDown();
			}else if(this.currentStatus==model.status.GameStatus.READY)
			{
				frame = this.frameDict[language.Language.sGameStaus_WaitNextNewgame];
				this.rollUpCountDown();
			}
			frame = frame+ manager.LobbyManager.getInstance().lobbyAuth.Lang;
			statusMc.gotoAndStop(frame);
		}
		protected getStatusString(s:string):string
		{
			return manager.LobbyManager.getInstance().getLanguageString(s);
		}
		/**
		 * 展开倒计时面板
		 */		
		public unfoldCountDown(isTween: boolean = true):void
		{
			var frame:number= this.countDownContainer.totalFrames;
			if(this.isUnfold)return;
			this.isUnfold = true;
			if(isTween)this.watcher.startWatch((frame/2)+1,frame);
			else this.countDownContainer.gotoAndStop(frame);
		}
		/**
		 * 收起倒计时面板
		 */		
		public rollUpCountDown(isTween: boolean = true):void
		{
			var frame:number= this.countDownContainer.totalFrames;
			if(this.isUnfold==false)return;
			this.isUnfold = false;
			if(isTween)this.watcher.startWatch(1,(frame/2));
			else this.countDownContainer.gotoAndStop((frame/2));
		}
		 public destroy():void
		{
			super.destroy();
			this.watcher&&this.watcher.dispose();
			this.countDownView&&this.countDownView.dispose();
		}
	}
}

class CountDownWatcher
{
	private view;
	private mc;
	private currentFrame:number=-1;
	private totalFrames:number= 0;
	private playStartFrame:number= 0;
	private playEndFrame:number= 0;
	
	public constructor(mc,panel)
	{
		this.mc = mc;
		this.view = panel;
		this.totalFrames = mc.totalFrames;
	}
	private onWatchFrame(e:Event):void
	{
		this.mc.gotoAndStop(this.playStartFrame);
		this.playStartFrame++;
		if(this.playStartFrame>=this.playEndFrame)this.stopWatch();
		if(this.mc.content&&this.view.parent!=this.mc.content)this.mc.content.addChild(this.view);
		this.currentFrame = this.mc.currentFrame;
	}
	public startWatch(startFrame:number,endFrame:number):void
	{
		this.stopWatch();
		this.playStartFrame = startFrame;
		this.playEndFrame = endFrame;
		this.mc&&this.mc.addEventListener(egret.Event.ENTER_FRAME,this.onWatchFrame);
	}
	public stopWatch():void
	{
		this.mc&&this.mc.removeEventListener(egret.Event.ENTER_FRAME,this.onWatchFrame);
	}
	public dispose():void
	{
		this.stopWatch();
	}
}
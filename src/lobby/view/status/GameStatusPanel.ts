module lobby.view.status {
	export class GameStatusPanel extends BSprite{
		protected view:MovieClip;
		protected countDownView:GameCountDownView;
		protected currentStatus:String;
		protected countDownContainer:MovieClip;
		protected watcher:CountDownWatcher;
		protected isUnfold: boolean = true;
		protected mParent:Sprite;
		protected frameDict:Dictionary;
		public constructor(p:Sprite) {
		
			this.mParent = p;
			initViews();
			rollUpCountDown(false);
			setGameStatus(GameStatus.WAIT_NEXT_NEWGAME);
		}
		
		protected initViews():void
		{
			this.view = createPanel();
			this.view.cacheAsBitmap=true;
			setFrameLabels(view.mc_1);
			
			mParent.addChild(view);
			countDownView = new GameCountDownView();
			countDownView.x = 65;
			countDownView.y = 10;
			countDownContainer = view.mc_0;
			countDownContainer.stop();
			watcher = new CountDownWatcher(countDownContainer,countDownView);
		}
		
		//存储状态帧标签 
		protected setFrameLabels(statusMc:MovieClip):void{
			
			frameDict = new Dictionary;
			var len:number = statusMc.currentLabels.length;
			var fr:FrameLabel;
			for (var i:number= 0; i < len; i++) 
			{
				fr = statusMc.currentLabels[i];
				frameDict[fr.name]=fr.frame;
			}
		}
		
		protected createPanel():MovieClip
		{
			var v:MovieClip = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Game_Status_Asset");
			v.x = 128;
			v.y = 12;
		
			
			
			return v;
		}
		public getView():DisplayObject
		{
			return view;
		}
		 public onChangeLanguage():void
		{
			super.onChangeLanguage();
			setGameStatus(currentStatus);
		}
		/**
		 * 增加直接通过gameModel显示倒计时和更新状态
		 */		
		public updateGameModel(model:GameModel):void
		{
			setGameStatus(model.tableStruct.GameStatus);
			if(model.tableStruct && model.tableStruct.GameStatus==GameStatus.BETTING){
				setCountDown(model.tableStruct.CountDownTime);
			}
		}
		public setCountDown(value:number):void
		{
			countDownView.setCountDown(value,currentStatus);
		}
		public setGameStatus(value:String):void
		{
			currentStatus = value;
			var statusMc:MovieClip=view.mc_1;
			var frame:number=0;	
			if(currentStatus==GameStatus.WAIT_NEXT_NEWGAME)// 等待新局
			{
				frame = frameDict[Language.sGameStaus_WaitNextNewgame];
				rollUpCountDown();
			}else if(currentStatus==GameStatus.BETTING)// 下注中
			{
				frame = frameDict[Language.sGameStaus_Betting];
				unfoldCountDown();
			}else if(currentStatus==GameStatus.DEALING)// 发牌中
			{
				frame = frameDict[Language.sGameStaus_Dealing];
				rollUpCountDown();
			}else if(currentStatus==GameStatus.SETTLING)// 结算中
			{
				frame = frameDict[Language.sGameStaus_Settling];
				rollUpCountDown();
			}else if(currentStatus==GameStatus.SETTLED)// 结算完
			{
				frame = frameDict[Language.sGameStaus_Settled];
				rollUpCountDown();
			}else if(currentStatus==GameStatus.FIRST_PEEK||currentStatus==GameStatus.BANKER_SECOND_PEEK||currentStatus==GameStatus.PLAYER_SECOND_PEEK)// 咪牌
			{
				frame = frameDict[Language.sGameStaus_Peeking];
				unfoldCountDown();
			}else if(currentStatus==GameStatus.CHANGING_SHOE)// 清靴
			{
				frame = frameDict[Language.sGameStaus_Changing_Shoe];
				rollUpCountDown();
			}else if(currentStatus==GameStatus.FAILING_GAME||currentStatus==GameStatus.FAIL_GAME)// 废局
			{
				frame = frameDict[Language.sGameStaus_Fail_Game];
				rollUpCountDown();
			}else if(currentStatus==GameStatus.READY)
			{
				frame = frameDict[Language.sGameStaus_WaitNextNewgame];
				rollUpCountDown();
			}
			frame = frame+ LobbyManager.getInstance().lobbyAuth.Lang;
			statusMc.gotoAndStop(frame);
		}
		protected getStatusString(s:String):String
		{
			return LobbyManager.getInstance().getLanguageString(s);
		}
		/**
		 * 展开倒计时面板
		 */		
		public unfoldCountDown(isTween: boolean = true):void
		{
			var frame:number= countDownContainer.totalFrames;
			if(isUnfold)return;
			isUnfold = true;
			if(isTween)watcher.startWatch(int(frame/2)+1,frame);
			else countDownContainer.gotoAndStop(frame);
		}
		/**
		 * 收起倒计时面板
		 */		
		public rollUpCountDown(isTween: boolean = true):void
		{
			var frame:number= countDownContainer.totalFrames;
			if(isUnfold==false)return;
			isUnfold = false;
			if(isTween)watcher.startWatch(1,int(frame/2));
			else countDownContainer.gotoAndStop(int(frame/2));
		}
		 public destroy():void
		{
			super.destroy();
			watcher&&watcher.dispose();
			countDownView&&countDownView.dispose();
		}
	}
}
import flash.display.MovieClip;
import flash.events.Event;

import views.status.GameCountDownView;
class CountDownWatcher
{
	private view:GameCountDownView;
	private mc:MovieClip;
	private currentFrame:number=-1;
	private totalFrames:number= 0;
	private playStartFrame:number= 0;
	private playEndFrame:number= 0;
	
	public CountDownWatcher(mc:MovieClip,panel:GameCountDownView)
	{
		this.mc = mc;
		this.view = panel;
		totalFrames = mc.totalFrames;
	}
	private onWatchFrame(e:Event):void
	{
		mc.gotoAndStop(playStartFrame);
		playStartFrame++;
		if(playStartFrame>=playEndFrame)stopWatch();
		if(mc.content&&view.parent!=mc.content)mc.content.addChild(view);
		currentFrame = mc.currentFrame;
	}
	public startWatch(startFrame:number,endFrame:number):void
	{
		stopWatch();
		this.playStartFrame = startFrame;
		this.playEndFrame = endFrame;
		mc&&mc.addEventListener(Event.ENTER_FRAME,onWatchFrame);
	}
	public stopWatch():void
	{
		mc&&mc.removeEventListener(Event.ENTER_FRAME,onWatchFrame);
	}
	public dispose():void
	{
		stopWatch();
	}
}
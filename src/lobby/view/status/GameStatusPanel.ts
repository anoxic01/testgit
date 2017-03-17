module lobby.view.status {
	export class GameStatusPanel extends BSprite{
		protected var view:MovieClip;
		protected var countDownView:GameCountDownView;
		protected var currentStatus:String;
		protected var countDownContainer:MovieClip;
		protected var watcher:CountDownWatcher;
		protected var isUnfold:Boolean = true;
		protected var mParent:Sprite;
		protected var frameDict:Dictionary;
		public constructor(p:Sprite) {
		
			this.mParent = p;
			initViews();
			rollUpCountDown(false);
			setGameStatus(GameStatus.WAIT_NEXT_NEWGAME);
		}
		
		protected function initViews():void
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
		protected function setFrameLabels(statusMc:MovieClip):void{
			
			frameDict = new Dictionary;
			var len:uint = statusMc.currentLabels.length;
			var fr:FrameLabel;
			for (var i:int = 0; i < len; i++) 
			{
				fr = statusMc.currentLabels[i];
				frameDict[fr.name]=fr.frame;
			}
		}
		
		protected function createPanel():MovieClip
		{
			var v:MovieClip = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Game_Status_Asset");
			v.x = 128;
			v.y = 12;
		
			
			
			return v;
		}
		public function getView():DisplayObject
		{
			return view;
		}
		override public function onChangeLanguage():void
		{
			super.onChangeLanguage();
			setGameStatus(currentStatus);
		}
		/**
		 * 增加直接通过gameModel显示倒计时和更新状态
		 */		
		public function updateGameModel(model:GameModel):void
		{
			setGameStatus(model.tableStruct.GameStatus);
			if(model.tableStruct && model.tableStruct.GameStatus==GameStatus.BETTING){
				setCountDown(model.tableStruct.CountDownTime);
			}
		}
		public function setCountDown(value:int):void
		{
			countDownView.setCountDown(value,currentStatus);
		}
		public function setGameStatus(value:String):void
		{
			currentStatus = value;
			var statusMc:MovieClip=view.mc_1;
			var frame:uint=0;	
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
		protected function getStatusString(s:String):String
		{
			return LobbyManager.getInstance().getLanguageString(s);
		}
		/**
		 * 展开倒计时面板
		 */		
		public function unfoldCountDown(isTween:Boolean = true):void
		{
			var frame:int = countDownContainer.totalFrames;
			if(isUnfold)return;
			isUnfold = true;
			if(isTween)watcher.startWatch(int(frame/2)+1,frame);
			else countDownContainer.gotoAndStop(frame);
		}
		/**
		 * 收起倒计时面板
		 */		
		public function rollUpCountDown(isTween:Boolean = true):void
		{
			var frame:int = countDownContainer.totalFrames;
			if(isUnfold==false)return;
			isUnfold = false;
			if(isTween)watcher.startWatch(1,int(frame/2));
			else countDownContainer.gotoAndStop(int(frame/2));
		}
		override public function destroy():void
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
	private var view:GameCountDownView;
	private var mc:MovieClip;
	private var currentFrame:int=-1;
	private var totalFrames:int = 0;
	private var playStartFrame:int = 0;
	private var playEndFrame:int = 0;
	
	public function CountDownWatcher(mc:MovieClip,panel:GameCountDownView)
	{
		this.mc = mc;
		this.view = panel;
		totalFrames = mc.totalFrames;
	}
	private function onWatchFrame(e:Event):void
	{
		mc.gotoAndStop(playStartFrame);
		playStartFrame++;
		if(playStartFrame>=playEndFrame)stopWatch();
		if(mc.content&&view.parent!=mc.content)mc.content.addChild(view);
		currentFrame = mc.currentFrame;
	}
	public function startWatch(startFrame:int,endFrame:int):void
	{
		stopWatch();
		this.playStartFrame = startFrame;
		this.playEndFrame = endFrame;
		mc&&mc.addEventListener(Event.ENTER_FRAME,onWatchFrame);
	}
	public function stopWatch():void
	{
		mc&&mc.removeEventListener(Event.ENTER_FRAME,onWatchFrame);
	}
	public function dispose():void
	{
		stopWatch();
	}
}
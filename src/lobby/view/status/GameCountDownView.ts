module lobby.view.status {
	export class GameCountDownView extends Sprite{
		protected var countDownValue:int = -1;
		protected var view:Bitmap;
		
		public constructor() {
		view = addChild(new Bitmap()) as Bitmap; 
			view.smoothing = true;
		}
		public function setCountDown(value:int,gameStatus:String):void
		{
			if(gameStatus!=GameStatus.BETTING && gameStatus!=GameStatus.FIRST_PEEK &&
				gameStatus!= GameStatus.PLAYER_SECOND_PEEK && gameStatus!=GameStatus.BANKER_SECOND_PEEK){
				value=0;
			}
			if(view)
			{
				TweenLite.killTweensOf(view,true);
				view.scaleX = view.scaleY = 1;
				view.x = view.y = 0;
				if(value!=countDownValue&&value>=0)
				{
					if ((countDownValue-value)==1){
						//连续倒数时才播音效
						playCountDownSound(value,gameStatus);
					}
					countDownValue = value;
					view.bitmapData = getCountDownNumBitmap(countDownValue);
					view.smoothing = true;
					if(view.bitmapData)view.x = -view.bitmapData.width/2;
					playCountDownEffect(5);
				}else
				{
					if(view.bitmapData)view.x = -view.bitmapData.width/2;
				}
			}
		}
		
		
		protected function playCountDownSound(value:int,gameStatus:String):void
		{
			if(gameStatus==GameStatus.BETTING || gameStatus==GameStatus.FIRST_PEEK ||
				gameStatus == GameStatus.PLAYER_SECOND_PEEK || gameStatus ==GameStatus.BANKER_SECOND_PEEK)
			{
				if(value<=5)SoundManager.getInstance().play(SoundPackage.sCountDown_2);
				else if(value<=10)SoundManager.getInstance().play(SoundPackage.sCountDown0_10);
			}
		}
		protected function getCountDownNumBitmap(num:int):BitmapData
		{
			if(num<=5)
			{
				return BitmapManager.getInstance().numberCountdownRed.conversion(countDownValue);
			}else 
			{
				return BitmapManager.getInstance().numberCountdown.conversion(countDownValue);
			}
		}
		
		protected function playCountDownEffect(needEffectNum:int):void
		{
			if(countDownValue<=needEffectNum)
			{
				TweenLite.killTweensOf(view,true);
				var xx:int = -view.width/2;
				var scale:Number = 1.6;
				var scaleWidth:int = view.width*scale;
				var scaleHeight:int = view.height*scale;
				var offX:int = (scaleWidth-view.width)*0.5;
				var offY:int = (scaleHeight-view.height)*0.5;
				TweenLite.fromTo(view,GameDefine.COUNTDOWN_SPEED,{y:-offY,x:xx-offX,scaleX:scale, scaleY:scale},{y:0,x:xx,scaleX:1, scaleY:1});
			}
		}
		public function dispose():void
		{
			if(view&&view.parent)
			{
				view.bitmapData = null;
				view.parent.removeChild(view);
			}
		}
		public function getCountDown():int
		{
			return countDownValue;
		}
	}
}
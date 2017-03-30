module lobby.view.status {
	export class GameCountDownView extends Sprite{
		protected countDownValue:number= -1;
		protected view:Bitmap;
		
		public constructor() {
		view = addChild(new Bitmap()) as Bitmap; 
			view.smoothing = true;
		}
		public setCountDown(value:number,gameStatus:String):void
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
		
		
		protected playCountDownSound(value:number,gameStatus:String):void
		{
			if(gameStatus==GameStatus.BETTING || gameStatus==GameStatus.FIRST_PEEK ||
				gameStatus == GameStatus.PLAYER_SECOND_PEEK || gameStatus ==GameStatus.BANKER_SECOND_PEEK)
			{
				if(value<=5)SoundManager.getInstance().play(SoundPackage.sCountDown_2);
				else if(value<=10)SoundManager.getInstance().play(SoundPackage.sCountDown0_10);
			}
		}
		protected getCountDownNumBitmap(num:number):BitmapData
		{
			if(num<=5)
			{
				return BitmapManager.getInstance().numberCountdownRed.conversion(countDownValue);
			}else 
			{
				return BitmapManager.getInstance().numberCountdown.conversion(countDownValue);
			}
		}
		
		protected playCountDownEffect(needEffectNum:number):void
		{
			if(countDownValue<=needEffectNum)
			{
				TweenLite.killTweensOf(view,true);
				var xx:number= -view.width/2;
				var scale:Number = 1.6;
				var scaleWidth:number= view.width*scale;
				var scaleHeight:number= view.height*scale;
				var offX:number= (scaleWidth-view.width)*0.5;
				var offY:number= (scaleHeight-view.height)*0.5;
				TweenLite.fromTo(view,GameDefine.COUNTDOWN_SPEED,{y:-offY,x:xx-offX,scaleX:scale, scaleY:scale},{y:0,x:xx,scaleX:1, scaleY:1});
			}
		}
		public dispose():void
		{
			if(view&&view.parent)
			{
				view.bitmapData = null;
				view.parent.removeChild(view);
			}
		}
		public getCountDown():number
		{
			return countDownValue;
		}
	}
}
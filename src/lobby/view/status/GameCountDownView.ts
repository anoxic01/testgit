module lobby.view.status {
	export class GameCountDownView extends BSprite{
		protected countDownValue:number= -1;
		protected view;
		
		public constructor() {
			super();
			this.view = this.addChild(new egret.Bitmap()); 
			this.view.smoothing = true;
		}
		public setCountDown(value:number,gameStatus:string):void
		{
			if(gameStatus!=model.status.GameStatus.BETTING && gameStatus!=model.status.GameStatus.FIRST_PEEK &&
				gameStatus!= model.status.GameStatus.PLAYER_SECOND_PEEK && gameStatus!=model.status.GameStatus.BANKER_SECOND_PEEK){
				value=0;
			}
			if(view)
			{
				this.view.scaleX = this.view.scaleY = 1;
				this.view.x = this.view.y = 0;
				if(value!=this.countDownValue&&value>=0)
				{
					if ((this.countDownValue-value)==1){
						//连续倒数时才播音效
						this.playCountDownSound(value,gameStatus);
					}
					this.countDownValue = value;
					this.view.bitmapData = this.getCountDownNumBitmap(this.countDownValue);
					this.view.smoothing = true;
					if(this.view.bitmapData)this.view.x = -this.view.bitmapData.width/2;
					this.playCountDownEffect(5);
				}else
				{
					if(this.view.bitmapData)this.view.x = -this.view.bitmapData.width/2;
				}
			}
		}
		
		
		protected playCountDownSound(value:number,gameStatus:string):void
		{
			if(gameStatus==model.status.GameStatus.BETTING || gameStatus==model.status.GameStatus.FIRST_PEEK ||
				gameStatus == model.status.GameStatus.PLAYER_SECOND_PEEK || gameStatus ==model.status.GameStatus.BANKER_SECOND_PEEK)
			{
				if(value<=5)manager.SoundManager.getInstance().play(sound.SoundPackage.sCountDown_2);
				else if(value<=10)manager.SoundManager.getInstance().play(sound.SoundPackage.sCountDown0_10);
			}
		}
		protected getCountDownNumBitmap(num:number):egret.BitmapData
		{
			if(num<=5)
			{
				return manager.BitmapManager.getInstance().numberCountdownRed.conversion(this.countDownValue);
			}else 
			{
				return manager.BitmapManager.getInstance().numberCountdown.conversion(this.countDownValue);
			}
		}
		
		protected playCountDownEffect(needEffectNum:number):void
		{
			if(this.countDownValue<=needEffectNum)
			{
				var xx:number= -this.view.width/2;
				var scale:number = 1.6;
				var scaleWidth:number= this.view.width*scale;
				var scaleHeight:number= this.view.height*scale;
				var offX:number= (scaleWidth-this.view.width)*0.5;
				var offY:number= (scaleHeight-this.view.height)*0.5;
				// TweenLite.fromTo(this.view,define.GameDefine.COUNTDOWN_SPEED,{y:-offY,x:xx-offX,scaleX:scale, scaleY:scale},{y:0,x:xx,scaleX:1, scaleY:1});
				this.view.x = xx-offX;
				this.view.y = -offY;
				this.view.scaleX = scale;
				this.view.scaleY = scale;
				egret.Tween.get(this.view).to({x:xx, y:0, scaleX:1, scaleY:1}, define.GameDefine.COUNTDOWN_SPEED);
			}
		}
		public dispose():void
		{
			if(this.view&&this.view.parent)
			{
				this.view.bitmapData = null;
				this.view.parent.removeChild(view);
			}
		}
		public getCountDown():number
		{
			return this.countDownValue;
		}
	}
}
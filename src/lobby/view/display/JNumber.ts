module display {
	export class JNumber extends lobby.view.BSprite{
		
		
		private bitmap;
		private _number = 0;
		private addjustTimer;
		private startAddjustValue = 0;
		private stepValue = 0;
		private flickerTime = 1;
		private tempFlickerTime = 0;
		private flickerDurtion = 0.17;
		private isStartingFlicker = false;
		/**
		 * 取位图数字方法
		 */		
		public convertFun:Function;
		
		public constructor() {
			super();
			this.bitmap = new egret.Bitmap();
			this.addChild(this.bitmap);
		}
		set number(value:number)
		{
			this._number = value;
			this.renderValue(this._number);
		}
		get number():number
		{
			return this._number;
		}
		/**
		 * @param num 目标数值
		 * @param step 动画步数
		 * @param duration 动画总时长
		 */		
		public addjust(num:number,step:number,duration:number):void
		{
			var offsetValue:number = num -	this.number;
			this.startAddjustValue = this.number;
			this.stepValue = offsetValue/step;
			this._number = num;
			if(Math.abs(offsetValue)>step)/// 只有当需要添加的数字大于步长时才显示动画
			{
				this.onStartStep(duration/step,step);
			}else
			{
				this.onStepComplete();
			}
		}
		protected onStartStep(interval:number,repeatCount:number):void
		{
			if(this.addjustTimer!=null)this.addjustTimer.dispose();
			this.addjustTimer = timers.JTimer.getTimer(interval,repeatCount);
			this.addjustTimer.addTimerCallback(this.onStep,this.onStepComplete);
			this.addjustTimer.start();
		}
		protected onStep():void
		{
			this.startAddjustValue+=this.stepValue;
			this.renderValue(this.startAddjustValue);
			if(this.addjustTimer.repeatCount<=4&&this.isStartingFlicker==false)
			{
				this.tempFlickerTime = this.flickerTime;
				this.onStartFlicker();
			}
		}
		protected onStepComplete():void
		{
			if(this.addjustTimer!=null)
			{
				this.addjustTimer.dispose();
				this.addjustTimer = null;
			}
			this.renderValue(this.number);
		}
		/**
		 * 先放大
		 */		
		protected onStartFlicker():void
		{
			this.isStartingFlicker = true;
			var toScale:number = 1.3;
			var toX:number = (this.bitmap.width*(toScale-1))*0.5;
			var toY:number = (this.bitmap.height*(toScale-1))*0.5;
			var fcomplete:Function = this.onDiminishFlicker;
			egret.Tween.get(this.bitmap).to({x:-toX, y:-toY, scaleX:toScale, scaleY:toScale}, this.flickerDurtion).call(fcomplete);
		}
		/**
		 * 变小
		 */		
		protected onDiminishFlicker():void
		{
			var toScale:number = 0.9;
			var toX:number = (this.bitmap.width*(toScale-1))*0.5;
			var toY:number = (this.bitmap.height*(toScale-1))*0.5;
			var fcomplete:Function = this.onStopFlicker;
			egret.Tween.get(this.bitmap).to({x:-toX, y:-toY, scaleX:toScale, scaleY:toScale}, this.flickerDurtion/2).call(fcomplete);
		}
		/**
		 * 恢复原来大小
		 */		
		protected onStopFlicker():void
		{
			this.tempFlickerTime--;
			var fcomplete:Function = this.onStartFlicker;
			if(this.tempFlickerTime<=0)fcomplete = this.onFlickerComplete;
			egret.Tween.get(this.bitmap).to({x:0, y:0, scaleX:1, scaleY:1}, this.flickerDurtion*2).call(fcomplete);
		}
		protected onFlickerComplete():void
		{
			this.isStartingFlicker = false;
		}
		/**
		 * 渲染当前值
		 */		
		protected renderValue(value:number):void
		{
			if(this.bitmap==null)return;
			this.bitmap.bitmapData = this.convertFun!=null?this.convertFun(value):manager.BitmapManager.getInstance().numberChip.conversionDecimalPoint(value);
			this.bitmap.smoothing = true;
		}
		public dispose():void
		{
			if(this.parent)this.parent.removeChild(this);
			if(this.bitmap)
			{
				if(this.bitmap.parent)
					this.bitmap.parent.removeChild(this.bitmap);
				this.bitmap = null;
			}
			if(this.addjustTimer!=null)
			{
				this.addjustTimer.dispose();
				this.addjustTimer = null;
			}
			this.convertFun = null;
		}
	}
}
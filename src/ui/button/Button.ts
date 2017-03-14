/* 按钮基类 */
module ui.button {
	export class Button extends lobby.view.BSprite{

		protected arr		:	string[];
		protected fClick 	: 	Function;

		public constructor($arr:string[], $fClick:Function) {
			super();

			this.arr = $arr;
			this.fClick = $fClick;

			this.touchEnabled = true;
			mouse.setButtonMode(this, true);
			mouse.setMouseMoveEnabled(true);

			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.onOut, this);
			if($fClick){
				this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);  
			}
			
		}

		public destroy():void{
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT,this.onOut, this);
			if(this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)){
				this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this); 
			}

			this.fClick = null;
			this.arr = null;
		}

		protected onOver(evt:egret.TouchEvent):void{
			// console.log("mouse over ...........................");
			this.over();
		}
		protected over():void{
			
		}
		protected onOut(evt:egret.TouchEvent):void{
			// console.log("mouse out ...........................");
			this.out();
		}
		protected out():void{
			
		}

		protected onTouch(e:egret.TouchEvent):void{
			this.fClick();
			this.click();
		}

		protected click():void{
			
		}
	}
}
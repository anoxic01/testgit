module ui.button {
	export class Button_Tool extends egret.DisplayObjectContainer{

		private btn_bg;
		private btn_bg_default;
		private btn_bg_over;
		
		private arr:string[];

		public bSelect : boolean = false;

		public constructor($arr:string[]) {
			super();

			this.arr = $arr;
			this.touchEnabled = true;
			mouse.setButtonMode(this, true);
			mouse.setMouseMoveEnabled(true);

			this.btn_bg_default = manager.ResourceManager.getInstance().createBitmapByName(this.arr[0]);
			this.addChild(this.btn_bg_default);			
			this.btn_bg_over = manager.ResourceManager.getInstance().createBitmapByName(this.arr[1]);

			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.onOut, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);  

			this.onOut(null);
		}
		private onOver(evt:egret.TouchEvent):void{
			if(this.bSelect){
				return;
			}
			// console.log("mouse over ...........................");
			this.over();
		}
		private over():void{
			if(this.contains(this.btn_bg_over)==false){
				this.addChild(this.btn_bg_over);
			}
			if(this.contains(this.btn_bg_default)){
				this.removeChild(this.btn_bg_default);
			}
		}
		private onOut(evt:egret.TouchEvent):void{
			if(this.bSelect){
				return;
			}
			this.out();
		}
		private out():void{
			if(this.contains(this.btn_bg_default)==false){
				this.addChild(this.btn_bg_default);
			}
			if(this.contains(this.btn_bg_over)){
				this.removeChild(this.btn_bg_over);
			}
		}

		private onTouch(e:egret.TouchEvent):void{
			this.onClick();
		}
		protected onClick():void{
			// this.setSelect(!this.bSelect);
		}

		public setSelect(value:boolean):void{
			if(this.bSelect != value){
				this.bSelect = value;

				if(this.bSelect == true){
					this.over();
				}else{
					this.out();
				}
			}

		}

	}
}
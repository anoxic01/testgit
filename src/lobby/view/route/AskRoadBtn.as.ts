module lobby.view.route {
	export class AskRoadBtn extends BSprite {
		private _btn;

		public constructor(btn) {
			super();

			this._btn = btn;
			this._btn.buttonMode = true;
			this._btn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.btnHandler);
		}
		
		public destroy():void {
			if( this._btn ) {
				this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.btnHandler);
				this._btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnHandler);
				this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.btnHandler);		
				this._btn = null;
			}

		}
		
		private btnHandler(e):void {
			var tmp = e.currentTarget;
			
			switch (e.type) {
				case mouse.MouseEvent.MOUSE_OVER: 
					this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.btnHandler);
					this._btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnHandler);
					this._btn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.btnHandler);
				
					tmp.gotoAndStop("over");
					break;
				case mouse.MouseEvent.MOUSE_OUT: 
					this._btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnHandler);
					this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.btnHandler);
					this._btn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.btnHandler);
					tmp.gotoAndStop("up");
					break;
				case egret.TouchEvent.TOUCH_BEGIN: 
					tmp.gotoAndStop("down");
					
					this.dispatchEvent( new events.RouteEvent( events.RouteEvent.ASK_ROAD , tmp.name) );
					break;
			}
		}
	
	}

}
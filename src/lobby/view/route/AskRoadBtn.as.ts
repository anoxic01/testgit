module lobby.view.route {
	export class AskRoadBtn extends BSprite {
		private _btn:MovieClip;

		public constructor(btn:MovieClip) {
		this._btn = btn;
			this._btn.buttonMode = true;
			this._btn.addEventListener(mouse.MouseEvent.MOUSE_OVER, btnHandler);
		}
		
		public destroy():void {
			if( this._btn ) {
				this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, btnHandler);
				this._btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, btnHandler);
				this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, btnHandler);		
				this._btn = null;
			}

		}
		
		private btnHandler(e:MouseEvent):void {
			var tmp:MovieClip = e.currentTarget as MovieClip;
			
			switch (e.type) {
				case MouseEvent.MOUSE_OVER: 
					this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, btnHandler);
					this._btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, btnHandler);
					this._btn.addEventListener(mouse.MouseEvent.MOUSE_OUT, btnHandler);
				
					tmp.gotoAndStop("over");
					break;
				case MouseEvent.MOUSE_OUT: 
					this._btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, btnHandler);
					this._btn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, btnHandler);
					this._btn.addEventListener(mouse.MouseEvent.MOUSE_OVER, btnHandler);
					tmp.gotoAndStop("up");
					break;
				case egret.TouchEvent.TOUCH_BEGIN: 
					tmp.gotoAndStop("down");
					
					this.dispatchEvent( new RouteEvent( RouteEvent.ASK_ROAD , tmp.name) );
					break;
			}
		}
	
	}

}
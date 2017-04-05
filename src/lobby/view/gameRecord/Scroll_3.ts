module lobby.view.gameRecord {
	export class Scroll_3 {
		public constructor(_bDrag , _btnHandle , _bmpdLine , _bHideBackGround) {
		}
		protected onMouseWheelHandler(evt:MouseEvent):void
		{
			evt.stopPropagation();
			//			evt.stopPropagation();
		}
		
		public resize(_uWidth:number, _uHeight:number):void
		{
		}
	}
}
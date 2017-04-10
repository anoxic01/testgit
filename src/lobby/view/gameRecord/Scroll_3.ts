module lobby.view.gameRecord {
	export class Scroll_3 extends ui.scroll.Scroll_2{
		public constructor(_bDrag , _btnHandle , _bmpdLine , _bHideBackGround) {
			super( _bDrag , _btnHandle , _bmpdLine , _bHideBackGround );
		}
		// protected onMouseWheelHandler(evt:MouseEvent):void
		// {
		// 	evt.stopPropagation();
		// 	//			evt.stopPropagation();
		// }
		
		public resize(_uWidth:number, _uHeight:number):void
		{
			super.resize(_uWidth, _uHeight);
			this.m_recPath.x-=15;
			this.m_spHandle.x = this.m_recPath.x;
			this.m_spLine.x = this.m_recPath.x+0.5;
		}
	}
}
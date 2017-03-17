module lobby.view.theme {
	export class ThemeTransition extends BSprite{
		public var fOnComp:Function;
		
		private var m_bms:Array;
		private var m_objs:Array;
		private var m_spParent:Sprite;
		public constructor(parent:Sprite) {
			super();
			m_spParent = parent;
			m_bms = [];
			m_objs = [];
			var bm:Bitmap;
			for (var i:int = 0; i < 8; i++) 
			{
				bm = new Bitmap();
				bm.x = i%2 * 950;
				bm.y = int(i/2) * 281;
				this.addChild(bm);
				m_bms.push(bm);
				m_objs.push({});
			}
			this.mouseEnabled=this.mouseChildren=false;
		}
		public function start():void
		{
			if(this.parent)
				return;
			m_spParent.addChild(this);
			var bm:Bitmap;
			var obj:Object;
			for (var i:int = 0; i < m_bms.length; i++) 
			{
				bm = m_bms[i];
				bm.y = int(i/2) * 281;
				bm.bitmapData = BitmapManager.getInstance().getTableDefault(LobbyManager.getInstance().lobbyAuth.Lang);
				obj = m_objs[i];
				obj.y = bm.y+200;
				obj.delay = int(i/2) * 0.1;
				if(i<2)
				{
					obj.ease = Quad.easeOut;
				}
				else
				{
					obj.ease = Back.easeOut;
				}
				if(i == m_bms.length-1)
				{
					obj.onComplete = onComplete;
				}
				TweenLite.from(bm,0.2,obj);
			}
		}
		private function onComplete():void
		{
			if(parent)
			{
				parent.removeChild(this);
			}
			fOnComp();
		}
		public function removeFromParent():void
		{
			if(parent)
			{
				parent.removeChild(this);
			}
		}
	}
}
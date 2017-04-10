module lobby.view.theme {
	export class ThemeTransition extends BSprite{
		public fOnComp:Function;
		
		private m_bms:any[];
		private m_objs:any[];
		private m_spParent;
		public constructor(parent) {
			super();
			this.m_spParent = parent;
			this.m_bms = [];
			this.m_objs = [];
			var bm;
			for (var i:number= 0; i < 8; i++) 
			{
				bm = new egret.Bitmap();
				bm.x = i%2 * 950;
				bm.y = (i/2) * 281;
				this.addChild(bm);
				this.m_bms.push(bm);
				this.m_objs.push({});
			}
			this.touchEnabled=this.touchChildren=false;
		}
		public start():void
		{
			if(this.parent)
				return;
			this.m_spParent.addChild(this);
			var bm;
			var obj;
			for (var i:number= 0; i < this.m_bms.length; i++) 
			{
				bm = this.m_bms[i];
				bm.y = (i/2) * 281;
				bm.bitmapData = manager.BitmapManager.getInstance().getTableDefault(manager.LobbyManager.getInstance().lobbyAuth.Lang);
				obj = this.m_objs[i];
				obj.y = bm.y+200;
				obj.delay = (i/2) * 0.1;
				if(i<2)
				{
					obj.ease = Quad.easeOut;
				}
				else
				{
					obj.ease = Back.easeOut;
				}
				if(i == this.m_bms.length-1)
				{
					obj.onComplete = this.onComplete;
				}
				TweenLite.from(bm,0.2,obj);
			}
		}
		private onComplete():void
		{
			if(this.parent)
			{
				this.parent.removeChild(this);
			}
			this.fOnComp();
		}
		public removeFromParent():void
		{
			if(this.parent)
			{
				this.parent.removeChild(this);
			}
		}
	}
}
module lobby.view.route.transTable {
	export class TransBacRouteMgr extends BacRouteMgr{
		public constructor(view:MovieClip) {
			super( view );
			this.m_bigSprite.visible = false;
			this.m_bigEyeSprite.visible = false;
			this.m_smallSprite.visible = false;
			this.m_roachSprite.visible = false;
			
		}
	}
}